import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import SecurePhone from '../components/SecurePhone';
import SecureEmail from '../components/SecureEmail';

const ContactPage: React.FC = () => {
  React.useEffect(() => {
    // Charger le script JotForm embed handler
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler("iframe[id='JotFormIFrame-251184086571358-contact']", "https://form.jotform.com/");
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
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Contactez LS COM
          </h1>
          <p className="text-xl text-blue-100">
            Demandez votre devis gratuit ou contactez-nous pour toute urgence électrique
          </p>
        </div>
      </section>

      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Formulaire */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Demande de devis gratuit
              </h2>
              <iframe
                id="JotFormIFrame-251184086571358-contact"
                title="Devis électricien."
                allowTransparency="true"
                allow="geolocation; microphone; camera; fullscreen; payment"
                src="https://form.jotform.com/LSCOM/demande-de-devis"
                frameBorder="0"
                style={{minWidth:'100%', maxWidth:'100%', height:'539px', border:'none'}}
                scrolling="no"
              />
            </div>

            {/* Informations de contact */}
            <div className="space-y-8">
              
              {/* Contact Principal */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Nos coordonnées
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 text-lg">Adresse</p>
                      <p className="text-gray-600">
                        24 Avenue de Chevincourt<br />
                        78114 Magny-les-Hameaux<br />
                        Yvelines, Île-de-France
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="h-6 w-6 text-blue-600 flex-shrink-0 flex items-center justify-center">
                      📞
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-lg">Téléphone</p>
                      <SecurePhone 
                        className="text-blue-600 hover:text-blue-700 transition-colors text-lg font-medium"
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
                      <p className="font-medium text-gray-900 text-lg">Email</p>
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
                      <p className="font-medium text-gray-900 text-lg">Horaires</p>
                      <div className="text-gray-600">
                        <p>Lundi - Vendredi: 8h00 - 18h00</p>
                        <p>Samedi: 8h00 - 12h00</p>
                        <p className="text-orange-600 font-medium mt-2">
                          🚨 Urgences électriques: 24h/24 - 7j/7
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    SIRET: 52445239800026 • Électricien certifié et assuré
                  </p>
                </div>
              </div>

              {/* Urgences */}
              <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-4">
                  ⚡ Panne électrique ?
                </h3>
                <p className="text-red-700 mb-6">
                  Pour toute panne électrique (coupure de courant, court-circuit, 
                  problème de sécurité), contactez-nous pour un dépannage rapide.
                </p>
                <SecurePhone 
                  className="inline-flex items-center space-x-2 bg-[#b32a29] hover:bg-[#9a2426] text-white px-6 py-3 rounded-lg font-bold transition-colors"
                  variant="button"
                  showIcon={true}
                >
                  06 22 52 39 02
                </SecurePhone>
              </div>

              {/* Avantages */}
              <div className="bg-blue-50 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Pourquoi choisir LS COM ?
                </h3>
                <div className="space-y-3">
                  {[
                    'Devis gratuit sous 24h',
                    'Électriciens certifiés et expérimentés',
                    'Travaux garantis et assurés',
                    '15+ années d\'expérience',
                    'Intervention dans 60+ villes d\'Île-de-France',
                    'Service client personnalisé',
                    'Respect des normes électriques',
                    'Matériel professionnel de qualité'
                  ].map((advantage, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;