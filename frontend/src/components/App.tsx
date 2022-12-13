import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import GlobalFonts from '../fonts';

import Login from './Login';
import './App.css';

import MatchCreate from './MatchCreate';
import MatchLobby from './MatchLobby';

import StartPage from './StartPage';
import CurrentUserProvider, { CurrentUserContext } from '../contexts/CurrentUserProvider';
import BackendApiTokenProvider from '../contexts/BackendApiTokenProvider';

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

const App = () => (
  <BackendApiTokenProvider>
    <CurrentUserProvider>
      <CurrentUserContext.Consumer>
        {(currentUser) => (
          <>
            <GlobalFonts />
            <GlobalStyle />
            <Container>
              <PageLayout>
                {currentUser && (
                  <Router>
                    <Routes>
                      <Route path="/" element={<StartPage />} />
                      <Route path="/matches/create" element={<MatchCreate />} />
                      <Route path="/matches/lobby/:matchId" element={<MatchLobby />} />
                    </Routes>
                  </Router>
                )}

                {!currentUser && <Login />}
              </PageLayout>
            </Container>
          </>
        )}
      </CurrentUserContext.Consumer>
    </CurrentUserProvider>
  </BackendApiTokenProvider>
);

export default App;
