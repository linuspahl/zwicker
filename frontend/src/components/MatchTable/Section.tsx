import styled from 'styled-components';
import { H2 } from '../common';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  
  h2 {
    background-color: rgba(255,255,255,0.6);
    width: 300px;
    display: flex;
    justify-content: center;
    border-radius: 3px;
    margin: 0;
  }
`;

type Props = {
  children: React.ReactNode,
  headline: string,
}

const Section = ({ children, headline }: Props) => (
  <Container>
    <Header>
      <H2>{headline}</H2>
    </Header>
    {children}
  </Container>
);

export default Section;
