import styled, { css } from 'styled-components';

const Containter = styled.div(({
  $userHasCurrentMove,
}: {
  $userHasCurrentMove: boolean
}) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 150px;
  background-color: aliceblue;
  border-radius: 12px;
  border-style: solid;
  border-width: 4px;
  border-color: ${$userHasCurrentMove ? 'black' : 'transparent'};
  padding: var(--tiny-spacing);

  :not(:first-child) {
    margin-left: 6px;
  }
`);

const Position = styled.div`
  
`;

const Username = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  width: 100%;
  white-space: nowrap;
`;

const MatchUser = ({
  position,
  username,
  userHasCurrentMove,
}: { position: number,
  username: string,
  userHasCurrentMove: boolean
}) => (
  <Containter $userHasCurrentMove={userHasCurrentMove}>
    <Position>{position}</Position>
    <Username>{username}</Username>
  </Containter>
);

export default MatchUser;
