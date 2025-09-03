import React from 'react';
import { Shield, Award, Users, MapPin } from 'lucide-react';

const AboutSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: '500+',
      label: 'Clients satisfaits',
      description: 'Particuliers et professionnels'
    },
    {
      icon: Award,
      number: '15+',
      label: 'Années d\'expérience',
      description: 'Dans l\'électricité'
    },
    {
      icon: Shield,
      number: '100%',
      label: 'Travaux garantis',
      description: 'Qualité certifiée'
    },
    {
      icon: MapPin,
      number: '60+',
      label: 'Villes couvertes',
      description: 'En Île-de-France'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                LS COM, votre expert électricien
                <span className="block" style={{ color: '#b32a29' }}>de confiance</span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Depuis plus de 15 ans, LS COM accompagne les particuliers et professionnels 
                d'Île-de-France dans tous leurs projets électriques. Notre expertise reconnue 
                et notre approche qualitative font de nous le partenaire idéal pour vos installations, 
                dépannages et mises en conformité.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Nos engagements qualité :</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-blue-700 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Électriciens certifiés et formés</p>
                    <p className="text-gray-600">Respect strict des normes électriques en vigueur</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-blue-700 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Qualité garantie sur tous nos travaux</p>
                    <p className="text-gray-600">Matériel professionnel et installations durables</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-blue-700 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Service client personnalisé</p>
                    <p className="text-gray-600">Écoute, conseil et suivi de vos projets</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="space-y-3">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
                      <p className="font-medium text-gray-900">{stat.label}</p>
                      <p className="text-sm text-gray-600">{stat.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;