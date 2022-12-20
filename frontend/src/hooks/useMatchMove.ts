import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CurrentMove } from '../types/types';
import useBackendApi from './useBackendApi';
import CardSet from '../card-set';

const useMatchMove = () => {
  const [isSubmittingMove, setIsSubmittingMove] = useState(false);
  const { post } = useBackendApi();
  const queryClient = useQueryClient();

  const submitMove = (
    matchId: number,
    type: CurrentMove['type'],
    sourceCardId: keyof typeof CardSet | undefined,
    targetCardId?: keyof typeof CardSet,
  ) => {
    setIsSubmittingMove(true);

    return post(`/api/matches/${matchId}/move`, {
      matchId,
      type,
      sourceCardId,
      targetCardId,
    }).then(() => {
      queryClient.invalidateQueries(['matches', matchId, 'state']);
    }).finally(() => {
      setIsSubmittingMove(false);
    });
  };

  return { isSubmittingMove, submitMove };
};

export default useMatchMove;
