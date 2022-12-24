import React, { useEffect, useMemo, useState } from 'react';
import { CurrentMove } from '../types/types';

export const CurrentMoveContext = React.createContext<undefined | {
  currentMove: CurrentMove | undefined,
  setCurrentMove: React.Dispatch<React.SetStateAction<CurrentMove | undefined>>
}>(undefined);

type Props = {
  children: React.ReactNode,
  currentMoveUserId: undefined | number,
}

const CurrentMoveProvider = ({ children, currentMoveUserId }: Props) => {
  const [currentMove, setCurrentMove] = useState<CurrentMove | undefined>(undefined);
  const contextValue = useMemo(() => ({ currentMove, setCurrentMove }), [currentMove]);

  useEffect(() => {
    setCurrentMove(undefined);
  }, [currentMoveUserId]);

  return (
    <CurrentMoveContext.Provider value={contextValue}>
      {children}
    </CurrentMoveContext.Provider>
  );
};

export default CurrentMoveProvider;
