import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBackendApi from './useFetchApi';

const useDeleteMatch = () => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const { del } = useBackendApi();
  const deleteMatch = (matchId: string) => {
    setIsDeleting(true);
    return del(`/api/matches/${matchId}/delete`).finally(() => {
      setIsDeleting(false);
      navigate('/');
    });
  };
  return { isDeleting, deleteMatch };
};

export default useDeleteMatch;
