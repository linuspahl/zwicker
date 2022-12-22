import styled from 'styled-components';

import CardSet from '../../card-set';
import useCurrentMove from '../../hooks/useCurrentMove';
import useMatchMove from '../../hooks/useMatchMove';
import getCard from '../../utils/getCard';
import Card from './Card';
import CardList from './CardsList';

const Containter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const MatchBoard = ({ cards, isCurrentMove, matchId }: {
  cards: Array<{ cardId: keyof typeof CardSet }>,
  isCurrentMove: boolean,
  matchId: number,
}) => {
  const { currentMove } = useCurrentMove();
  const { submitMove } = useMatchMove();
  const hasFocus = isCurrentMove && (currentMove?.type === 'picking' || currentMove?.type === 'building');

  const onClick = (cardId: keyof typeof CardSet) => {
    const card = getCard(cardId);
    if (isCurrentMove) {
      if (!currentMove?.sourceCardId) {
        // alert: you need to select a card from your hand first
      }

      if (currentMove?.type === 'building') {
        if (!currentMove?.sourceCardValue) {
          // alert: you need to select a value first
        }

        return submitMove({
          matchId,
          type: currentMove.type,
          sourceCardId: currentMove.sourceCardId,
          targetCardId: cardId,
        });
      }

      if (currentMove?.type === 'picking') {
        if (!currentMove.sourceCardValue) {
          // alert: you need to select a value first
        }

        if (currentMove.sourceCardValue !== card.value
          && currentMove.sourceCardValue !== card.alternativeValue) {
          // alert: card values do not match
        }

        return submitMove({
          matchId,
          type: currentMove.type,
          sourceCardId: currentMove.sourceCardId,
          sourceCardValue: currentMove.sourceCardValue,
          targetCardId: cardId,
        });
      }
    }

    return undefined;
  };
  return (
    <Containter>
      <CardList hasFocus={hasFocus}>
        {cards.map((({ cardId }) => (
          <Card
            cardId={cardId}
            key={cardId}
            onClick={() => onClick(cardId)}
          />
        )))}
      </CardList>
    </Containter>
  );
};

export default MatchBoard;
