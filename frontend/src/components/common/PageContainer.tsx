import styled, { css } from 'styled-components';

type Size = 'large' | 'default';

const Container = styled.div<{ $size: Size | undefined }>(({ $size }) => `
  max-width: 500px;
  width: 100%;
  border-radius: 5px;
  background-color: white;
  padding: var(--spacing);

  ${$size === 'large' && css`
    max-width: 1000px;
  `}
`);

const PageContainer = ({ children, size }: { children: React.ReactNode, size?: Size }) => (
  <Container $size={size}>
    {children}
  </Container>
);

PageContainer.defaultProps = {
  size: 'default',
};

export default PageContainer;
