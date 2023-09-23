import db from '../models';
import cardSet from '../card-set'
import modelActions from '../modelActions/match'
import clients from '../clients/match'
import utils from '../utils/match'

const Match = db.match;

const sendStatus = (res, status, message: string) => res.status(status).send({ message });

const getMultipleRandom = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

const create = async ({ userId, body: { title, password } }, res) => {
  const match = await modelActions.create({ userId, title, password });

  await match.createMatchUser({ userId, position: 1 })
  await clients.syncMatches(res.locals.updateClientsInRoom);

  res.send({ message: "Match was created successfully!", match: utils.formatMatchForResponse(match) });
};

const start = async ({ params: { matchId } }, res) => {
  let unplayedCards = Object.keys(cardSet);
  
  const match = await modelActions.getMatch(matchId);
  
  if (match.status !== 'lobby') {
    return sendStatus(res, 400, `Match can not start because its status is not "lobby", but "${match.status}"`)
  }
  const matchUsers = await match.getMatchUsers();

  if (matchUsers?.length <= 1) {
    return sendStatus(res, 400, `Match can not start because it needs more than one match user.`)
  }

  const matchUserCards = matchUsers.map(() => {
    const userCards = getMultipleRandom(unplayedCards, 4);
    unplayedCards = unplayedCards.filter(item => !userCards.includes(item));
    return userCards
  });

  const boardCards = getMultipleRandom(unplayedCards, 4).map((cardId) => ([{ cardId, value: undefined }]));
  unplayedCards = unplayedCards.filter(item => !boardCards.find((cardStack) => cardStack.find(({cardId}) => cardId === item)));

  const matchState = await modelActions.createMatchState({
    matchId: match.id,
    currentMoveUserId: matchUsers[0].userId,
    unplayedCards,
    boardCards,
  });

  for (const [index, matchUser] of matchUsers.entries()) {
    await modelActions.createMatchStateUser({
      matchStateId: matchState.id,
      userId: matchUser.userId,
      cards: matchUserCards[index],
    });
  }

  match.status = 'running';

  await match.save();
  await clients.syncMatch(match.id, res.locals.updateClientsInRoom);

  return res.status(200).send(match);
}

const join = async ({ userId, params: { matchId } }, res) => {
  const match = await Match.findByPk(matchId)
  
  if (match.status !== 'lobby') {
    return sendStatus(res, 400, `Match can not be joined because its status is not "lobby", but "${match.status}"`);
  }

  const matchUsers = await match.getMatchUsers();
  await match.createMatchUser({ userId, position: (matchUsers?.length ?? 0) + 1 })
  await match.save();
  
  return res.status(200).send(match);
}

const move = async ({
  userId,
  body: {
    matchId,
    type,
    sourceCardId,
    sourceCardValue,
    targetCardId,
    targetCardValue
  }},
  res
) => {
  const match = await modelActions.getMatch(matchId);
  const matchState = await modelActions.getState(matchId);
  const matchUsers = await modelActions.getUsers(matchId)
  const matchUserIndex = matchUsers.findIndex(({ userId: matchUserId }) => matchUserId === userId)
  const matchStateUsers = await matchState.getMatchStateUsers()
  const matchStateUser = matchStateUsers.find(({ userId: matchStateUserId }) => matchStateUserId === userId)
  const sortedMatchUsers = matchUsers.sort((a, b) => a.position - b.position)
  const nextMatchUser = matchUserIndex + 1 === sortedMatchUsers.length ? sortedMatchUsers[0] : sortedMatchUsers[matchUserIndex + 1]

  if (type === 'dropping') {
    // TODO: check if user is able to perform move
    matchStateUser.cards = matchStateUser.cards.filter(card => card !== sourceCardId)
    matchState.boardCards = [...matchState.boardCards, [{ cardId: sourceCardId, value: undefined }]];
  }

  if (type === 'picking') {
    matchStateUser.cards = matchStateUser.cards.filter((card) => card !== sourceCardId)
    const targetBoardCardStack = matchState.boardCards.find(
      (cardStack) => cardStack.find(({cardId}) => (cardId === targetCardId))
    );
    // TODO if value of source and target card do not match, throw error
    matchState.boardCards = matchState.boardCards.filter(
      (cardStack) => !cardStack.find(({ cardId }) => cardId === targetCardId)
    );
    const isZwick = matchState.boardCards.length <= 0;

    matchStateUser.collectedCards = [
      ...(matchStateUser.collectedCards ?? []),
      { cardId: sourceCardId, isZwick },
      ...(targetBoardCardStack ?? []).map(({ cardId }) => ({ cardId }))
    ]
    matchState.lastPickUserId = userId;

    if (isZwick) {
      let unplayedCards = matchState.unplayedCards;
      const newBoardCards = getMultipleRandom(unplayedCards, 4).map((cardId) => ([{ cardId, value: undefined }]));
      unplayedCards = unplayedCards.filter(item => !newBoardCards.find((cardStack) => cardStack.find(({cardId}) => cardId === item)));
      matchState.boardCards = newBoardCards;
      matchState.unplayedCards = unplayedCards;
    }
  }

  if (type === 'building') {
    const updatedBoardCards = matchState.boardCards.map((cardStack) => {
      const targetCardIndex = cardStack.findIndex(({ cardId }) => cardId === targetCardId);
      if (targetCardIndex >= 0) {
        const targetCard = cardStack[targetCardIndex];
        const newTargetCard = { cardId: targetCard.cardId, value: !targetCard.value ? targetCardValue : targetCard.value };
        const newCardStack = [...cardStack];
        newCardStack[targetCardIndex] = newTargetCard
        return [...newCardStack, { cardId: sourceCardId, value: sourceCardValue }]
      }
      return cardStack;
    })
    
    matchStateUser.cards = matchStateUser.cards.filter((card) => card !== sourceCardId)
    matchState.boardCards = updatedBoardCards;
  }

  const matchStateUsersCards = matchStateUsers.flatMap(({cards}) => cards)

  if (!matchStateUsersCards?.length) {
    if (type !== 'picking') {
      const lastUserWhoPicked = matchStateUsers.find(({ userId }) => userId === matchState.lastPickUserId)
      lastUserWhoPicked.collectedCards = [
        ...(matchStateUser.collectedCards ?? []),
        ...(matchState.boardCards ?? []).flatMap((cardStack) => cardStack.map(({ cardId }) => { cardId }))
      ]
    }

    const newMatchStateUserCards = matchUsers.map(() => {
      let unplayedCards = matchState.unplayedCards;
      const userCards = getMultipleRandom(unplayedCards, 4);
      unplayedCards = unplayedCards.filter(item => !userCards.includes(item));
      return userCards
    });

    for (const [index, matchStateUser] of matchStateUsers.entries()) {
      matchStateUser.cards = newMatchStateUserCards[index];
      await matchStateUser.save()
    }
  }

  matchState.currentMoveUserId = nextMatchUser.userId;

  await matchStateUser.save();
  await matchState.save();

  await clients.syncMatch(match.id, res.locals.updateClientsInRoom);
  await clients.syncMatchState(match.id, res.locals.updateClientsInRoom);
  await clients.syncMatchUsers(match.id, res.locals.updateClientsInRoom);

  return res.status(200).send();
}

const deleteOne = async ({ userId, params: { matchId } }, res) => {
  const match = await modelActions.getMatch(matchId);
  
  if (match.userId !== userId) {
    return sendStatus(res, 400, 'Match can not be deleted because you are not the host')
  }

  match.destroy();

  return res.status(200);
}

export default {
  start,
  create,
  deleteOne,
  join,
  move,
}

