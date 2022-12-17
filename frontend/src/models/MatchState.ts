import { MatchState, MatchStateJSON } from '../types/types';

// eslint-disable-next-line import/prefer-default-export
export const fromJSON = ({
  id,
  userCards = [],
  board_cards: boardCards,
  current_move_user_id: currentMoveUserId,
}: MatchStateJSON): MatchState => ({
  id,
  currentMoveUserId,
  boardCards,
  userCards: userCards.map(({ user_id: userId, cards }) => ({
    userId,
    cards,
  })),
});
