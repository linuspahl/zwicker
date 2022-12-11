import backendApi from '../backendApi'

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

