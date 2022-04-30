import styled from "styled-components";

type Size = 'large' | 'default';

const Container = styled.div<{ $size: Size }>(({ $size }) => `
  max-width: 500px;
  width: 100%;
  border-radius: 5px;
  background-color: white;
  padding: 15px 21px;

  ${$size === 'large' && `
    max-width: 1000px;
  `}
`);

const PageContainer = ({ children, size }: { children: React.ReactNode, size: Size }) => {
  return (
    <Container $size={size}>
      {children}
    </Container>
  )
}

PageContainer.defaultProps = {
  size: 'default'
}

export default PageContainer
