import styled from 'styled-components';

import CardSet from '../../card-set';
import CardList from './CardsList';

const Containter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const MatchBoard = ({ cards }: { cards: Array<{ cardId: keyof typeof CardSet }> }) => (
  <Containter>
    <CardList cards={cards} />
  </Containter>
);

export default MatchBoard;
