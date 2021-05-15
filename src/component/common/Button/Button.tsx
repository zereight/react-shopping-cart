import React from 'react';
import { Container } from './Button.styles';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}

const Button = ({ children, onClick, disabled }: ButtonProps) => (
  <Container disabled={disabled} onClick={onClick}>
    {children}
  </Container>
);

export default Button;
