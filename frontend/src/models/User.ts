import { User, UserJSON } from '../types/types';

export const fromJSON = ({ username, id }: UserJSON): User => ({
  id,
  username,
});

export const toJSON = ({ username, id }: User): UserJSON => ({
  id,
  username,
});

