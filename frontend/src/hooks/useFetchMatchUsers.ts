import { useQuery } from '@tanstack/react-query';
import { MatchUser } from '../types/types';
import useBackendApi from './useBackendApi';

const useFetchMatchUsers = (matchId: string): {
    data: Array<MatchUser> | undefined,
    isFetching: boolean
} => {
  const { get } = useBackendApi();
  const fetchMatches = () => get<Array<MatchUser>>(`/api/matches/${matchId}/users`).then(({ data }) => data);
  const { data, isFetching } = useQuery({ queryKey: ['matches', matchId, 'users'], queryFn: fetchMatches });
  return { data, isFetching };
};

export default useFetchMatchUsers;
