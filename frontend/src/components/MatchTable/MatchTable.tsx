import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import MatchUsers from './MatchUsers';
import MatchBoard from './MatchBoard';
import UserMatchCards from './UserMatchCards';
import useFetchMatchState from '../../hooks/useFetchMatchState';
import useCurrentUser from '../../hooks/useCurrentUser';
import CurrentMoveProvider from '../../contexts/CurrentMoveProvider';
import { Match, MatchState, MatchUser } from '../../types/types';
import useFetchData from '../../hooks/useFetchData';

const Containter = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: var(--spacing);
  justify-content: space-between;
`;

const MatchTable = ({ matchState }: { matchState: MatchState | null }) => {
  const { matchId } = useParams();
  const currentUser = useCurrentUser();

  if (!matchId) {
    throw Error('Missing matchId.');
  }

  const { data: match } = useFetchData<Match>({
    room: `match_${matchId}`,
    dataType: 'match',
    entityId: matchId,
  });

  const { data: matchUsers } = useFetchData<Array<MatchUser>>({
    room: `match_users_${matchId}`,
    dataType: 'match_users',
    entityId: matchId,
  });

  if (!match || !matchUsers || !matchState || !currentUser) {
    return <div>spinner</div>;
  }
  const userMatchCards = matchState.matchStateUsers.find(
    ({ userId }) => userId === currentUser.id,
  )?.cards ?? [];

  if (match.status === 'ended') {
    // navigate navigate to game has ended page.
  }

  return (
    <Containter>
      <MatchUsers
        matchUsers={matchUsers}
        currentMoveUserId={matchState.currentMoveUserId}
      />
      <MatchBoard
        matchId={match.id}
        cardStacks={matchState.boardCards}
        isCurrentMove={matchState.currentMoveUserId === currentUser.id}
      />
      <UserMatchCards
        matchId={match.id}
        cards={userMatchCards.map((card) => ({ cardId: card }))}
        isCurrentMove={matchState.currentMoveUserId === currentUser.id}
      />
    </Containter>
  );
};

const MatchTableWrapper = () => {
  const { matchId } = useParams();
  if (!matchId) {
    throw Error('Missing matchId.');
  }
  const { data: matchState } = useFetchData<MatchState>({
    room: `match_state_${matchId}`,
    dataType: 'match_state',
    entityId: matchId,
  });

  return (
    <CurrentMoveProvider currentMoveUserId={matchState?.currentMoveUserId}>
      <MatchTable matchState={matchState} />
    </CurrentMoveProvider>
  );
};

export default MatchTableWrapper;
