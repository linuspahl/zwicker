import styled from 'styled-components';
import CardSet from '../../card-set';
import CardList from './CardsList';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 300px;
`;

type Props = {
  cards: Array<{ cardId: keyof typeof CardSet }>;
}

const UserMatchCards = ({ cards }: Props) => (
  <Container>
    <CardList cards={cards} />
  </Container>
);

export default UserMatchCards;
