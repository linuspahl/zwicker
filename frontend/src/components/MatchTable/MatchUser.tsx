import styled, { css } from 'styled-components';

const Containter = styled.div(({
  $userHasCurrentMove,
}: {
  $userHasCurrentMove: boolean
}) => css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 80px;
  width: 150px;
  background-color: aliceblue;
  border-radius: 12px;
  border-style: solid;
  border-width: 4px;
  border-color: ${$userHasCurrentMove ? '#f44336' : 'transparent'};
  padding: var(--tiny-spacing);

  :not(:first-child) {
    margin-left: 6px;
  }
`);

const Position = styled.div`
  border-radius: 50%;
  height: 36px;
  display: flex;
  width: 46px;
  border: 3px solid gray;
  justify-content: center;
  align-items: center;
  margin-right: var(--tiny-spacing);
`;

const Username = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  display: inline-block;
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
