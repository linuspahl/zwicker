import backendApi from '../backendApi';

// eslint-disable-next-line import/prefer-default-export
export const signin = (username: string, password: string) => backendApi.post('/api/auth/signin', { username, password });
