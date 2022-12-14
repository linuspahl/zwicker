import { useQuery } from '@tanstack/react-query';
import useBackendApi from './useBackendApi';

const useFetchMatchUsers = (matchId: string): {
    data: Array<{ id: number, username: string }> | undefined,
    isFetching: boolean
} => {
  const { get } = useBackendApi();
  const fetchMatches = () => get<Array<{ id: number, username: string }>>(`/api/matches/${matchId}/users`).then(({ data }) => data);
  const { data, isFetching } = useQuery({ queryKey: ['matches', matchId, 'users'], queryFn: fetchMatches });
  return { data, isFetching };
};

export default useFetchMatchUsers;
