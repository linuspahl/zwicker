import backendApi from '../backendApi'

export const signin = (username: string, password: string) => {
  return backendApi.post('/api/auth/signin', { username, password });
}

