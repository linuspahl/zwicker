import React from 'react';
import styled, { css } from 'styled-components';

type Size = 'small' | 'default';

const StyledButton = styled.button<{
  $size: Size | undefined,
  $category: 'primary' | undefined
}>(({ $size, $category }) => css`
  display: inline-flex;
  gap: var(--tiny-spacing);
  background-color: ${$category === 'primary' ? '#0A66C2' : 'white'};
  color: ${$category === 'primary' ? 'white' : 'currentColor'};
  border-radius: 9px;
  border-width: 1px;
  font-size: var(--root-font-size);
  padding: var(--tiny-spacing) var(--small-spacing);
  border-color: #3f51b5;

  :hover {
    background-color: ${$category === 'primary' ? '#0c77e1' : '#efefef'};
  }

  :active {
    background-color: ${$category === 'primary' ? '#095aac' : '#e6e3e3'};
  }

  ${$size === 'small' ? css`
    
  ` : ''}
`);

type Props = {
  children: React.ReactNode,
  type?: 'button' | 'submit',
  size?: Size,
  category?: 'primary',
  onClick?: (event: React.SyntheticEvent) => void,
}

const Button = ({
  children,
  type,
  size,
  onClick,
  category,
}: Props) => (
  <StyledButton
    type={type}
    $category={category}
    $size={size}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

Button.defaultProps = {
  type: 'button',
  size: 'default',
  category: undefined,
  onClick: undefined,
};

export default Button;
