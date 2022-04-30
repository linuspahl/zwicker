import styled from "styled-components";
import { H1, H2, PageContainer } from "../common"
import Participants from './Participants'
import Settings from './Settings'
import { useLocation } from 'react-router-dom'
import { Match } from "../../types/types";

const participants = [
  {
    username: 'User A',
    id: 1,
  },
  {
    username: 'User A',
    id: 2,
  }
]

const Grid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  
  @media only screen and (min-device-width: 480px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }
`;

const EXAMPLE_MATCH = {
  id: 'match-id',
  title: 'Match Title',
  hostUserId: 1,
  hasPassword: false,
}

type Props = {
  match?: Match
}
const MatchLobby = ({ match = EXAMPLE_MATCH}: Props) => {
  const currentUserId = 1;
  const isHost = currentUserId === match.hostUserId;

  return (
    <PageContainer size="large">
      <H1>Lobby - "{match.title}"</H1>
      <Grid>
        <Participants participants={participants} currentUserIsHost={isHost} hostUserId={currentUserId} />
        <Settings match={match} />
      </Grid>
    </PageContainer>
  )
}

export default MatchLobby
