import styled from 'styled-components';
import useCurrentUser from '../../hooks/useCurrentUser';
import { MatchUser } from '../../types/types';
import { H2, Icon } from '../common';

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  :not(:last-child) {
    margin-bottom: var(--small-spacing);
  }
`;

const LeftCol = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
`;

const Actions = styled.div``;

const Number = styled.div`
  font-size: var(--large-font-size);
  margin-right: 5px;
  height: 30px;
  width: 30px;
  border-radius: 50px;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;

`;

type Props = {
  hostUserId: number,
  matchUsers: Array<MatchUser>
}

const Participants = ({ hostUserId, matchUsers }: Props) => {
  const currentUser = useCurrentUser();
  const currentUserIsHost = currentUser?.id === hostUserId;

  return (
    <div>
      <H2>Teilnehmer</H2>
      {!!matchUsers?.length && (
        <ul>
          {matchUsers.map(({ user: { username }, id, userId }, index) => (
            <ListItem key={id}>
              <LeftCol>
                <Number>{index + 1}</Number>
                <Name>
                  {userId === currentUser?.id && <Icon name="star" />}{username}
                </Name>
              </LeftCol>
              {(currentUserIsHost && userId !== hostUserId) && (
                <Actions>
                  <Icon name="delete" />
                </Actions>
              )}
            </ListItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Participants;
