import React from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600">
            Avis authentiques de nos clients sur Google
          </p>
        </div>

        {/* Google Reviews Widget */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google" 
                className="w-6 h-6"
              />
              <span className="text-lg font-semibold text-gray-900">Avis Google</span>
            </div>
            <p className="text-gray-600">
              Decouvrez les avis authentiques de nos clients sur Google
            </p>
          </div>
          
          {/* Elfsight Google Reviews Widget */}
          <div 
            className="elfsight-app-bc4c44a7-b903-40bc-aab5-1a857bd89cec" 
            data-elfsight-app-lazy
            style={{ minHeight: '400px' }}
          ></div>
          
          <div className="text-center mt-6">
            <a 
              href="https://www.google.com/search?q=LS+COM+électricien+avis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <span>Voir tous nos avis sur Google</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-green-600 fill-current" />
              </div>
              <p className="text-2xl font-bold text-gray-900">5/5</p>
              <p className="text-gray-600">Note moyenne client</p>
            </div>
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Quote className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-gray-600">Clients satisfaits</p>
            </div>
            <div>
              <div className="bg-orange-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-600">15+</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">Années</p>
              <p className="text-gray-600">D'expérience terrain</p>
              <p className="text-gray-600">D experience terrain</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;