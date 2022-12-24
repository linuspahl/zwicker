import styled, { css } from 'styled-components';
import cards, { jockerCards } from '../../card-set';
import getCard from '../../utils/getCard';

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

const JokerValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 17%;
  top: 2%;
  line-height: 1;
  font-size: 36px;
`;

const Card = ({
  cardId,
  className,
  overlay,
  badge,
  onClick,
  isSelected,
}: {
  cardId: keyof typeof cards,
  className?: string,
  overlay?: React.ReactNode,
  badge?: React.ReactNode,
  onClick?: () => void,
  isSelected?: boolean
}) => {
  const { image: Image, value } = getCard(cardId);

  const isJoker = jockerCards.includes(cardId);

  return (
    <CardContainer className={className} onClick={onClick} $isSelected={!!isSelected}>
      {isJoker && <JokerValue>{value}</JokerValue>}
      {badge}
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
  badge: undefined,
};

export default Card;
