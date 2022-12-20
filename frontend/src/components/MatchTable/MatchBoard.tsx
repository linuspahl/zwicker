import styled from 'styled-components';

import CardSet from '../../card-set';
import useCurrentMove from '../../hooks/useCurrentMove';
import Card from './Card';
import CardList from './CardsList';

const Containter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const MatchBoard = ({ cards, isCurrentMove }: {
  cards: Array<{ cardId: keyof typeof CardSet }>,
  isCurrentMove: boolean,
}) => {
  const { currentMove } = useCurrentMove();
  const hasFocus = isCurrentMove && (currentMove?.type === 'picking' || currentMove?.type === 'building');
  return (
    <Containter>
      <CardList hasFocus={hasFocus}>
        {cards.map((({ cardId }) => <Card cardId={cardId} key={cardId} />))}
      </CardList>
    </Containter>
  );
};

export default MatchBoard;
