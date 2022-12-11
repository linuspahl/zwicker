import db from '../models';
import bcrypt from 'bcryptjs';

const Match = db.match;

const formatMatch = (match) => ({
  id: match.id,
  title: match.title,
  has_password: !!match.password,
  status: match.status
})

const create = ({ body: { host_user_id, title, password } }, res) => {
  Match.create({
    host_user_id: host_user_id,
    title,
    status: 'lobby',
    password: password ? bcrypt.hashSync(password, 8) : null,
  })
  .then(match => {
    res.send({ message: "Match was created successfully!", match: formatMatch(match) });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
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

export default { create, getAll, getOne }