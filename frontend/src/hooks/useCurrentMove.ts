import React from 'react';
import { CurrentMoveContext } from '../contexts/CurrentMoveProvider';

const useCurrentMove = () => {
  const currentMove = React.useContext(CurrentMoveContext);

  if (!currentMove) {
    throw new Error('useCurrentMove needs to be wrappen in CurrentMoveContext');
  }

  return currentMove;
};

export default useCurrentMove;
