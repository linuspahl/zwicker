import { Match, MatchJSON } from '../types/types';

export const fromJSON = ({
  id,
  title,
  has_password: hasPassword,
  host_user_id: hostUserId,
}: MatchJSON): Match => ({
  id,
  title,
  hasPassword,
  hostUserId,
});

export const toJSON = ({
  id,
  title,
  hasPassword,
  hostUserId,
}: Match): MatchJSON => ({
  id,
  title,
  has_password: hasPassword,
  host_user_id: hostUserId,
});
