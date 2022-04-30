import styled from "styled-components"
import { Button, PageContainer } from "./common"
import H1 from "./common/H1"
import H2 from "./common/H2"
import MatchesList from './MatchesList'
import { useNavigate } from "react-router-dom";

const EXAMPLE_MATCHES = [
  {
    id: 'match-1',
    title: 'Just for fun!',
    hasPassword: true,
    hostUserId: 1,
  },
  {
    id: 'match-2',
    title: 'Kaffeeklatsch',
    hasPassword: false,
    hostUserId: 2,
  }
]

const Section = styled.div`
  margin-bottom: 24px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 27px;
  align-items: center;
`

const CreateNew = () => {
  const navigate = useNavigate();
  
  return (
    <ButtonGroup>
      <Button onClick={() => navigate("matches/create")}>...oder neue Partie erstellen</Button>
    </ButtonGroup>
  )
}

const StartPage = () => {
  return (
    <PageContainer>
      <H1>Zwicker</H1>
      <Section>
        <H2>Offene Partien</H2>
        <MatchesList matches={EXAMPLE_MATCHES} />
      </Section>
      <Section>
        <H2>Laufende Partien</H2>
        <MatchesList matches={[]} />
      </Section>
      <CreateNew />
    </PageContainer>
  )
}

export default StartPage
