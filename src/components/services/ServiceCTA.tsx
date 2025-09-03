import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import SecurePhone from '../SecurePhone';

interface ServiceCTAProps {
  title: string;
  description: string;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({ title, description }) => {
  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              {title}
            </h2>
            <p className="text-xl text-blue-100">
              {description}
            </p>
          </div>

          <div className="bg-blue-800 p-8 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-4">Pourquoi nous choisir ?</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>✓ 15+ années d'expérience</li>
                  <li>✓ Électriciens certifiés</li>
                  <li>✓ Devis gratuit sous 24h</li>
                  <li>✓ Travaux garantis</li>
                  <li>✓ Intervention en Île-de-France</li>
                </ul>
              </div>
              <div className="space-y-4">
                <Link 
                  to="/contact" 
                  className="block bg-[#b32a29] hover:bg-[#9a2426] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  Demander un devis gratuit
                </Link>
                <SecurePhone 
                  className="flex items-center justify-center space-x-2 bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
                  variant="button"
                  showIcon={true}
                >
                  06 22 52 39 02
                </SecurePhone>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;