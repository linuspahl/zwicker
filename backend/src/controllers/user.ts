import db from '../models';
const Match = db.match;

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
  Match.findByPk(userId).then(user => {
    res.status(200).send(user);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}

export default { allAccess, userBoard, adminBoard, getCurrent }
