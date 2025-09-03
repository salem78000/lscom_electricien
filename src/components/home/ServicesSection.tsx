import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, AlertTriangle, Settings, ArrowRight, Car } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Car,
      title: 'Bornes de recharge IRVE',
      description: 'Installation de bornes de recharge et prises Green UP pour vehicules electriques. Installateur certifie QUALIFELEC IRVE.',
      features: ['Certification QUALIFELEC IRVE', 'Bornes et prises Green UP', 'Aide aux subventions'],
      link: '/services/borne-recharge-irve',
      color: 'green',
      featured: true
    },
    {
      icon: Zap,
      title: 'Installation electrique complete',
      description: 'Conception et realisation d installations electriques neuves ou en renovation, adaptees a vos besoins specifiques.',
      features: ['Etude personnalisee', 'Materiel certifie', 'Mise aux normes'],
      link: '/services/installation-electrique',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Mise en conformite tableau electrique',
      description: 'Modernisation et mise aux normes de vos tableaux electriques pour garantir securite et performance.',
      features: ['Diagnostic complet', 'Respect des normes', 'Certification'],
      link: '/services/mise-en-conformite',
      color: 'green'
    },
    {
      icon: AlertTriangle,
      title: 'Depannage electrique d urgence',
      description: 'Intervention rapide 24h/24 et 7j/7 pour resoudre tous vos problemes electriques en urgence.',
      features: ['24h/24 - 7j/7', 'Intervention rapide', 'Diagnostic gratuit'],
      link: '/services/depannage-urgence',
      color: 'orange'
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 bg-blue-100 hover:bg-blue-200',
      green: 'text-green-600 bg-green-100 hover:bg-green-200',
      orange: 'text-orange-600 bg-orange-100 hover:bg-orange-200',
      purple: 'text-purple-600 bg-purple-100 hover:bg-purple-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Nos services électriques
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De l installation complete au depannage d urgence, LS COM vous accompagne 
            dans tous vos projets electriques avec expertise et professionnalisme.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const colorClasses = getColorClasses(service.color);
            
            return (
              <div
                key={index}
                className={`group p-6 rounded-2xl border transition-all duration-300 ${
                  service.featured
                    ? 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200 hover:border-green-300 hover:shadow-xl ring-2 ring-green-100'
                    : 'bg-gray-50 border-gray-100 hover:border-gray-200 hover:shadow-lg'
                }`}
              >
                {service.featured && (
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                    🏆 CERTIFIÉ QUALIFELEC IRVE
                  </div>
                )}
                <div className="space-y-4">
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl ${colorClasses} flex items-center justify-center transition-colors`}>
                    <IconComponent className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link 
                    to={service.link}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-all"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link 
            to="/contact" 
            className="inline-flex items-center space-x-2 bg-[#b32a29] hover:bg-[#9a2426] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
          >
            <span>Demander un devis gratuit</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;