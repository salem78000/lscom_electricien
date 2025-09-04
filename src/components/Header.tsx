import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import SecurePhone from './SecurePhone';
import SecureEmail from './SecureEmail';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://stackblitz.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCT08xMVFFPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c933664d226cd248d5b30317ed10cf915092de91/-Lscom.png"
              alt="LS COM Électricien"
              className="h-12 w-auto"
            >
              06 22 52 39 02
            </SecurePhone>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">
              Accueil
            </Link>
            
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-blue-700 font-medium transition-colors"
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link 
                    to="/services/borne-recharge-irve" 
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors font-medium"
                  >
                    🏆 Bornes de recharge IRVE
                  </Link>
                  <Link 
                    to="/services/installation-electrique" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Installation électrique
                  </Link>
                  <Link 
                    to="/services/mise-en-conformite" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Mise en conformité
                  </Link>
                  <Link 
                    to="/services/tableau-electrique" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Tableau électrique
                  </Link>
                  <Link 
                    to="/services/depannage" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Dépannage électrique
                  </Link>
                  <Link 
                    to="/tarifs-depannage" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Tarifs dépannage
                  </Link>
              </div>
            </div>

            <Link to="/contact" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Phone & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/contact" 
              className="bg-[#b32a29] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#9a2426] transition-colors shadow-md"
            >
              Devis gratuit
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <div className="border-l-2 border-gray-200 pl-4">
                <p className="font-medium text-gray-900 mb-2">Services</p>
                <div className="space-y-2">
                  <Link 
                    to="/services/borne-recharge-irve" 
                    className="block text-gray-600 hover:text-green-700 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🏆 Bornes de recharge IRVE
                  </Link>
                  <Link 
                    to="/services/installation-electrique" 
                    className="block text-gray-600 hover:text-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Installation électrique
                  </Link>
                  <Link 
                    to="/services/mise-en-conformite" 
                    className="block text-gray-600 hover:text-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mise en conformité
                  </Link>
                  <Link 
                    to="/services/tableau-electrique" 
                    className="block text-gray-600 hover:text-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tableau électrique
                  </Link>
                  <Link 
                    to="/services/depannage" 
                    className="block text-gray-600 hover:text-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dépannage électrique
                  </Link>
                  <Link 
                    to="/tarifs-depannage" 
                    className="block text-gray-600 hover:text-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tarifs dépannage
                  </Link>
                </div>
              </div>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-blue-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <SecurePhone 
                className="flex items-center text-blue-700 hover:text-blue-800 font-medium"
                variant="link"
                showIcon={true}
              />
              <Link 
                to="/contact" 
                className="bg-[#b32a29] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#9a2426] transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Devis gratuit
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;