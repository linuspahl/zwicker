import React from 'react';
import { Button as MantineButton } from '@mantine/core';

type Props = {
  variant?: 'default' | 'filled',
  children: React.ReactNode,
  disabled?: boolean,
  onClick?: (event: React.SyntheticEvent) => void,
  type?: 'button' | 'submit',
}

const Button = ({
  disabled,
  variant,
  children,
  onClick,
  type,
}: Props) => (
  <MantineButton
    disabled={disabled}
    variant={variant}
    type={type}
    onClick={onClick}
  >
    {children}
  </MantineButton>
);

Button.defaultProps = {
  variant: undefined,
  disabled: false,
  onClick: undefined,
  type: 'button',
};

export default Button;
