import React from 'react';
import styled from 'styled-components';

type Size = 'small' | 'default';

const StyledButton = styled.button<{ $size: Size | undefined }>(({ $size }) => `
  font-size: inherit;
  background-color: white;
  border-radius: 9px;
  padding: 6px 24px;
  border-width: 1px;
  border-color: #3f51b5;

  :hover {
    background-color: #efefef;
  }

  :active {
    background-color: #d9d9d9;
  }

  ${$size === 'small' && `
    padding: 3px 12px;
  `}
`);

type Props = {
  children: React.ReactNode,
  type?: 'button' | 'submit',
  size?: Size,
  onClick?: (event: React.SyntheticEvent) => void,
}

const Button = ({
  children, type, size, onClick,
}: Props) => <StyledButton type={type} $size={size} onClick={onClick}>{children}</StyledButton>;

Button.defaultProps = {
  type: 'button',
  size: 'default',
  onClick: undefined,
};

export default Button;
