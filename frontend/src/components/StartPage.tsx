import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Button, PageContainer } from './common';
import H1 from './common/H1';
import H2 from './common/H2';
import MatchesList from './MatchesList';
import useFetchMatches from '../hooks/useFetchMatches';

const Section = styled.div`
  margin-bottom: var(--large-spacing);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--large-spacing);
  align-items: center;
`;

const CreateNew = () => {
  const navigate = useNavigate();

  return (
    <ButtonGroup>
      <Button onClick={() => navigate('matches/create')}>
        ...oder neues Spiel erstellen
      </Button>
    </ButtonGroup>
  );
};

const StartPage = () => {
  const { data: matches } = useFetchMatches();

  const lobbyMatches = matches?.filter(({ status }) => status === 'lobby');
  const runningMatches = matches?.filter(({ status }) => status === 'running');

  return (
    <PageContainer>
      <H1>Zwicker</H1>
      {!!lobbyMatches?.length && (
        <Section>
          <H2>Bald startende Spiele</H2>
          <MatchesList matches={lobbyMatches} />
        </Section>
      )}
      {!!runningMatches?.length && (
        <Section>
          <H2>Laufende Spiele</H2>
          <MatchesList matches={runningMatches} />
        </Section>
      )}
      <CreateNew />
    </PageContainer>
  );
};

export default StartPage;
