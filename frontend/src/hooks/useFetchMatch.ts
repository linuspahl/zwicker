import { useQuery } from '@tanstack/react-query';
import { fromJSON } from '../models/Match';
import { Match, MatchJSON } from '../types/types';
import useBackendApi from './useFetchApi';

const useFetchMatch = (
  matchId: string,
  { refetchInterval }: { refetchInterval?: number } = {},
): { data: Match | undefined, isFetching: boolean } => {
  const { get } = useBackendApi();
  const fetchMatches = () => get<MatchJSON>(`/api/matches/${matchId}`).then(({ data }) => fromJSON(data));
  const { data, isFetching } = useQuery({
    queryKey: ['matches', matchId],
    queryFn: fetchMatches,
    refetchInterval,
  });
  return {
    data,
    isFetching,
  };
};

export default useFetchMatch;
