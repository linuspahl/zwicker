import db from '../models';
import bcrypt from 'bcryptjs';

const Match = db.match;

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

const getAll = () => Match.findAll();

export default { create, getAll }