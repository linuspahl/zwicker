import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBackendApi from './useBackendApi';

const useStartMatch = () => {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);
  const { put } = useBackendApi();
  const startMatch = (matchId: string) => {
    setIsStarting(true);
    return put(`/api/matches/${matchId}/start`).finally(() => {
      setIsStarting(false);
      navigate(`/matches/table/${matchId}`);
    });
  };
  return { isStarting, startMatch };
};

export default useStartMatch;
