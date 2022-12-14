import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  width: 40px;
  margin-left: var(--spacing);
  margin-top: var(--spacing);

  div {
    width: 100%;
    height: 3px;
    background-color: rgba(255,255,255, 0.7);
    display: block;

    :not(:last-child) {
      margin-bottom: var(--small-spacing);
    }
  }
`;

type Props = {
  onClick: () => void,
}

const MenuToggle = ({ onClick }: Props) => (
  <Container onClick={onClick}>
    <div />
    <div />
    <div />
  </Container>
);

export default MenuToggle;
