import CardSet from '../card-set';

const getCard = (cardId: keyof typeof CardSet) => {
  const card = CardSet[cardId];

  if (!card) {
    throw Error(`card image not defined for card ${cardId}`);
  }

  return card;
};

export default getCard;
