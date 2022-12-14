import { useQuery } from '@tanstack/react-query';
import { fromJSON } from '../models/Match';
import { Match, MatchJSON } from '../types/types';
import useBackendApi from './useBackendApi';

const useMatch = (matchId: string): { data: Match | undefined, isFetching: boolean } => {
  const { get } = useBackendApi();
  const fetchMatches = () => get<MatchJSON>(`/api/matches/${matchId}`).then(({ data }) => fromJSON(data));
  const { data, isFetching } = useQuery({ queryKey: ['matches', matchId], queryFn: fetchMatches });
  return { data, isFetching };
};

export default useMatch;
