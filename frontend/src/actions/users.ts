import backendApi from '../backendApi'
import { User, UserJSON } from '../types/types';

const fromJSON = ({ username, id }: UserJSON): User => ({
  id,
  username,
})

export const signin = (username: string, password: string) => {
  return backendApi.post('/api/auth/signin', { username, password });
}

export const getCurrent = async (): Promise<User> => {
  const accessToken = localStorage.getItem('access-token')

  if (!accessToken) {
    throw Error('missing access token');
  }

  return backendApi.get<UserJSON>(`/api/session/current`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': accessToken,
    }
  }).then(({ data }) => fromJSON(data));
}

