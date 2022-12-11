import React from 'react';
import { User } from '../types/types';

export const CurrentUserContext = React.createContext<undefined | User>(undefined);

type Props = {
  children: React.ReactNode,
}

const CurrentUserProvider = ({ children }: Props) => {
  const { data: currentUser, isLoading } = useFetchCurrentUser();

  if (isLoading) {
    return <div>Spinner</div>;
  }

  return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>;
};

export default CurrentUserProvider;
