import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CurrentMove, Match } from '../types/types';
import useBackendApi from './useFetchApi';
import CardSet from '../card-set';
import useActionRequest from './useActionRequest';

const useMatchMove = () => {
  // const [isSubmittingMove, setIsSubmittingMove] = useState(false);
  // const { post } = useBackendApi();
  const { data: createdMatchMove, performAction: createMatchMove } = useActionRequest('create', 'match_move');

  const queryClient = useQueryClient();

  const submitMove = (payload: {
    matchId: number,
    type: CurrentMove['type'],
    sourceCardId: keyof typeof CardSet | undefined,
    sourceCardValue?: number,
    targetCardValue?: number,
    targetCardId?: keyof typeof CardSet,
  }) => createMatchMove(payload);

  // (
  //   {
  //     matchId,
  //     type,
  //     sourceCardId,
  //     sourceCardValue,
  //     targetCardId,
  //     targetCardValue,
  //   }:{
  //   matchId: number,
  //   type: CurrentMove['type'],
  //   sourceCardId: keyof typeof CardSet | undefined,
  //   sourceCardValue?: number,
  //   targetCardValue?: number,
  //   targetCardId?: keyof typeof CardSet,
  // },
  // ) => {
  //
  //   return post(`/api/matches/${matchId}/move`, {
  //     matchId,
  //     type,
  //     sourceCardId,
  //     sourceCardValue,
  //     targetCardId,
  //     targetCardValue,
  //   }).then(() => {
  //     queryClient.invalidateQueries(['matches', matchId, 'state']);
  //   }).finally(() => {
  //     setIsSubmittingMove(false);
  //   });
  // };

  return { submitMove };
};

export default useMatchMove;
