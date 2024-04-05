import React from 'react';
import './styles.scss';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

function Button({ children, variant = 'primary', ...props }: IProps) {
  return (
    <button className={`button-${variant}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
