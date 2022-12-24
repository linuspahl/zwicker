import { useCallback, useState } from 'react';
import LoginForm from './LoginForm';
import { H1, PageContainer } from './common';
import { signin } from '../actions/users';
import useBackendApiToken from '../hooks/useBackendApiToken';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState();
  const { setAccessToken } = useBackendApiToken();
  const handleLogin = useCallback(({
    username, password,
  }: {
    username?: string,
    password?: string
  }) => {
    if (!username || !password) {
      throw Error('Password or username missing');
    }

    return signin(username, password).then(({ data: { accessToken } }) => {
      if (accessToken) {
        localStorage.setItem('access-token', accessToken);
        setAccessToken(accessToken);
      }
    }).catch((error) => {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      }
    });
  }, [setAccessToken]);

  return (
    <PageContainer>
      <H1>
        Zwicker
      </H1>
      <LoginForm onSubmit={handleLogin} errorMessage={errorMessage} />
    </PageContainer>
  );
};

export default Login;
