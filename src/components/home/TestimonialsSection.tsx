import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Marie L.',
      location: 'Magny-les-Hameaux',
      text: 'Excellent électricien ! Installation électrique complète de ma maison, travail soigné et dans les délais. Je recommande LS COM.',
      service: 'Installation électrique',
      rating: 5,
      date: 'Il y a 2 mois'
    },
    {
      name: 'Pierre D.',
      location: 'Versailles',
      text: 'Dépannage électrique rapide. Panne résolue en 1h avec le forfait 110€. Électricien professionnel et compétent.',
      service: 'Dépannage électrique',
      rating: 5,
      date: 'Il y a 1 mois'
    },
    {
      name: 'Sophie M.',
      location: 'Guyancourt',
      text: 'Mise en conformité de mon tableau électrique. Travail de qualité, explications claires. Très satisfaite du service LS COM.',
      service: 'Mise en conformité',
      rating: 5,
      date: 'Il y a 3 semaines'
    },
    {
      name: 'Jean-Claude R.',
      location: 'Montigny-le-Bretonneux',
      text: 'Installation de borne de recharge IRVE parfaite. Électricien certifié, aide pour les subventions. Service impeccable.',
      service: 'Borne IRVE',
      rating: 5,
      date: 'Il y a 1 mois'
    },
    {
      name: 'Isabelle T.',
      location: 'Trappes',
      text: 'Dépannage en urgence un dimanche soir. Intervention rapide et efficace. Prix respecté, problème résolu. Merci LS COM !',
      service: 'Dépannage urgence',
      rating: 5,
      date: 'Il y a 2 semaines'
    },
    {
      name: 'Michel B.',
      location: 'Élancourt',
      text: 'Rénovation électrique complète de mon appartement. Travail professionnel, respect des délais et du budget. Je recommande.',
      service: 'Rénovation électrique',
      rating: 5,
      date: 'Il y a 1 mois'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600">
            Avis authentiques de nos clients en Île-de-France
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(5)}
            </div>
            <span className="text-lg font-semibold text-gray-900">5.0/5</span>
            <span className="text-gray-600">• 500+ avis clients</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                  <Quote className="h-6 w-6 text-blue-200" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-sm text-gray-600">{testimonial.date}</span>
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Service */}
                <div className="pt-3 border-t border-gray-100">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {testimonial.service}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-green-600 fill-current" />
              </div>
              <p className="text-2xl font-bold text-gray-900">5/5</p>
              <p className="text-gray-600">Note moyenne</p>
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

        {/* Google Reviews Link */}
        <div className="text-center mt-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 inline-block">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google" 
                className="w-5 h-5"
              />
              <span className="font-semibold text-gray-900">Avis Google</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Découvrez tous nos avis clients authentiques
            </p>
            <a 
              href="https://www.google.com/search?q=LS+COM+électricien+avis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <span>Voir nos avis Google</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;