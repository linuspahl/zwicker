import db from '../models';
const User = db.user;

const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

const getCurrent = ({ userId }, res) => {
  User.findByPk(userId).then(user => {
    res.status(200).send(user);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}

export default { allAccess, userBoard, adminBoard, getCurrent }
