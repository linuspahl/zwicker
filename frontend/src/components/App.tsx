import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { useCallback, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import GlobalFonts from '../fonts';

import Login from './Login';

import MatchCreate from './MatchCreate';
import MatchLobby from './MatchLobby';
import MatchTable from './MatchTable';

import StartPage from './StartPage';
import CurrentUserProvider, { CurrentUserContext } from '../contexts/CurrentUserProvider';
import BackendApiTokenProvider from '../contexts/BackendApiTokenProvider';
import MenuToggle from './common/MenuToggle';
import Menu from './common/Menu';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  :root {
    font-size: 18px;

    --root-spacing: 3px;
    --tiny-spacing: calc(var(--root-spacing) * 2);
    --small-spacing: calc(var(--root-spacing) * 4);
    --spacing: calc(var(--root-spacing) * 6);
    --large-spacing: calc(var(--root-spacing) * 8);
    --extra-large-spacing: calc(var(--root-spacing) * 12);

    --large-font-size: 1.44rem;
    --extra-large-font-size: 2.074rem;
  }

  body {
    color: #202124;
    height: 100vh;
    margin: 0;
    font-size: var(--root-font-size);
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
`;

const Container = styled.div`
  height: 100%;
  background-image: url('/bg.jpeg');
  background-position: 50% 50%;
  background-size: cover;
`;

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = useCallback(() => setShowMenu((cur) => !cur), []);

  return (
    <BackendApiTokenProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <CurrentUserProvider>
          <CurrentUserContext.Consumer>
            {(currentUser) => (
              <>
                <GlobalFonts />
                <GlobalStyle />
                <Container>
                  <PageLayout>
                    {currentUser && (
                    <>
                      <MenuToggle onClick={toggleMenu} />
                      {showMenu && <Menu toggleMenu={toggleMenu} />}
                      <Router>
                        <Routes>
                          <Route path="/" element={<StartPage />} />
                          <Route path="/matches/create" element={<MatchCreate />} />
                          <Route path="/matches/lobby/:matchId" element={<MatchLobby />} />
                          <Route path="/matches/table/:matchId" element={<MatchTable />} />
                        </Routes>
                      </Router>
                    </>
                    )}
                    {!currentUser && <Login />}
                  </PageLayout>
                </Container>
              </>
            )}
          </CurrentUserContext.Consumer>
        </CurrentUserProvider>
      </MantineProvider>
    </BackendApiTokenProvider>
  );
};

export default App;
