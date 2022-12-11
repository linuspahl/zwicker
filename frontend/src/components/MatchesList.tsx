import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Match } from '../types/types';
import { Button, Icon } from './common';

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  :not(:last-child) {
    margin-bottom: 9px;
  }
`;

const MatchTitle = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3px;

  > *:not(:last-child) {
    margin-right: 6px;
  }
`;

const _joinMatch = (matchId: string, password: string | undefined) => Promise.resolve({ data: { id: matchId, success: true } });

function MatchesListItem({ match: { title, hasPassword, id } }: { match: Match }) {
  const navigate = useNavigate();

  const joinMatch = () => {
    let matchPassword;

    if (hasPassword) {
      matchPassword = window.prompt(`Bitte gebe das Passwort für die Partie "${title}" ein.`);

      if (!matchPassword) {
        return;
      }
    }

    return _joinMatch(id, matchPassword).then(({ data: { success } }) => {
      if (success) {
        navigate(`/matches/lobby/${id}`);
      } else {
        // TODO: display user notification
      }
    });
  };
  return (
    <ItemContainer>
      <MatchTitle title={title}>
        {title}
      </MatchTitle>
      <ItemActions>
        {hasPassword && <Icon name="lock" />}
        <Button size="small" onClick={joinMatch}>Mitmachen</Button>
      </ItemActions>
    </ItemContainer>
  );
}

function MatchesList({ matches }: { matches: Array<Match> }) {
  return (
    <div>
      {matches?.length ? matches.map((match) => <MatchesListItem match={match} key={match.id} />) : 'Keine vorhanden.'}
    </div>
  );
}

export default MatchesList;
