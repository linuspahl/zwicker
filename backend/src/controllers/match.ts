import db from '../models';
import config from '../config/auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const Match = db.match;
const Role = db.role;
const Op = db.Sequelize.Op;

const create = ({ body: { host_user_id, title, password } }, res) => {
  Match.create({
    host_user_id: host_user_id,
    title,
    status: 'lobby',
    password: password ? bcrypt.hashSync(password, 8) : null,
  })
  .then(match => {
    res.send({ message: "Match was created successfully!", match: {
      id: match.id,
      title: match.title,
      has_password: !!match.password,
      status: match.status
    } });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

export default { create }
