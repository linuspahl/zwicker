import { MatchState, MatchStateJSON } from '../types/types';

// eslint-disable-next-line import/prefer-default-export
export const fromJSON = ({
  id,
  matchStateUsers = [],
  boardCards,
  currentMoveUserId,
}: MatchStateJSON): MatchState => ({
  id,
  currentMoveUserId,
  boardCards,
  matchStateUsers,
});
