import { useState } from 'react';
import useBackendApi from './useFetchApi';

const useJoinMatch = () => {
  const [isJoining, setIsJoining] = useState(false);
  const { post } = useBackendApi();
  const joinMatch = (matchId: number) => {
    setIsJoining(true);
    return post(`/api/matches/${matchId}/join`).finally(() => {
      setIsJoining(false);
    });
  };

  return { isJoining, joinMatch };
};

export default useJoinMatch;
