import { useQuery } from '@tanstack/react-query';
import { fromJSON } from '../models/MatchState';
import { MatchState, MatchStateJSON } from '../types/types';
import useBackendApi from './useBackendApi';

const useFetchMatchState = (matchId: string): {
  data: MatchState | undefined,
  isFetching: boolean
} => {
  const { get } = useBackendApi();
  const fetchMatchState = () => get<MatchStateJSON>(`/api/matches/${matchId}/state`).then(({ data }) => fromJSON(data));
  const { data, isFetching } = useQuery({ queryKey: ['matches', matchId, 'state'], queryFn: fetchMatchState });
  return { data, isFetching };
};

export default useFetchMatchState;
