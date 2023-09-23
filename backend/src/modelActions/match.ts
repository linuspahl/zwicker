import db from '../models';
import bcrypt from 'bcryptjs';

const Match = db.match;
const MatchState = db.matchState;

const create =  async ({
  userId,
  title,
  password
}: {
  userId: string,
  title: string,
  password: string
}) => Match.create({
  userId,
  title,
  status: 'lobby',
  hostUserId: userId,
  password: password ? bcrypt.hashSync(password, 8) : null,
});

const getMatch = (matchId: string) => Match.findByPk(matchId);

const getAll = () => Match.findAll();

const getState = async (matchId: string) => MatchState.findOne({
  include: { 
    model: db.matchStateUser,
  },
  where: {
    matchId
  }
});

const getUsers = async (matchId) => {
  const match = await Match.findByPk(matchId)

  if (!match) {
    // Todo: handle error
  }

  return match.getMatchUsers({
    include: { 
      model: db.user,
      attributes: [ 'username' ]
    },
  })
}

export default {
  create,
  getMatch,
  getAll,
  getUsers,
  getState
}