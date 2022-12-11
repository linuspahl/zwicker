import { useCallback, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled, { createGlobalStyle } from 'styled-components';
import GlobalFonts from '../fonts';

import Login from './Login';
import './App.css';
import { getCurrent, signin } from '../actions/users';

import MatchCreate from './MatchCreate';
import MatchLobby from './MatchLobby';

import StartPage from './StartPage';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    color: #202124;
    height: 100vh;
    margin: 0;
    font-size: 1.2rem;
  }
  body, button {
    font-family: 'MuktaVaani';
  }
  #root {
    height: 100%;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }
`;

const PageLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 15px;
`;

const Container = styled.div`
  height: 100%;
  background-image: linear-gradient(to right bottom, #0963af, #0860a9, #075ca4, #06599e, #055699);
`;

const useCurrentUser = (accessToken: string | null) => {
  const { data, isFetching } = useQuery({ queryKey: ['session', accessToken], queryFn: () => getCurrent(), enabled: !!accessToken });
  return { data, isFetching };
};

function App() {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('access-token'));
  const { data: user, isFetching } = useCurrentUser(accessToken);

  const handleLogin = useCallback(({
    username, password,
  }: {
    username?: string,
    password?: string
  }) => {
    if (!username || !password) {
      throw Error('Password or username missing');
    }

    return signin(username, password).then(({
      data,
    }) => {
      if (data.accessToken) {
        localStorage.setItem('access-token', data.accessToken);
        setAccessToken(data.accessToken);
      }
    });
  }, []);

  return (
    <>
      <GlobalFonts />
      <GlobalStyle />
      <Container>
        <PageLayout>
          {(!isFetching && user) && (
            <Router>
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/matches/create" element={<MatchCreate currentUserId={user.id} />} />
                <Route path="/matches/lobby/:matchId" element={<MatchLobby />} />
              </Routes>
            </Router>
          )}

          {(!!isFetching && !user) && (
            <Login onSubmit={handleLogin} />
          )}
        </PageLayout>
      </Container>
    </>
  );
}

export default App;
