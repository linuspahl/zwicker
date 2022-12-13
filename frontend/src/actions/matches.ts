import backendApi from '../backendApi';

// eslint-disable-next-line import/prefer-default-export
export const create = (title: string, password: string | undefined) => {
  const accessToken = localStorage.getItem('access-token');

  if (!accessToken) {
    throw Error('missing access token');
  }

  return backendApi.post('/api/matches/create', { title, password }, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': accessToken,
    },
  });
};
