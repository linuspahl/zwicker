import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Alert, Button, PageContainer } from './common';
import H1 from './common/H1';
import H2 from './common/H2';
import MatchesList from './MatchesList';
import useFetchMatches from '../hooks/useFetchMatches';

const Section = styled.div`
  :not(:last-child) {
    margin-bottom: var(--large-spacing);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--extra-large-spacing);
  align-items: center;
`;

const CreateNew = ({ matchesCount }: { matchesCount: number }) => {
  const navigate = useNavigate();

  return (
    <ButtonGroup>
      <Button onClick={() => navigate('matches/create')} variant="default">
        {matchesCount ? '...oder neues Spiel erstellen' : 'Neues Spiel erstellen'}
      </Button>
    </ButtonGroup>
  );
};

const StartPage = () => {
  const { data: matches } = useFetchMatches();

  const lobbyMatches = matches?.filter(({ status }) => status === 'lobby');

  return (
    <PageContainer>
      <H1>Zwicker</H1>
      <Section>
        <H2>Bald startende Spiele</H2>
        {lobbyMatches?.length ? (
          <MatchesList matches={lobbyMatches} />
        ) : <Alert>Keine Spiele gefunden</Alert>}
      </Section>

      <CreateNew matchesCount={lobbyMatches?.length ?? 0} />
    </PageContainer>
  );
};

export default StartPage;
