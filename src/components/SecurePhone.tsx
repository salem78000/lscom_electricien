import React, { useState, useEffect } from 'react';
import SecureContact from './SecureContact';

interface SecurePhoneProps {
  className?: string;
  showIcon?: boolean;
  variant?: 'link' | 'button' | 'text';
  children?: React.ReactNode;
}

const SecurePhone: React.FC<SecurePhoneProps> = ({ 
  className = '',
  showIcon = true,
  variant = 'link',
  children 
}) => {
  return (
    <SecureContact
      type="phone"
      className={className}
      showIcon={showIcon}
      variant={variant}
    >
      {children}
    </SecureContact>
  );
};

export default SecurePhone;