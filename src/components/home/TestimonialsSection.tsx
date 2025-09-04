import React from 'react';
import { Star, Quote, MapPin, ExternalLink } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Avis clients Google
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez les avis authentiques de nos clients sur Google Maps
          </p>
        </div>

        {/* Google Maps Integration */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google" 
                className="w-8 h-8"
              />
              <h3 className="text-2xl font-bold text-gray-900">LS COM sur Google Maps</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Consultez nos avis clients authentiques et notre localisation
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-md mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2626.8!2d2.0833!3d48.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e677f5751b8de5%3A0x95f32a0ab1f2b270!2s24%20Av.%20de%20Chevincourt%2C%2078114%20Magny-les-Hameaux!5e0!3m2!1sfr!2sfr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="LS COM Électricien - 24 Avenue de Chevincourt, Magny-les-Hameaux"
            />
          </div>

          {/* CTA vers Google Maps */}
          <div className="text-center">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJ5YtVdxV_5kcRcLsfKWor85U"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google" 
                className="w-6 h-6"
              />
              <span>Voir nos avis Google Maps</span>
              <ExternalLink className="h-5 w-5" />
            </a>
            <p className="text-gray-500 text-sm mt-3">
              Consultez nos avis clients authentiques et laissez le vôtre
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-green-600 fill-current" />
              </div>
              <p className="text-2xl font-bold text-gray-900">5/5</p>
              <p className="text-gray-600">Note Google</p>
            </div>
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">500+</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">Clients</p>
              <p className="text-gray-600">Satisfaits</p>
            </div>
            <div>
              <div className="bg-orange-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-600">15+</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">Années</p>
              <p className="text-gray-600">D'expérience</p>
            </div>
            <div>
              <div className="bg-purple-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">60+</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">Villes</p>
              <p className="text-gray-600">Couvertes</p>
            </div>
          </div>
        </div>

        {/* Informations entreprise */}
        <div className="text-center mt-12">
          <div className="bg-gray-900 text-white p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">LS COM Électricien</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-medium mb-1">📍 Adresse</p>
                <p className="text-gray-300">24 Av de Chevincourt<br />78114 Magny-les-Hameaux</p>
              </div>
              <div>
                <p className="font-medium mb-1">📞 Téléphone</p>
                <p className="text-gray-300">06 22 52 39 02</p>
              </div>
              <div>
                <p className="font-medium mb-1">🏢 SIRET</p>
                <p className="text-gray-300">52445239800026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;