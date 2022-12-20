import React, { useMemo, useState } from 'react';
import { CurrentMove } from '../types/types';

export const CurrentMoveContext = React.createContext<undefined | {
  currentMove: CurrentMove | undefined,
  setCurrentMove: React.Dispatch<React.SetStateAction<CurrentMove | undefined>>
}>(undefined);

type Props = {
  children: React.ReactNode,
}

const CurrentUserProvider = ({ children }: Props) => {
  const [currentMove, setCurrentMove] = useState<CurrentMove | undefined>(undefined);
  const contextValue = useMemo(() => ({ currentMove, setCurrentMove }), [currentMove]);

  return (
    <CurrentMoveContext.Provider value={contextValue}>
      {children}
    </CurrentMoveContext.Provider>
  );
};

export default CurrentUserProvider;
