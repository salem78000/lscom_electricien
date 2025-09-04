import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Calendar, User, MapPin } from 'lucide-react';
import SecurePhone from '../SecurePhone';

const TestimonialsSection: React.FC = () => {
  // Vrais avis clients extraits de Trustindex.io
  const testimonials = [
    {
      name: "Floriane DENTU",
      date: "05 août 2025",
      rating: 5,
      service: "Remplacement tableau électrique",
      text: "Excellent. J'ai fait appel à cette société pour le remplacement de mon tableau électrique ainsi que pour divers travaux d'électricité à mon domicile. En tant que femme seule, j'étais initialement un peu inquiète, compte tenu de mes expériences passées avec certains artisans peu fiables. Cependant, le gérant s'est montré très professionnel et a su m'accompagner tout au long des démarches nécessaires au changement du tableau électrique. Il a fait preuve d'une grande disponibilité, même avant le début des travaux. Je le recommande vivement, car il est rare de trouver aujourd'hui un professionnel aussi sérieux et digne de confiance.",
      verified: true
    },
    {
      name: "Muriel Soudry",
      date: "03 août 2025",
      rating: 5,
      service: "Conseil téléphonique",
      text: "Honnête efficace et rapide même le dimanche au mois d'août",
      verified: true
    },
    {
      name: "Christophe Serrano",
      date: "07 juillet 2025",
      rating: 5,
      service: "Installation plafonniers",
      text: "Nous avons fait appel à cet électricien pour l'installation de plafonniers dans notre domicile, qui en était initialement dépourvu, et nous sommes pleinement satisfaits de son intervention. Il s'est montré particulièrement disponible, intervenant en un temps record suite au premier contact. Nous avons également beaucoup apprécié sa réactivité ainsi que sa capacité à proposer des solutions efficaces afin de limiter au maximum les travaux de gros œuvre.",
      verified: true
    },
    {
      name: "Philippe Gaucher",
      date: "28 juin 2025",
      rating: 5,
      service: "Rénovation tableau + prise Green'Up",
      text: "Excellent électricien qui a rénové un tableau électrique et une prise green up dans une très vieille maison. Ce n'était pas facile! Je le recommande vivement pour sa réactivité, son honnêteté et sa compétence.",
      verified: true
    },
    {
      name: "Stephanie Villard",
      date: "04 juin 2025",
      rating: 5,
      service: "Installation borne IRVE",
      text: "Après recherche d'un électricien IRVE certifié pour la pose d'une prise pour voiture électrique je rentre en contact avec Salem et la réactivité des réponses et les précieux conseils m'ont incité à demander un devis. J'ai obtenu le rdv pour la pose dans la foulée...rdv et pose super bien passée...à l'écoute pour comprendre les besoins, ultra professionnel..service de grande qualité... je ne peux que recommander ses services !",
      verified: true
    },
    {
      name: "Gilles COCHET",
      date: "20 mai 2025",
      rating: 5,
      service: "Installation prise de terre",
      text: "Les travaux demandés concernaient l'installation de prise de terre à la suite d'un diagnostic électrique, le résultat est probant et les artisans ont été très performants. A conseiller sans hésitation !",
      verified: true
    },
    {
      name: "NelloB",
      date: "29 avril 2025",
      rating: 5,
      service: "Installation prises + tableau garage",
      text: "Nous avons fait appel à cette entreprise pour l'installation de prises électriques, dont une prise renforcée destinée à la recharge d'un véhicule électrique, ainsi que pour la pose d'un nouveau tableau électrique dans notre garage. Dès les premiers échanges en vue de l'établissement du devis, l'entreprise s'est montrée très réactive et flexible, répondant à mes messages en un temps record. L'installation a été réalisée seulement quatre jours après notre premier contact, avec un travail soigné, rapide et irréprochable.",
      verified: true
    },
    {
      name: "Isabelle Le Nouail",
      date: "05 mai 2025",
      rating: 5,
      service: "Changement compteur à fusible",
      text: "J'ai fait changer mon vieux compteur à fusible. Très satisfaite de l'entreprise LS COM. Très réactif dès le premier contact, travail satisfaisant et prix correct. Je recommande.",
      verified: true
    },
    {
      name: "Violaine Billot",
      date: "24 mars 2025",
      rating: 5,
      service: "Dépannage cuisine",
      text: "Ravie du dépannage pour l'électricité de ma cuisine. Rapide et efficace et surtout qui a su s'arranger en fonction de mes disponibilités!",
      verified: true
    },
    {
      name: "Jean-Roch Constans",
      date: "16 mars 2025",
      rating: 5,
      service: "Installation prise 32A véhicule électrique",
      text: "Installation d'une prise 32 A pour le véhicule électrique, travail bien et vite fait (et bien moins cher qu'une wall box).",
      verified: true
    },
    {
      name: "Bertrand Delacroix",
      date: "20 février 2025",
      rating: 5,
      service: "Travaux électriques divers",
      text: "J'ai fait appel à LS Com (que je ne connaissais pas) pour divers travaux électriques. L'intervention a été parfaite tant pour le délai que pour la qualité du travail. Je recommande donc",
      verified: true
    },
    {
      name: "Guy Benzadon",
      date: "12 février 2025",
      rating: 5,
      service: "Travaux électriques",
      text: "Travail sérieux, rapide et en plus... dans la bonne humeur. Je recommande!",
      verified: true
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const maxSlide = Math.max(0, testimonials.length - slidesToShow);
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slidesToShow, testimonials.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    const maxSlide = Math.max(0, testimonials.length - slidesToShow);
    setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    const maxSlide = Math.max(0, testimonials.length - slidesToShow);
    setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const maxSlide = Math.max(0, testimonials.length - slidesToShow);

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Avis clients authentiques
            </h2>
          </div>
          <p className="text-xl text-gray-600">
            Découvrez les témoignages de nos clients satisfaits - 100% authentiques
          </p>
          <div className="bg-white inline-flex items-center space-x-2 px-4 py-2 rounded-full shadow-sm">
            <a 
              href="https://www.google.com/search?q=LS+COM+%C3%A9lectricien+avis#mpd=~15659174708579577897/customers/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Voir tous nos avis sur Google
            </a>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg border border-gray-200 transition-all duration-200 hover:scale-105"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg border border-gray-200 transition-all duration-200 hover:scale-105"
            aria-label="Avis suivant"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          {/* Slides */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
                width: `${(testimonials.length / slidesToShow) * 100}%`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="px-3"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <h3 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h3>
                          {testimonial.verified && (
                            <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                              ✓ Vérifié
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                          <Calendar className="h-3 w-3" />
                          <span>{testimonial.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({testimonial.rating}/5)</span>
                    </div>

                    {/* Service */}
                    <div className="bg-blue-50 px-3 py-1 rounded-full text-xs text-blue-700 font-medium inline-block mb-4 w-fit">
                      {testimonial.service}
                    </div>

                    {/* Quote */}
                    <div className="relative flex-1">
                      <Quote className="h-5 w-5 text-blue-200 absolute -top-1 -left-1" />
                      <p className="text-gray-700 text-sm leading-relaxed pl-4 line-clamp-6">
                        "{testimonial.text}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index 
                    ? 'bg-blue-600 scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller à la page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
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
            <p className="text-gray-400 text-sm">
              ⭐ Note 5/5 sur Trustindex.io • SIRET: 52445239800026 • Électricien certifié
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;