import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useBackendApi from '../hooks/useBackendApi';
import useBackendApiToken from '../hooks/useBackendApiToken';
import { User, UserJSON } from '../types/types';

export const CurrentUserContext = React.createContext<undefined | User>(undefined);
const fromJSON = ({ username, id }: UserJSON): User => ({
  id,
  username,
});

const useFetchCurrentUser = () => {
  const { get } = useBackendApi<UserJSON>();
  const accessToken = useBackendApiToken();
  const fetchUsers = () => get('/api/session/current').then(({ data }) => fromJSON(data));
  const { data, isLoading } = useQuery({ queryKey: ['session', accessToken], queryFn: fetchUsers, enabled: !!accessToken });
  return { data, isLoading };
};

const CurrentUserProvider = ({ children }: {
  children: React.ReactNode,
}) => {
  const { data: currentUser, isLoading } = useFetchCurrentUser();

  if (isLoading) {
    return <div>Spinner</div>;
  }

  return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>;
};

export default CurrentUserProvider;
