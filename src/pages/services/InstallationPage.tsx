import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, ArrowRight } from 'lucide-react';
import SecurePhone from '../../components/SecurePhone';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceFeatures from '../../components/services/ServiceFeatures';
import ServiceProcess from '../../components/services/ServiceProcess';
import ServiceCTA from '../../components/services/ServiceCTA';

const InstallationPage: React.FC = () => {
  const serviceData = {
    title: 'Installation électrique complète',
    subtitle: 'Conception et réalisation d\'installations électriques neuves ou en rénovation',
    description: 'LS COM réalise vos installations électriques complètes avec expertise et professionnalisme. De la conception à la mise en service, nous vous accompagnons dans tous vos projets résidentiels et tertiaires.',
    image: '',
    features: [
      {
        title: 'Étude personnalisée',
        description: 'Analyse de vos besoins et conception sur mesure',
        icon: 'design'
      },
      {
        title: 'Matériel certifié',
        description: 'Équipements de qualité professionnelle',
        icon: 'quality'
      },
      {
        title: 'Mise aux normes',
        description: 'Respect strict des normes électriques',
        icon: 'compliance'
      },
      {
        title: 'Garantie travaux',
        description: 'Installations garanties et suivies',
        icon: 'warranty'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Diagnostic & étude',
        description: 'Visite technique et analyse de vos besoins électriques'
      },
      {
        step: 2,
        title: 'Conception & devis',
        description: 'Élaboration du projet et devis détaillé gratuit'
      },
      {
        step: 3,
        title: 'Réalisation',
        description: 'Installation complète par nos électriciens certifiés'
      },
      {
        step: 4,
        title: 'Contrôle & mise en service',
        description: 'Vérifications et mise en service de l\'installation'
      }
    ]
  };

  return (
    <div>
      <ServiceHero {...serviceData} />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Nos prestations d'installation électrique
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    LS COM intervient sur tous types d'installations électriques, du simple remplacement 
                    de prises à l'installation complète de bâtiments neufs ou en rénovation.
                  </p>
                  <p>
                    Nos électriciens certifiés maîtrisent les dernières normes et technologies pour vous 
                    garantir des installations sûres, durables et performantes.
                  </p>
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Nos installations :</h3>
                <div className="grid gap-3">
                  {[
                    'Installation électrique complète (neuf et rénovation)',
                    'Création et extension de circuits électriques',
                    'Installation de prises, interrupteurs et éclairages',
                    'Mise en place de tableaux électriques',
                    'Installation de chauffage électrique',
                    'Câblage réseau et domotique',
                    'Installation de bornes de recharge IRVE (certifié QUALIFELEC)',
                    'Éclairage extérieur et sécurité'
                  ].map((service, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Pourquoi choisir LS COM ?
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Expertise reconnue',
                    description: '15+ années d\'expérience en installation électrique'
                  },
                  {
                    title: 'Normes respectées',
                    description: 'Conformité NF C 15-100 et certification Consuel'
                  },
                  {
                    title: 'Matériel premium',
                    description: 'Équipements de marques reconnues (Legrand, Schneider...)'
                  },
                  {
                    title: 'Suivi personnalisé',
                    description: 'Accompagnement de A à Z et service après-vente'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-blue-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Besoin d'une installation électrique ?
                  </p>
                  <div className="space-y-3">
                    <Link 
                      to="/contact" 
                      className="block bg-[#b32a29] hover:bg-[#9a2426] text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      Demander un devis gratuit
                    </Link>
                    <a 
                      href="tel:+33622523902" 
                      className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <SecurePhone 
                        variant="link"
                        showIcon={true}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceFeatures features={serviceData.features} />
      <ServiceProcess process={serviceData.process} />
      <ServiceCTA 
        title="Votre projet d'installation électrique"
        description="Confiez votre installation électrique à des professionnels certifiés"
      />
    </div>
  );
};

export default InstallationPage;