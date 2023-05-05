import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBackendApi, { FetchError } from './useFetchApi';

const useStartMatch = () => {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { put } = useBackendApi();
  const startMatch = (matchId: string) => {
    setIsStarting(true);
    setError(undefined);

    return put(`/api/matches/${matchId}/start`).then(() => {
      navigate(`/matches/table/${matchId}`);
    }).catch((e: FetchError) => {
      setError(e.response?.data.message);
    }).finally(() => {
      setIsStarting(false);
    });
  };
  return { isStarting, startMatch, error };
};

export default useStartMatch;
