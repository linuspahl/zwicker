import { useQuery } from '@tanstack/react-query';
import { fromJSON } from '../models/Match';
import { Match, MatchJSON } from '../types/types';
import useBackendApi from './useFetchApi';

const useFetchMatches = (): { data: Array<Match> | undefined, isFetching: boolean } => {
  const { get } = useBackendApi();
  const fetchMatches = () => get<Array<MatchJSON>>('/api/matches').then(({ data }) => data.map(fromJSON));
  const { data, isFetching } = useQuery({
    queryKey: ['matches', 'list'],
    queryFn: fetchMatches,
    refetchOnWindowFocus: false,
  });
  return { data, isFetching };
};

export default useFetchMatches;
