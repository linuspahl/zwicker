import modelActions from '../modelActions/match';
import utils from '../utils/match';

const syncMatches = async (updateClientsInRoom) => {
  const matches = await modelActions.getAll().then(list => list.map(utils.formatMatchForResponse) )
  updateClientsInRoom('matches', 'update_client', 'matches', matches)
};

const syncMatch = async (match, updateClientsInRoom) => {
  updateClientsInRoom(`match_${match.id}`, 'update_client', 'match', utils.formatMatchForResponse(match))
};

export default {
  syncMatches,
  syncMatch,
}