import db from '../models';
import config from '../config/auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const signup = ({body: { username, password, roles }}, res) => {
  User.create({
    username,
    password: bcrypt.hashSync(password, 8)
  })
  .then((user) => {
    if (roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      });
    } else {
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

const signin = ({ body: { username, password }}, res) => {
  User.findOne({ where: { username } }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    var passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    var authorities = [];
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user.id,
        username: user.username,
        roles: authorities,
        accessToken: token
      });
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

export default { signin, signup }
