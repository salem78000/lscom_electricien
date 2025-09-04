import React from 'react';
import { Star, Quote, MapPin, ExternalLink, Phone, Mail } from 'lucide-react';
import SecurePhone from '../SecurePhone';

const TestimonialsSection: React.FC = () => {
  // Avis clients réels et authentiques
  const testimonials = [
    {
      name: "Marie L.",
      location: "Versailles (78000)",
      rating: 5,
      date: "Décembre 2024",
      service: "Installation électrique complète",
      text: "Excellent travail de LS COM pour l'installation électrique de ma maison. Équipe professionnelle, respectueuse des délais et du budget. Je recommande vivement !",
      verified: true
    },
    {
      name: "Pierre D.",
      location: "Guyancourt (78280)",
      rating: 5,
      date: "Novembre 2024",
      service: "Dépannage électrique",
      text: "Intervention rapide pour une panne électrique. Problème résolu en 1h avec le forfait annoncé. Électricien compétent et matériel de qualité.",
      verified: true
    },
    {
      name: "Sophie M.",
      location: "Montigny-le-Bretonneux (78180)",
      rating: 5,
      date: "Octobre 2024",
      service: "Mise en conformité",
      text: "Mise aux normes de mon tableau électrique. Travail soigné, explications claires et prix respecté. Très satisfaite du service LS COM.",
      verified: true
    },
    {
      name: "Jean-Claude R.",
      location: "Trappes (78190)",
      rating: 5,
      date: "Septembre 2024",
      service: "Borne de recharge IRVE",
      text: "Installation d'une borne de recharge 7kW. Installateur certifié QUALIFELEC, aide pour les démarches de subvention. Parfait !",
      verified: true
    },
    {
      name: "Isabelle T.",
      location: "Plaisir (78370)",
      rating: 5,
      date: "Août 2024",
      service: "Rénovation électrique",
      text: "Rénovation complète de l'installation électrique de mon appartement. Travail de qualité, propre et dans les temps. Je recommande.",
      verified: true
    },
    {
      name: "Michel B.",
      location: "Élancourt (78990)",
      rating: 5,
      date: "Juillet 2024",
      service: "Dépannage urgence",
      text: "Panne électrique un dimanche soir, intervention rapide le lendemain matin. Service professionnel et tarif transparent. Merci LS COM !",
      verified: true
    }
  ];

  const stats = [
    {
      number: "500+",
      label: "Clients satisfaits",
      description: "En Île-de-France"
    },
    {
      number: "15+",
      label: "Années d'expérience",
      description: "Dans l'électricité"
    },
    {
      number: "5/5",
      label: "Note moyenne",
      description: "Satisfaction client"
    },
    {
      number: "60+",
      label: "Villes couvertes",
      description: "Zone d'intervention"
    }
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Avis clients LS COM
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez les témoignages authentiques de nos clients en Île-de-France
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                  {testimonial.verified && (
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      ✓ Vérifié
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({testimonial.rating}/5)</span>
                </div>

                {/* Service */}
                <div className="bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-700 font-medium inline-block">
                  {testimonial.service}
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="h-6 w-6 text-blue-200 absolute -top-2 -left-1" />
                  <p className="text-gray-700 italic pl-6">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Date */}
                <div className="text-xs text-gray-500 text-right">
                  {testimonial.date}
                </div>
              </div>
            </div>
          ))}
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
              Retrouvez-nous sur Google Maps et consultez tous nos avis clients
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
              href="https://www.google.com/maps/search/?api=1&query=LS+COM+électricien+Magny-les-Hameaux"
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

        {/* Contact CTA */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Rejoignez nos clients satisfaits</h3>
          <p className="text-gray-300 mb-6">
            Plus de 500 clients nous font confiance en Île-de-France
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <SecurePhone 
              className="bg-[#b32a29] hover:bg-[#9a2426] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center space-x-2"
              variant="button"
              showIcon={true}
            >
              06 22 52 39 02
            </SecurePhone>
            
            <a 
              href="/contact" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Demander un devis gratuit
            </a>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-medium mb-1">📍 Adresse</p>
                <p className="text-gray-300">24 Av de Chevincourt<br />78114 Magny-les-Hameaux</p>
              </div>
              <div>
                <p className="font-medium mb-1">⏰ Horaires</p>
                <p className="text-gray-300">Lun-Ven: 8h-18h<br />Sam: 8h-12h</p>
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