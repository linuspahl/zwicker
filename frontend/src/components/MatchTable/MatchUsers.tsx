import styled from 'styled-components';
import MatchUser from './MatchUser';
import { MatchUser as MatchUserType } from '../../types/types';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MatchUsers = ({
  matchUsers,
  currentMoveUserId,
}: {
  matchUsers: Array<MatchUserType>
  currentMoveUserId: number
}) => (
  <Container>
    {matchUsers.sort(
      (matchUser1, matchUser2) => (matchUser1.position - matchUser2.position),
    ).map(({
      position, user: { username }, userId, id,
    }) => (
      <MatchUser
        key={id}
        position={position}
        username={username}
        userHasCurrentMove={userId === currentMoveUserId}
      />
    ))}
  </Container>
);

export default MatchUsers;
