import modelActions from '../modelActions/match';
import utils from '../utils/match';

const syncMatches = async (updateClientsInRoom) => {
  const matches = await modelActions.getAll().then(list => list.map(utils.formatMatchForResponse) )
  updateClientsInRoom('matches', 'matches', matches)
};

const syncMatch = async (matchId, updateClientsInRoom) => {
  const match = await modelActions.getMatch(matchId);
  updateClientsInRoom(`match_${matchId}`, 'match', utils.formatMatchForResponse(match))
};

const syncMatchState = async (matchId, updateClientsInRoom) => {
  const matchState = await modelActions.getState(matchId);
  
  updateClientsInRoom(`match_state_${matchId}`, 'match_state', matchState)
};

const syncMatchUsers = async (matchId, updateClientsInRoom) => {
  const matchUsers = await modelActions.getUsers(matchId);
  updateClientsInRoom(`match_users_${matchId}`, 'match_users', matchUsers)
};

export default {
  syncMatch,
  syncMatches,
  syncMatchState,
  syncMatchUsers,
}