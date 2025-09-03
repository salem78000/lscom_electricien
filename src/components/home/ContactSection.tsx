import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import SecurePhone from '../SecurePhone';
import SecureEmail from '../SecureEmail';

const ContactSection: React.FC = () => {
  React.useEffect(() => {
    // Charger le script JotForm embed handler
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler("iframe[id='JotFormIFrame-251184086571358']", "https://form.jotform.com/");
      }
    };

    return () => {
      const existingScript = document.querySelector('script[src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Demandez votre devis gratuit
          </h2>
          <p className="text-xl text-gray-600">
            Reponse sous 24h - Deplacement gratuit pour etablir votre devis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Demande de devis gratuit
            </h3>
            <iframe
              id="JotFormIFrame-251184086571358"
              title="Devis électricien."
              allowTransparency="true"
              allow="geolocation; microphone; camera; fullscreen; payment"
              src="https://form.jotform.com/LSCOM/demande-de-devis"
              frameBorder="0"
              style={{minWidth:'100%', maxWidth:'100%', height:'539px', border:'none'}}
              scrolling="no"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            
            {/* Contact Details */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Nos coordonnées
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-gray-600">24 Av de Chevincourt<br />78114 Magny-les-Hameaux</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-6 w-6 text-blue-600 flex-shrink-0 flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Téléphone</p>
                    <p className="font-medium text-gray-900">Telephone</p>
                    <SecurePhone 
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                      variant="link"
                      showIcon={false}
                    >
                      06 22 52 39 02
                    </SecurePhone>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <SecureEmail 
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                      variant="link"
                      showIcon={false}
                    />
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Horaires</p>
                    <p className="text-gray-600">
                      Lun-Ven: 8h-18h<br />
                      Sam: 8h-12h<br />
                      <span className="text-orange-600 font-medium">Urgences: 24h/24 - 7j/7</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Pourquoi nous choisir ?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Devis gratuit sous 24h</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Électriciens certifiés</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Travaux garantis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">15+ années d'expérience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Intervention dans 60+ villes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;