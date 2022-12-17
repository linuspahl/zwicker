import db from '../models';
import bcrypt from 'bcryptjs';

const Match = db.match;

const formatMatch = (match) => ({
  id: match.id,
  title: match.title,
  has_password: !!match.password,
  status: match.status
})

const create = async ({ userId, body: { title, password } }, res) => {
  const match = await Match.create({
    host_user_id: userId,
    title,
    status: 'lobby',
    password: password ? bcrypt.hashSync(password, 8) : null,
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });

  await match.addUsers(userId)

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

  return match.getUsers().then((users) => {
    res.status(200).send(users.map(({ id, username }) => ({ id, username })));
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}

const start = async ({ params: { matchId } }, res) => {
  const match = await Match.findByPk(matchId).catch(err => {
    res.status(500).send({ message: err.message });
  });
  
  if (match.status !== 'lobby') {
    return res.status(400).send({ message: `Match can not started because its status is not "lobby", but "${match.status}"` });  
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

  match.addUsers(userId)
  await match.save();
  
  return res.status(200).send(match);
}

const deleteOne = async ({ userId, params: { matchId } }, res) => {
  const match = await Match.findByPk(matchId).catch(err => {
    res.status(500).send({ message: err.message });
  });
  
  if (match.host_user_id !== userId) {
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
}