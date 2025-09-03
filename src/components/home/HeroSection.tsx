import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Shield, Award } from 'lucide-react';
import SecurePhone from '../SecurePhone';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Votre électricien
                <span className="block" style={{ color: '#b32a29' }}>professionnel</span>
                <span className="block">de confiance</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Installation, dépannage et mise en conformité électrique en Île-de-France. 
                <span className="font-semibold text-white">Plus de 15 ans d'expérience</span> à votre service.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-blue-100">Installateur IRVE certifié</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-blue-100">Électriciens certifiés</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-blue-100">Intervention 24h/24</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-blue-100">Travaux garantis</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-blue-100">Plus de 15 ans d'expérience</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/contact" 
                className="bg-[#b32a29] hover:bg-[#9a2426] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                Devis gratuit
              </Link>
              
              <SecurePhone 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
                variant="button"
                showIcon={true}
              >
                06 22 52 39 02
              </SecurePhone>
            </div>

            {/* Trust Indicator */}
            <div className="bg-blue-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-blue-600">
              <p className="text-center text-blue-100">
                <span className="font-bold text-white">+500 clients satisfaits</span> en Île-de-France
                <span className="block text-sm mt-1">SIRET: 52445239800026 - Électricien certifié et assuré</span>
              </p>
              <p className="text-center text-blue-100">
                <span className="font-semibold text-white">Plus de 15 ans d'expérience</span> à votre service.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">15+ années</p>
                    <p className="text-sm text-gray-600">D'expérience</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-8 right-8 w-64 h-64 bg-orange-400 bg-opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-blue-400 bg-opacity-20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;