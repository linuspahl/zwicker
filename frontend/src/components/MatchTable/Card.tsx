import styled from 'styled-components';
import cards from '../../card-set';

const CardContainer = styled.div`
  position: relative;
  display: flex;
  height: auto;
  width: 100%;
  max-width: 200px;
  min-width: 150px;
  cursor: pointer;

  :not(:last-of-type) {
    margin-right: clamp(3px, 1vw, 6px);
  }

  svg {
    width: 100%;
    height: auto;
  }
`;

const Card = ({
  cardId,
  className,
  overlay,
  onClick,
}: {
  cardId: keyof typeof cards,
  className?: string,
  overlay?: React.ReactNode,
  onClick?: () => void,
}) => {
  const card = cards[cardId];
  if (!card) {
    throw Error(`card image not defined for card ${cardId}`);
  }
  const { image: Image } = card;
  return (
    <CardContainer className={className} onClick={onClick}>
      {overlay}
      <Image />
    </CardContainer>
  );
};

Card.defaultProps = {
  overlay: undefined,
  className: undefined,
  onClick: undefined,
};

export default Card;
