import GlobalFonts from '../fonts';

import Login from './Login'
import './App.css';
import { signin } from '../actions/users';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import MatchCreate from './MatchCreate';
import MatchLobby from './MatchLobby';


import styled,  { createGlobalStyle } from 'styled-components'
import { useCallback, useState } from 'react';
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
`

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

function App() {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('access-token'));

  const handleLogin = useCallback(({ username, password }: { username?: string, password?: string }) => {
    if (username && password) {
      return signin(username, password).then(({ data: { accessToken }}) => {
        if (accessToken) {
          localStorage.setItem('access-token', accessToken)
          setAccessToken(accessToken);
        }
      });
    }
  }, [])

  return (
    <>
      <GlobalFonts/>
      <GlobalStyle />
      <Container>
        <PageLayout>
          {!!accessToken ?
            <>
              <Router>
                <Routes>
                  <Route path="/" element={<StartPage />} />
                  <Route path="/matches/create" element={<MatchCreate />}/>
                  <Route path="/matches/lobby/:matchId" element={<MatchLobby />} />
                </Routes>
              </Router>
            </>
          : (
            <Login onSubmit={handleLogin} />
          )}
        </PageLayout>

      </Container>
    </>
  );
}

export default App;
