import { useQuery } from '@tanstack/react-query';
import { fromJSON } from '../models/User';
import { UserJSON } from '../types/types';
import useBackendApi from './useBackendApi';
import useBackendApiToken from './useBackendApiToken';

const useFetchCurrentUser = () => {
  const { get } = useBackendApi();
  const { accessToken } = useBackendApiToken();
  const fetchUsers = () => get<UserJSON>('/api/session/current').then(({ data }) => fromJSON(data));
  const { data, isLoading } = useQuery({ queryKey: ['session', accessToken], queryFn: fetchUsers, enabled: !!accessToken });
  return { data, isLoading };
};

export default useFetchCurrentUser;
