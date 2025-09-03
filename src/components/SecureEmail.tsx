import React from 'react';
import SecureContact from './SecureContact';

interface SecureEmailProps {
  className?: string;
  showIcon?: boolean;
  variant?: 'link' | 'button' | 'text';
  children?: React.ReactNode;
}

const SecureEmail: React.FC<SecureEmailProps> = ({ 
  className = '',
  showIcon = true,
  variant = 'link',
  children 
}) => {
  return (
    <SecureContact
      type="email"
      className={className}
      showIcon={showIcon}
      variant={variant}
    >
      {children}
    </SecureContact>
  );
};

export default SecureEmail;