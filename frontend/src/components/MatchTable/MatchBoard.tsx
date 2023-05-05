import styled from 'styled-components';

import CardSet from '../../card-set';
import useCurrentMove from '../../hooks/useCurrentMove';
import useMatchMove from '../../hooks/useMatchMove';
import { MatchState } from '../../types/types';
import getCard from '../../utils/getCard';
import Card from './Card';
import CardList from './CardsList';
import Section from './Section';

const Containter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
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

const CardStackBadgeContainer = styled.div`
  border-radius: 10px;
  display: flex;
  justify-content: center;
  position: absolute;
  right: 12px;
  top: 3px;
  background-color: #d1d1d1;
  font-size: 26px;
`;

const CardStackBadge = ({ cardStack }: {
  cardStack: Array<{ cardId: keyof typeof CardSet, value?: number }>
}) => {
  const cardStackValue = cardStack.reduce((acc, card) => acc + (card.value ?? 0), 0);
  return (
    <CardStackBadgeContainer>
      {cardStackValue} ({cardStack.length} Karten)
    </CardStackBadgeContainer>
  );
};

const BuildOptions = ({ cardId, matchId }: { matchId: number, cardId: keyof typeof CardSet }) => {
  const { currentMove } = useCurrentMove();
  const { submitMove } = useMatchMove();

  const onClick = (selectedValue: number) => (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();

    return submitMove({
      matchId,
      type: currentMove?.type,
      sourceCardId: currentMove?.sourceCardId,
      sourceCardValue: currentMove?.sourceCardValue,
      targetCardId: cardId,
      targetCardValue: selectedValue,
    });
  };

  const { value, alternativeValue } = getCard(cardId);

  return (
    <Options>
      <Option onClick={onClick(value)}>{value}</Option>
      {alternativeValue && <Option onClick={onClick(alternativeValue)}>{alternativeValue}</Option>}
    </Options>
  );
};

const MatchBoard = ({ cardStacks, isCurrentMove, matchId }: {
  cardStacks: MatchState['boardCards'],
  isCurrentMove: boolean,
  matchId: number,
}) => {
  const { currentMove, setCurrentMove } = useCurrentMove();
  const { submitMove } = useMatchMove();
  const hasFocus = isCurrentMove && (currentMove?.type === 'picking' || (currentMove?.type === 'building' && currentMove?.sourceCardValue !== undefined));

  const onClick = (
    { cardId }: { cardId: keyof typeof CardSet, value?: number },
    cardStack: Array<{ cardId: keyof typeof CardSet, value?: number }>,
  ) => {
    const card = getCard(cardId);

    if (isCurrentMove) {
      if (!currentMove?.sourceCardId) {
        // alert: you need to select a card from your hand first
      }

      if (currentMove?.type === 'building') {
        if (!currentMove?.sourceCardValue) {
          // alert: you need to select a value first
        }

        if (cardStack.length === 1 && card.alternativeValue) {
          setCurrentMove((cur) => ({ ...cur, targetCardId: cardId }));

          return undefined;
        }

        return submitMove({
          matchId,
          type: currentMove.type,
          sourceCardId: currentMove.sourceCardId,
          sourceCardValue: currentMove?.sourceCardValue,
          targetCardId: cardId,
          targetCardValue: card.value,
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
    <Section headline="Tisch">
      <Containter>
        <CardList hasFocus={hasFocus}>
          {cardStacks.map(((cardStack) => {
            const card = cardStack.at(-1);

            if (!card) {
              return null;
            }

            const overlay = isCurrentMove
            && currentMove?.type === 'building'
            && currentMove?.targetCardId === card.cardId
            && !currentMove?.targetCardValue
            && cardStack.length === 1
              ? <BuildOptions cardId={card.cardId} matchId={matchId} /> : undefined;

            const badge = cardStack.length > 1
              ? <CardStackBadge cardStack={cardStack} />
              : undefined;
            return (
              <Card
                badge={badge}
                cardId={card.cardId}
                key={card.cardId}
                onClick={() => onClick(card, cardStack)}
                overlay={overlay}
              />
            );
          }))}
        </CardList>
      </Containter>
    </Section>
  );
};

export default MatchBoard;
