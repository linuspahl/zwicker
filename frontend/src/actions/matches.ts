import backendApi from '../backendApi'
import { fromJSON } from '../models/Match';
import { Match, MatchJSON } from '../types/types';


export const create = (curentUserId: number, title: string, password: string | undefined) => {
  const accessToken = localStorage.getItem('access-token')

  if (!accessToken) {
    throw Error('missing access token');
  }

  return backendApi.post('/api/matches/create', { title, password, host_user_id: Number(curentUserId) }, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': accessToken,
    }
  });
}

export const getAll = async (): Promise<Array<Match>> => {
  const accessToken = localStorage.getItem('access-token')

  if (!accessToken) {
    throw Error('missing access token');
  }

  return backendApi.get<Array<MatchJSON>>('/api/matches', {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': accessToken,
    }
  }).then(({ data }) => data.map(fromJSON));
}
