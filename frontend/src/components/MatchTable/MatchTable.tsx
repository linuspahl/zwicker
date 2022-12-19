import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useFetchMatch from '../../hooks/useFetchMatch';
import MatchUsers from './MatchUsers';
import MatchBoard from './MatchBoard';
import UserMatchCards from './UserMatchCards';
import useFetchMatchUsers from '../../hooks/useFetchMatchUsers';
import useFetchMatchState from '../../hooks/useFetchMatchState';
import useCurrentUser from '../../hooks/useCurrentUser';

const Containter = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: var(--spacing);
`;

const MatchTable = () => {
  const { matchId } = useParams();
  const currentUser = useCurrentUser();

  if (!matchId) {
    throw Error('Missing matchId.');
  }

  const { data: matchUsers } = useFetchMatchUsers(matchId);
  const { data: matchState } = useFetchMatchState(matchId);
  const { data: match } = useFetchMatch(matchId);

  if (!match || !matchUsers || !matchState || !currentUser) {
    return <div>spinner</div>;
  }
  const userMatchCards = matchState.matchStateUsers.find(
    ({ userId }) => userId === currentUser.id,
  )?.cards ?? [];

  //   const { data: matchUser } = useFetchMatchUser(matchId);

  if (match.status === 'ended') {
    // navigate navigate to game has ended page.
  }

  return (
    <Containter>
      <MatchUsers matchUsers={matchUsers} currentMoveUserId={0} />
      <MatchBoard cards={matchState.boardCards.map((card) => ({ cardId: card }))} />
      <UserMatchCards cards={userMatchCards.map((card) => ({ cardId: card }))} />
    </Containter>
  );
};

export default MatchTable;
