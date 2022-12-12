import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Button, H1, PageContainer } from '../common';
import Participants from './Participants';
import Settings from './Settings';
import useFetchMatch from '../../hooks/useFetchMatch';

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

const ActionsRow = styled.div`
  display: flex;
`;

const MatchLobby = () => {
  const currentUserId = 1;
  const { matchId } = useParams();

  if (!matchId) {
    throw Error('Missing matchId.');
  }

  const { data: match } = useFetchMatch(matchId);

  const currentUserIsHost = currentUserId === match?.hostUserId;

  return (
    <PageContainer size="large">
      {!!match && (
        <>
          <H1>
            Lobby - &quot;{match.title}&quot;
          </H1>
          <Grid>
            <Participants
              participants={participants}
              currentUserIsHost={currentUserIsHost}
            />
            <Settings match={match} />
          </Grid>
        </>
      )}
      <ActionsRow>
        {currentUserIsHost ? (
          <>
            <Button>Spiel löschen</Button>
            <Button>Spiel starten</Button>
          </>
        ) : <Button>Spiel verlassen</Button>}
      </ActionsRow>
    </PageContainer>
  );
};

export default MatchLobby;
