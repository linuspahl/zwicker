import modelActions from '../modelActions/match';
import utils from '../utils/match';

const syncMatches = async (updateClientsInRoom) => {
  const matches = await modelActions.getAll().then(list => list.map(utils.formatMatchForResponse) )
  updateClientsInRoom('matches', 'update_client', 'matches', matches)
};

const syncMatch = async (matchId, updateClientsInRoom) => {
  console.log('matchId', matchId)
  const match = await modelActions.getMatch(matchId);
  updateClientsInRoom(`match_${matchId}`, 'update_client', 'match', utils.formatMatchForResponse(match))
};

const syncMatchState = async (matchId, updateClientsInRoom) => {
  const matchState = await modelActions.getState(matchId);
  
  updateClientsInRoom(`match_state_${matchId}`, 'update_client', 'match_state', matchState)
};

const syncMatchUsers = async (matchId, updateClientsInRoom) => {
  const matchUsers = await modelActions.getUsers(matchId);
  updateClientsInRoom(`match_users_${matchId}`, 'update_client', 'match_users', matchUsers)
};

export default {
  syncMatch,
  syncMatches,
  syncMatchState,
  syncMatchUsers,
}