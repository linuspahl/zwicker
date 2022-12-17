import styled from 'styled-components';
import CardSet from '../../card-set';
import Card from './Card';

const Container = styled.div`
  overflow-x: auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  overflow-x: scroll;

  padding-left: var(--tiny-spacing);
  padding-right: var(--tiny-spacing);
`;

const CardList = ({ cards }: { cards: Array<{ cardId: keyof typeof CardSet }> }) => (
  <Container>
    <InnerContainer>
      {cards.map((({ cardId }) => <Card cardId={cardId} key={cardId} />))}
    </InnerContainer>
  </Container>
);

export default CardList;
