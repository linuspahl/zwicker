import { useQuery } from '@tanstack/react-query';
import { fromJSON } from '../models/User';
import { UserJSON } from '../types/types';
import useBackendApi from './useBackendApi';
import useBackendApiToken from './useBackendApiToken';

const useFetchCurrentUser = () => {
  const { get } = useBackendApi();
  const { accessToken } = useBackendApiToken();
  const fetchUser = () => get<UserJSON>('/api/session/current').then(({ data }) => fromJSON(data));
  const { data, isFetching } = useQuery({
    queryKey: ['session', accessToken],
    queryFn: fetchUser,
    enabled: !!accessToken,
    retry: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  return { data, isFetching };
};

export default useFetchCurrentUser;
