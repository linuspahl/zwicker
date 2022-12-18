import db from '../models';
import bcrypt from 'bcryptjs';

const Match = db.match;
const MatchState = db.matchState;
const MatchStateUser = db.matchStateUser;

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
  const matchState = await MatchState.findOne({
    where: {
      matchId
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
  
  const matchUsers = await matchState.getMatchStateUsers();
  
  return res.status(200).send({
    id: matchState.id,
    boardCards: matchState.boardCards,
    createdAt: matchState.createdAt,
    updatedAt: matchState.updatedAt,
    matchUsers,
  });    
}

const start = async ({ params: { matchId } }, res) => {
  const match = await Match.findByPk(matchId).catch(err => {
    res.status(500).send({ message: err.message });
  });
  
  if (match.status !== 'lobby') {
    return res.status(400).send({ message: `Match can not started because its status is not "lobby", but "${match.status}"` });  
  }
  const matchUsers = await match.getMatchUsers();

  const matchState = await MatchState.create({
    matchId: match.id,
    // current_move_user_id: matchUsers.reduce((prev, curr) => prev.position < curr.position ? prev : curr).id,
    currentMoveUseId: matchUsers[0].id,
    boardCards: ['six-spades', 'two-hearts', 'king-diamonds']
  });

  for (const matchUser of matchUsers) {
    await MatchStateUser.create({
      matchStateId: matchState.id,
      userId: matchUser.userId,
      card: ['six-spades', 'two-hearts'],
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
  await match.addMatchUsers({ userId: userId, position: (matchUsers?.length ?? 0) + 1 })
  await match.save();
  
  return res.status(200).send(match);
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
  getUsers,
  getState,
}