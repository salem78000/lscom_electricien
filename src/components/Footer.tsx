import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Clock, Shield, Award } from 'lucide-react';
import SecurePhone from './SecurePhone';
import SecureEmail from './SecureEmail';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://stackblitz.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCT08xMVFFPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c933664d226cd248d5b30317ed10cf915092de91/-Lscom.png"
                alt="LS COM Électricien"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Votre électricien professionnel de confiance en Île-de-France depuis plus de 15 ans.
            </p>
            <div className="flex space-x-2">
              <div className="bg-green-600 p-2 rounded">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Certifié & Assuré</p>
                <p className="text-xs text-gray-400">15+ années d'expérience</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos Services</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/services/borne-recharge-irve" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Bornes de recharge IRVE
                </Link>
              </li>
              <li>
                <Link 
                  to="/services/installation-electrique" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Installation électrique
                </Link>
              </li>
              <li>
                <Link 
                  to="/services/depannage" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Dépannage électrique
                </Link>
              </li>
              <li>
                <Link 
                  to="/services/tableau-electrique" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Tableau électrique
                </Link>
              </li>
              <li>
                <Link 
                  to="/tarifs-depannage" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Tarifs dépannage
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">24 Av de Chevincourt</p>
                  <p className="text-gray-300">78114 Magny-les-Hameaux</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 text-blue-400 flex-shrink-0 flex items-center justify-center">
                  📞
                </div>
                <SecurePhone 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  variant="link"
                  showIcon={false}
               >
                 06 22 52 39 02
               </SecurePhone>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <SecureEmail 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  variant="link"
                  showIcon={false}
                />
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Dépannage à partir de 110€ HT selon votre zone</p>
                </div>
              </div>
            </div>
          </div>

          {/* Zone intervention */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Zone d'intervention</h4>
            <div className="bg-blue-900 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-blue-400" />
                <p className="font-medium">Île-de-France</p>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                Intervention dans toutes les villes des Yvelines et communes limitrophes
              </p>
              <Link 
                to="/contact" 
                className="inline-block bg-[#b32a29] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#9a2426] transition-colors"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2025 LS COM Électricien. Tous droits réservés.
              </p>
              <p className="text-gray-400 text-sm">
                SIRET: 52445239800026
              </p>
            </div>
            <div className="flex space-x-6">
              <Link 
                to="/mentions-legales" 
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                Mentions légales
              </Link>
              <Link 
                to="/politique-confidentialite" 
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link 
                to="/admin" 
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;