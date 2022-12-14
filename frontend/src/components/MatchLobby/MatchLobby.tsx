import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { Button, H1, PageContainer } from '../common';
import Participants from './Participants';
import Settings from './Settings';
import useFetchMatch from '../../hooks/useFetchMatch';
import useDeleteMatch from '../../hooks/useDeleteMatch';
import useStartMatch from '../../hooks/useStartMatch';

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
  justify-content: space-between;
  margin-top: var(--extra-large-spacing);
`;

const MatchLobby = () => {
  const navigate = useNavigate();
  const currentUserId = 1;
  const { matchId } = useParams();
  const { deleteMatch } = useDeleteMatch();
  const { startMatch } = useStartMatch();

  if (!matchId) {
    throw Error('Missing matchId.');
  }

  const { data: match } = useFetchMatch(matchId);
  const onMatchDelete = useCallback(() => deleteMatch(matchId), [deleteMatch, matchId]);
  const onMatchStart = useCallback(() => startMatch(matchId), [startMatch, matchId]);

  if (match?.status === 'running') {
    navigate(`/matches/table/${matchId}`, { replace: true });
  }

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
            <Button onClick={onMatchDelete}>Spiel löschen</Button>
            <Button onClick={onMatchStart}>Spiel starten</Button>
          </>
        ) : <Button>Spiel verlassen</Button>}
      </ActionsRow>
    </PageContainer>
  );
};

export default MatchLobby;
