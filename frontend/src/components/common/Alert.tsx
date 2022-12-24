import styled, { css } from 'styled-components';

const Alert = styled.div(({ type }: { type?: 'danger' }) => css`
  padding: var(--small-spacing);
  border-radius: 6px;
  background-color: ${type === 'danger' ? '#ffa8a8' : '#ececec'};
  border: 1px solid ${type === 'danger' ? '#ff0000' : 'grey'};;
`);

export default Alert;
