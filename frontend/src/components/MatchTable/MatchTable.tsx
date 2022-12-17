import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useFetchMatch from '../../hooks/useFetchMatch';
import MatchUsers from './MatchUsers';
import MatchBoard from './MatchBoard';
import UserMatchCards from './UserMatchCards';
import CardSet from '../../card-set';
import useFetchMatchUsers from '../../hooks/useFetchMatchUsers';

const Containter = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: var(--spacing);
`;

const MatchTable = () => {
  const { matchId } = useParams();

  if (!matchId) {
    throw Error('Missing matchId.');
  }

  const { data: matchUsers } = useFetchMatchUsers(matchId);
  const { data: match } = useFetchMatch(matchId);

  const boardCards: Array<{ cardId: keyof typeof CardSet }> = [
    { cardId: 'seven-clubs' },
    { cardId: 'six-spades' },
    { cardId: 'two-hearts' },
    { cardId: 'king-diamonds' },
    { cardId: 'queen-diamonds' },
  ];

  const userMatchCards: Array<{ cardId: keyof typeof CardSet }> = [
    { cardId: 'six-spades' },
    { cardId: 'two-hearts' },
    { cardId: 'king-diamonds' },
  ];

  if (!match || !matchUsers) {
    return <div>spinner</div>;
  }

  //   const { data: matchUser } = useFetchMatchUser(matchId);

  if (match.status === 'ended') {
    // navigate navigate to game has ended page.
  }

  return (
    <Containter>
      <MatchUsers matchUsers={matchUsers} currentMoveUserId={0} />
      <MatchBoard cards={boardCards} />
      <UserMatchCards cards={userMatchCards} />
    </Containter>
  );
};

export default MatchTable;
