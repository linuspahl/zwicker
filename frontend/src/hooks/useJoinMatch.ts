import { useState } from 'react';
import useBackendApi from './useBackendApi';

const useJoinMatch = () => {
  const [isJoining, setIsJoining] = useState(false);
  const { post } = useBackendApi();
  const joinMatch = (matchId: string) => {
    setIsJoining(true);
    return post(`/api/matches/${matchId}/join`).finally(() => {
      setIsJoining(false);
    });
  };

  return { isJoining, joinMatch };
};

export default useJoinMatch;
