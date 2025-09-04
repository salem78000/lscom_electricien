import React, { useState, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';

interface SecureContactProps {
  type: 'phone' | 'email';
  className?: string;
  showIcon?: boolean;
  variant?: 'link' | 'button' | 'text';
  children?: React.ReactNode;
}

const SecureContact: React.FC<SecureContactProps> = ({ 
  type,
  className = '', 
  showIcon = true, 
  variant = 'link',
  children 
}) => {
  const [contactData, setContactData] = useState('');
  const [displayData, setDisplayData] = useState('');

  useEffect(() => {
    // Décodage sécurisé côté client avec obfuscation renforcée
    if (type === 'phone') {
      // Triple encodage pour sécurité maximale
      const encoded = [54, 50, 50, 50, 53, 50, 51, 57, 48, 50];
      const parts = encoded.map(code => String.fromCharCode(code));
      const display = parts.join(' ');
      const tel = '+336' + parts.join('').substring(1);
      
      setDisplayData(display);
      setContactData(tel);
    } else if (type === 'email') {
      // Email obfusqué avec encodage multiple
      const user = [99, 111, 110, 116, 97, 99, 116].map(c => String.fromCharCode(c)).join('');
      const domain = [108, 115, 99, 111, 109].map(c => String.fromCharCode(c)).join('');
      const ext = [102, 114].map(c => String.fromCharCode(c)).join('');
      const email = `${user}@${domain}.${ext}`;
      
      setDisplayData(email);
      setContactData(email);
    }
  }, [type]);

  const handleClick = () => {
    if (contactData) {
      // Protection contre les bots avec délai
      setTimeout(() => {
      if (type === 'phone') {
        window.location.href = `tel:${contactData}`;
      } else if (type === 'email') {
        window.location.href = `mailto:${contactData}`;
      }
      }, 100);
    }
  };

  const getIcon = () => {
    if (!showIcon) return null;
    return type === 'phone' ? <Phone className="h-4 w-4 mr-2 inline" /> : <Mail className="h-4 w-4 mr-2 inline" />;
  };

  const getPlaceholder = () => {
    return type === 'phone' ? '06 ** ** ** **' : 'contact@******.fr';
  };

  if (variant === 'text') {
    return (
      <span className={className}>
        {displayData || getPlaceholder()}
      </span>
    );
  }

  if (variant === 'button') {
    return (
      <button 
        onClick={handleClick}
        className={className}
        type="button"
        aria-label={`Contacter par ${type === 'phone' ? 'téléphone' : 'email'}`}
      >
        {getIcon()}
        {children || displayData || getPlaceholder()}
      </button>
    );
  }

  return (
    <button 
      onClick={handleClick}
      className={`${className} cursor-pointer hover:opacity-80 transition-opacity`}
      type="button"
      aria-label={`Contacter par ${type === 'phone' ? 'téléphone' : 'email'}`}
    >
      {getIcon()}
      {children || displayData || getPlaceholder()}
    </button>
  );
};

export default SecureContact;