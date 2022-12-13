import { Match, MatchJSON } from '../types/types';

export const fromJSON = ({
  id,
  title,
  has_password: hasPassword,
  host_user_id: hostUserId,
  status,
}: MatchJSON): Match => ({
  id,
  title,
  hasPassword,
  hostUserId,
  status,
});

export const toJSON = ({
  id,
  title,
  hasPassword,
  hostUserId,
  status,
}: Match): MatchJSON => ({
  id,
  title,
  has_password: hasPassword,
  host_user_id: hostUserId,
  status,
});
