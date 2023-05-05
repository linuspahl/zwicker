import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import {
  Alert, Button, H1, PageContainer,
} from '../common';
import Participants from './Participants';
import useFetchMatch from '../../hooks/useFetchMatch';
import useDeleteMatch from '../../hooks/useDeleteMatch';
import useStartMatch from '../../hooks/useStartMatch';
import useCurrentUser from '../../hooks/useCurrentUser';
import useFetchMatchUsers from '../../hooks/useFetchMatchUsers';

const Container = styled.div`
  
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--extra-large-spacing);
`;

const MatchStartError = styled(Alert)`
  margin-top: var(--spacing);
`;

const MatchLobby = () => {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const { matchId } = useParams();
  const { deleteMatch } = useDeleteMatch();
  const { startMatch, error: matchStartError } = useStartMatch();

  if (!matchId) {
    throw Error('Missing matchId.');
  }

  const { data: match } = useFetchMatch(matchId, { refetchInterval: 3000 });
  const { data: matchUsers } = useFetchMatchUsers(matchId, { refetchInterval: 3000 });
  const disableMatchStart = matchUsers ? matchUsers.length <= 1 : false;
  const onMatchDelete = useCallback(() => deleteMatch(matchId), [deleteMatch, matchId]);
  const onMatchStart = useCallback(() => startMatch(matchId), [startMatch, matchId]);

  if (match?.status === 'running') {
    navigate(`/matches/table/${matchId}`, { replace: true });
  }

  const currentUserIsHost = user?.id === match?.hostUserId;

  return (
    <PageContainer>
      {!!match && !!matchUsers && (
        <>
          <H1>
            Lobby - &quot;{match.title}&quot;
          </H1>
          <Container>
            <Participants
              matchUsers={matchUsers}
              hostUserId={match.hostUserId}
            />
          </Container>
        </>
      )}
      <ActionsRow>
        {currentUserIsHost ? (
          <>
            <Button onClick={onMatchDelete}>Spiel löschen</Button>
            <Button onClick={onMatchStart} disabled={disableMatchStart}>Spiel starten</Button>
          </>
        ) : <Button>Spiel verlassen</Button>}
      </ActionsRow>
      {matchStartError && (
        <MatchStartError type="danger">
          {matchStartError}
        </MatchStartError>
      )}
    </PageContainer>
  );
};

export default MatchLobby;
