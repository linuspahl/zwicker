import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { H1, PageContainer } from '../common';
import Participants from './Participants';
import Settings from './Settings';
import { Match } from '../../types/types';
import { getOne } from '../../actions/matches';

const participants = [
  {
    username: 'User A',
    id: 1,
  },
  {
    username: 'User A',
    id: 2,
  },
];

const Grid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  
  @media only screen and (min-device-width: 480px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }
`;

const useMatch = (matchId: string): { data: Match | undefined, isFetching: boolean } => {
  const { data, isFetching } = useQuery({ queryKey: ['matches', matchId], queryFn: () => getOne(matchId) });
  return { data, isFetching };
};

const MatchLobby = () => {
  const currentUserId = 1;
  const { matchId } = useParams();

  if (!matchId) {
    throw Error('Missing matchId.');
  }

  const { data: match } = useMatch(matchId);

  return (
    <PageContainer size="large">
      {!!match && (
      <>

        <H1>
          Lobby - "
          {match.title}
          "
        </H1>
        <Grid>
          <Participants
            participants={participants}
            currentUserIsHost={currentUserId === match.hostUserId}
            hostUserId={currentUserId}
          />
          <Settings match={match} />
        </Grid>
      </>
      )}
    </PageContainer>
  );
};

export default MatchLobby;
