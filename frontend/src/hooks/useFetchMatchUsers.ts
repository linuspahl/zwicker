import { useQuery } from '@tanstack/react-query';
import { MatchUser } from '../types/types';
import useBackendApi from './useFetchApi';

const useFetchMatchUsers = (
  matchId: string,
  { refetchInterval }: { refetchInterval?: number } = {},
): {
  data: Array<MatchUser> | undefined,
  isFetching: boolean

} => {
  const { get } = useBackendApi();
  const fetchMatchUsers = () => get<Array<MatchUser>>(`/api/matches/${matchId}/users`).then(({ data }) => data);
  const { data, isFetching } = useQuery({
    queryKey: ['matches', matchId, 'users'],
    queryFn: fetchMatchUsers,
    refetchInterval: refetchInterval ?? 0,
  });
  return { data, isFetching };
};

export default useFetchMatchUsers;
