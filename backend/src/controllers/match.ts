import db from '../models';
import bcrypt from 'bcryptjs';
import cardSet from '../card-set'

const Match = db.match;
const MatchState = db.matchState;
const MatchStateUser = db.matchStateUser;

const getMultipleRandom = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

const formatMatch = (match) => ({
  id: match.id,
  title: match.title,
  hasPassword: !!match.password,
  status: match.status
})

const create = async ({ userId, body: { title, password } }, res) => {
  const match = await Match.create({
    userId,
    title,
    status: 'lobby',
    hostUserId: userId,
    password: password ? bcrypt.hashSync(password, 8) : null,
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });

  await match.createMatchUser({ userId, position: 1 })

  return res.send({ message: "Match was created successfully!", match: formatMatch(match) });
};

const getAll = (req, res) => {
  Match.findAll().then(matches => {
    res.status(200).send(matches.map(formatMatch));
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}

const getOne = ({ params: { matchId }}, res) => {
  Match.findByPk(matchId).then(match => {
    res.status(200).send(match);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}

const getUsers = async ({ params: { matchId }}, res) => {
  const match = await Match.findByPk(matchId).catch(err => {
    res.status(500).send({ message: err.message });
  });

  return match.getMatchUsers({
    include: { 
      model: db.user,
      attributes: [ 'username' ]
    },
  }).then((matchUsers) => {
    res.status(200).send(matchUsers)
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}

const getState = async ({ params: { matchId }}, res) => {
  return MatchState.findOne({
    include: { 
      model: db.matchStateUser,
    },
    where: {
      matchId
    }
  }).then((matchState) => {
    return res.status(200).send(matchState);    
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });

}

const start = async ({ params: { matchId } }, res) => {
  let unplayedCards = Object.keys(cardSet);
  
  const match = await Match.findByPk(matchId).catch(err => {
    res.status(500).send({ message: err.message });
  });
  
  if (match.status !== 'lobby') {
    return res.status(400).send({ message: `Match can not started because its status is not "lobby", but "${match.status}"` });  
  }
  const matchUsers = await match.getMatchUsers();
  const matchUserCards = matchUsers.map(() => {
    const userCards = getMultipleRandom(unplayedCards, 4);
    unplayedCards = unplayedCards.filter(item => !userCards.includes(item));
    return userCards
  });

  const boardCards = getMultipleRandom(unplayedCards, 4);
  unplayedCards = unplayedCards.filter(item => !boardCards.includes(item))

  const matchState = await MatchState.create({
    matchId: match.id,
    currentMoveUserId: matchUsers[0].userId,
    unplayedCards,
    boardCards,
  });

  for (const [index, matchUser] of matchUsers.entries()) {
    await MatchStateUser.create({
      matchStateId: matchState.id,
      userId: matchUser.userId,
      cards: matchUserCards[index],
    })
  }

  match.status = 'running';

  await match.save();
  
  return res.status(200).send(match);
}

const join = async ({ userId, params: { matchId } }, res) => {
  const match = await Match.findByPk(matchId).catch(err => {
    res.status(500).send({ message: err.message });
  });
  
  if (match.status !== 'lobby') {
    return res.status(400).send({ message: `Match can not be joined because its status is not "lobby", but "${match.status}"` });  
  }

  const matchUsers = await match.getMatchUsers();
  await match.createMatchUser({ userId, position: (matchUsers?.length ?? 0) + 1 })
  await match.save();
  
  return res.status(200).send(match);
}

const move = async ({ userId, body: {
  matchId,
  type,
  sourceCardId,
  targetCardId
}}, res) => {
  const match = await Match.findByPk(matchId).catch();
  
  const matchState = await MatchState.findOne({
    include: { 
      model: db.matchStateUser,
    },
    where: {
      matchId
    }
  })

  const matchUsers = await match.getMatchUsers()
  const matchUserIndex = matchUsers.findIndex(({ userId: matchUserId }) => matchUserId === userId)
  const matchStateUsers = await matchState.getMatchStateUsers()
  const matchStateUser = matchStateUsers.find(({ userId: matchStateUserId }) => matchStateUserId === userId)
  const sortedMatchUsers = matchUsers.sort((a, b) => a.position - b.position)

  const nextMatchUser = matchUserIndex + 1 === sortedMatchUsers.length ? sortedMatchUsers[0] : sortedMatchUsers[matchUserIndex + 1]

  if (type === 'dropping') {
    // TODO: check if user is able to perform move
    matchStateUser.cards = matchStateUser.cards.filter(card => card !== sourceCardId)
    matchState.boardCards = [...matchState.boardCards, sourceCardId];
    matchState.currentMoveUserId = nextMatchUser.userId;

    await matchStateUser.save();
    await matchState.save();
  }
  return res.status(200).send();
}

const deleteOne = async ({ userId, params: { matchId } }, res) => {
  const match = await Match.findByPk(matchId).catch(err => {
    res.status(500).send({ message: err.message });
  });
  
  if (match.userId !== userId) {
    return res.status(400).send({ message: 'Match can not be deleted because you are not the host' });  
  }

  match.destroy();

  return res.status(200);
}

export default {
  start,
  create,
  getAll,
  getOne,
  deleteOne,
  join,
  move,
  getUsers,
  getState,
}