import modelActions from '../modelActions/match';
import utils from '../utils/match';

const syncMatches = async (updateClientsInRoom) => {
  const matches = await modelActions.getAll().then(utils.formatMatchForResponse)
  updateClientsInRoom('matches', 'update_client', 'matches', matches)
};

export default {
  syncMatches
}