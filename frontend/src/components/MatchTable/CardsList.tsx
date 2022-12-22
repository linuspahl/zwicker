import styled, { css } from 'styled-components';

const Container = styled.div`
  overflow-x: auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div(({ $hasFocus }: { $hasFocus: boolean }) => css`
  display: flex;
  overflow-x: scroll;
  margin-top: ${$hasFocus ? '14px' : '0'};
  padding: ${$hasFocus ? 'var(--tiny-spacing)' : '20px var(--tiny-spacing) var(--tiny-spacing) var(--tiny-spacing)'};
  border: 6px solid ${$hasFocus ? 'yellow' : 'transparent'};
`);

type Props = {
  children: React.ReactNode,
  className?: string,
  hasFocus?: boolean,
}

const CardList = ({ children, className, hasFocus }: Props) => (
  <Container className={className}>
    <InnerContainer $hasFocus={!!hasFocus}>
      {children}
    </InnerContainer>
  </Container>
);

CardList.defaultProps = {
  className: undefined,
  hasFocus: false,
};

export default CardList;
