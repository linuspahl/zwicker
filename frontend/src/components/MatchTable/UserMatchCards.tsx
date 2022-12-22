import styled from 'styled-components';
import CardSet from '../../card-set';
import useCurrentMove from '../../hooks/useCurrentMove';
import useMatchMove from '../../hooks/useMatchMove';
import { CurrentMove } from '../../types/types';
import getCard from '../../utils/getCard';
import Card from './Card';
import CardsList from './CardsList';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: var(--spacing);
`;

const Options = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: rgba(0,0,0, 0.75);
  font-size: var(--large-font-size);
  border-radius: 10px;
  border: 3px solid yellow;
`;

const Option = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;

  :not(:last-child) {
    border-bottom: 1px solid #b0b0b0;
  }
`;

const MoveOptions = ({ matchId, cardId }: { matchId: number, cardId: keyof typeof CardSet }) => {
  const { setCurrentMove, currentMove } = useCurrentMove();
  const { submitMove } = useMatchMove();

  const onClick = (type: CurrentMove['type']) => (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();

    if (type === 'dropping') {
      if (currentMove?.sourceCardId) {
        return submitMove({
          matchId,
          type,
          sourceCardId: currentMove.sourceCardId,
          targetCardId: currentMove?.targetCardId,
        }).then(() => {
          setCurrentMove(undefined);
        });
      }
    }

    if (type === 'building') {
      const { value, alternativeValue } = getCard(cardId);
      return setCurrentMove((cur = {}) => ({
        sourceCardId: cur.sourceCardId,
        sourceCardValue: alternativeValue ? undefined : value,
        type,
      }));
    }

    return setCurrentMove((cur = {}) => ({
      sourceCardId: cur.sourceCardId,
      type,
    }));
  };

  return (
    <Options>
      <Option onClick={onClick('picking')}>Nehmen</Option>
      <Option onClick={onClick('building')}>Bauen</Option>
      <Option onClick={onClick('dropping')}>Ablegen</Option>
    </Options>
  );
};

const BuildOptions = ({ cardId }: { cardId: keyof typeof CardSet }) => {
  const { setCurrentMove } = useCurrentMove();

  const onClick = (selectedValue: number) => (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    setCurrentMove((cur = {}) => ({
      sourceCardId: cur.sourceCardId,
      type: cur.type,
      sourceCardValue: selectedValue,
    }));
  };

  const { value, alternativeValue } = getCard(cardId);

  return (
    <Options>
      <Option onClick={onClick(value)}>{value}</Option>
      {alternativeValue && <Option onClick={onClick(alternativeValue)}>{alternativeValue}</Option>}
    </Options>
  );
};

const cardOverlay = (
  isCurrentMove: boolean,
  currentMove: CurrentMove | undefined,
  matchId: number,
  cardId: keyof typeof CardSet,
) => {
  if (isCurrentMove
    && currentMove?.sourceCardId === cardId
    && !currentMove?.type) {
    return <MoveOptions matchId={matchId} cardId={cardId} />;
  }

  if (isCurrentMove
    && currentMove?.sourceCardId === cardId
    && currentMove?.type === 'building'
    && currentMove?.sourceCardValue === undefined) {
    return <BuildOptions cardId={cardId} />;
  }

  return undefined;
};

type Props = {
  cards: Array<{ cardId: keyof typeof CardSet }>;
  isCurrentMove: boolean,
  matchId: number,
}

const UserMatchCards = ({ cards, isCurrentMove, matchId }: Props) => {
  const { setCurrentMove, currentMove } = useCurrentMove();
  console.log({ currentMove });

  return (
    <Container>
      <CardsList hasFocus={isCurrentMove && !currentMove?.sourceCardId}>
        {cards.map((({ cardId }) => {
          const cardIsSelected = isCurrentMove
          && currentMove?.sourceCardId === cardId
          && (currentMove?.type === 'picking' || currentMove?.type === 'building');
          const overlay = cardOverlay(isCurrentMove, currentMove, matchId, String(cardId));

          return (
            <Card
              isSelected={cardIsSelected}
              cardId={cardId}
              onClick={() => setCurrentMove({ sourceCardId: cardId })}
              key={cardId}
              overlay={overlay}
            />
          );
        }))}
      </CardsList>
    </Container>
  );
};

export default UserMatchCards;
