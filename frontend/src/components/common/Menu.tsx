import styled from 'styled-components';
import useBackendApiToken from '../../hooks/useBackendApiToken';
import Button from './Button';

const Container = styled.div`
  position: absolute;
  left: 0;
  height: 100vh;
  display: flex;
  width: 100vw;
`;

const Sidebar = styled.div`
  left: 0;
  height: 100%;
  width: 300px;
  background-color: white;
`;

const Overlay = styled.div`
  background-color: rgba(0,0,0, 0.7);
  height: 100%;
  flex: 1;
  cursor: pointer;
`;

type Props = {
  toggleMenu: () => void,
}

const Menu = ({ toggleMenu }: Props) => {
  const { setAccessToken } = useBackendApiToken();

  const logout = () => {
    setAccessToken(null);
    toggleMenu();
  };

  return (
    <Container>
      <Sidebar>
        <h2>Das Menü</h2>
        <Button onClick={logout}>Abmelden</Button>
      </Sidebar>
      <Overlay onClick={toggleMenu} />
    </Container>
  );
};

export default Menu;
