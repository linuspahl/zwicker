import styled from "styled-components";
import { H2, Icon } from "../common";

const List = styled.ul`

`

const  ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  :not(:last-child) {
    margin-bottom: 9px;
  }
`

const LeftCol = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.div``

const Actions = styled.div``

const Number = styled.div`
  font-size: 24px;
  margin-right: 5px;
  height: 30px;
  width: 30px;
  border-radius: 50px;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;

`

type Props = {
  participants: Array<{ username: string, id: number }>,
  currentUserIsHost: boolean,
  hostUserId: number,
}

const Participants = ({ participants, currentUserIsHost, hostUserId  }: Props) => {
  return (
    <div>
      <H2>Teilnehmer</H2>
      <ul>
        {participants.map(({ username, id }, index) => {
          return (
            <ListItem>
              <LeftCol>
                <Number>{index + 1}</Number>
                <Name>{username}</Name>
              </LeftCol>
              {currentUserIsHost &&
                <Actions>
                  <Icon name="delete" />
                </Actions>
              }
            </ListItem>
          )
        })}
      </ul>
    </div>
  )
}

export default Participants;