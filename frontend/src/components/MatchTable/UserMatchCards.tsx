import React, { MouseEventHandler, useState } from 'react';
import styled, { css } from 'styled-components';
import CardSet from '../../card-set';
import useCurrentMove from '../../hooks/useCurrentMove';
import { CurrentMove } from '../../types/types';
import Card from './Card';
import CardsList from './CardsList';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: var(--spacing);
`;

const MoveOptions = styled.div`
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

const Overlay = () => {
  const { setCurrentMove } = useCurrentMove();

  const onClick = (type: CurrentMove['type']) => (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();

    setCurrentMove((cur = {}) => ({
      sourceCardId: cur.sourceCardId,
      type,
    }));
  };

  return (
    <MoveOptions>
      <Option onClick={onClick('picking')}>Nehmen</Option>
      <Option onClick={onClick('building')}>Bauen</Option>
      <Option onClick={onClick('dropping')}>Ablegen</Option>
    </MoveOptions>
  );
};

type Props = {
  cards: Array<{ cardId: keyof typeof CardSet }>;
  isCurrentMove: boolean,
}

const UserMatchCards = ({ cards, isCurrentMove }: Props) => {
  const { setCurrentMove, currentMove } = useCurrentMove();

  return (
    <Container>
      <CardsList hasFocus={!currentMove?.sourceCardId}>
        {cards.map((({ cardId }) => {
          const displayCardOverlay = isCurrentMove && currentMove?.sourceCardId === cardId

          && currentMove?.type !== 'picking' && currentMove?.type !== 'dropping';

          return (
            <Card
              cardId={cardId}
              onClick={() => setCurrentMove({ sourceCardId: cardId })}
              key={cardId}
              overlay={displayCardOverlay
                ? <Overlay />
                : undefined}
            />
          );
        }))}
      </CardsList>
    </Container>
  );
};

export default UserMatchCards;
