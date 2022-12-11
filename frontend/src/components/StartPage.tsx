import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Match } from '../types/types';

import { Button, PageContainer } from './common';
import H1 from './common/H1';
import H2 from './common/H2';
import MatchesList from './MatchesList';

import { getAll } from '../actions/matches';

const Section = styled.div`
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 27px;
  align-items: center;
`;

function CreateNew() {
  const navigate = useNavigate();

  return (
    <ButtonGroup>
      <Button onClick={() => navigate('matches/create')}>
        ...oder neues Spiel erstellen
      </Button>
    </ButtonGroup>
  );
}

const useMatches = (): { data: Array<Match> | undefined, isFetching: boolean } => {
  const { data, isFetching } = useQuery({ queryKey: ['matches'], queryFn: () => getAll() });
  return { data, isFetching };
};

function StartPage() {
  const { data: matches } = useMatches();

  return (
    <PageContainer>
      <H1>Zwicker</H1>
      <Section>
        <H2>Bald startende Spiele</H2>
        {!!matches?.length && <MatchesList matches={matches} />}
        {/* TODO: Display loading spinner & No result info */}
      </Section>
      <CreateNew />
    </PageContainer>
  );
}

export default StartPage;
