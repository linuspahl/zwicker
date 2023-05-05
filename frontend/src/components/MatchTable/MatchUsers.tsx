import styled from 'styled-components';
import MatchUser from './MatchUser';
import { MatchUser as MatchUserType } from '../../types/types';
import Section from './Section';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const MatchUsers = ({
  matchUsers,
  currentMoveUserId,
}: {
  matchUsers: Array<MatchUserType>
  currentMoveUserId: number
}) => (
  <Section headline="Spieler">
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
  </Section>
);

export default MatchUsers;
