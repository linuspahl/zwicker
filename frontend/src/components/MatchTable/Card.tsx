import styled from 'styled-components';
import cards from '../../card-set';

const CardContainer = styled.div`
  height: auto;
  width: 100%;
  max-width: 200px;
  min-width: 150px;

  :not(:last-of-type) {
    margin-right: 1%;
  }

  svg {
    width: 100%;
    height: auto;
  }
`;

const Card = ({ cardId }: { cardId: keyof typeof cards }) => {
  const card = cards[cardId];
  if (!card) {
    throw Error(`card image not defined for card ${cardId}`);
  }
  const { image: Image } = card;

  return (
    <CardContainer>
      <Image />
    </CardContainer>
  );
};

export default Card;
