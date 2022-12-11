import { Match, MatchJSON } from '../types/types';

export const fromJSON = ({
  id, title, has_password, host_user_id,
}: MatchJSON): Match => ({
  id,
  title,
  hasPassword: has_password,
  hostUserId: host_user_id,
});

export const toJSON = ({
  id, title, hasPassword, hostUserId,
}: Match): MatchJSON => ({
  id,
  title,
  has_password: hasPassword,
  host_user_id: hostUserId,
});
