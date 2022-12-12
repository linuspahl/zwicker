import React from 'react';
import useFetchCurrentUser from '../hooks/useFetchCurrentUser';
import { User } from '../types/types';

export const CurrentUserContext = React.createContext<undefined | User>(undefined);

type Props = {
  children: React.ReactNode,
}

const CurrentUserProvider = ({ children }: Props) => {
  const { data: currentUser, isFetching } = useFetchCurrentUser();

  if (isFetching) {
    return <div>Spinner</div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
