import styled, { css } from 'styled-components';
import cards from '../../card-set';

const CardContainer = styled.div(({ $isSelected }: { $isSelected: boolean }) => css`
  position: relative;
  display: flex;
  height: auto;
  width: 100%;
  max-width: 200px;
  min-width: 150px;
  cursor: pointer;

  transform: ${$isSelected ? 'translateY(-21px)' : 'none'};

  :not(:last-of-type) {
    margin-right: clamp(3px, 1vw, 6px);
  }

  svg {
    width: 100%;
    height: auto;
  }
`);

const Card = ({
  cardId,
  className,
  overlay,
  onClick,
  isSelected,
}: {
  cardId: keyof typeof cards,
  className?: string,
  overlay?: React.ReactNode,
  onClick?: () => void,
  isSelected?: boolean
}) => {
  const card = cards[cardId];

  if (!card) {
    throw Error(`card image not defined for card ${cardId}`);
  }

  const { image: Image } = card;

  return (
    <CardContainer className={className} onClick={onClick} $isSelected={!!isSelected}>
      {overlay}
      <Image />
    </CardContainer>
  );
};

Card.defaultProps = {
  overlay: undefined,
  className: undefined,
  onClick: undefined,
  isSelected: false,
};

export default Card;
