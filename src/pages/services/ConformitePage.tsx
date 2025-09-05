import React from 'react';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceFeatures from '../../components/services/ServiceFeatures';
import ServiceProcess from '../../components/services/ServiceProcess';
import ServiceCTA from '../../components/services/ServiceCTA';

const ConformitePage: React.FC = () => {
  const serviceData = {
    title: 'Mise en conformité électrique',
    subtitle: 'Modernisation et mise aux normes de vos installations électriques',
    description: 'LS COM assure la mise en conformité de vos installations électriques selon les normes NF C 15-100. Nos électriciens certifiés garantissent la sécurité et la performance de vos équipements électriques.',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      {
        title: 'Diagnostic complet',
        description: 'Analyse approfondie de votre installation existante',
        icon: 'design'
      },
      {
        title: 'Respect des normes',
        description: 'Conformité NF C 15-100 et réglementations en vigueur',
        icon: 'compliance'
      },
      {
        title: 'Certification officielle',
        description: 'Attestation de conformité Consuel',
        icon: 'warranty'
      },
      {
        title: 'Sécurité garantie',
        description: 'Protection optimale de vos biens et personnes',
        icon: 'quality'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Diagnostic initial',
        description: 'Évaluation complète de votre installation électrique existante'
      },
      {
        step: 2,
        title: 'Plan de mise en conformité',
        description: 'Établissement du plan de travaux et devis détaillé'
      },
      {
        step: 3,
        title: 'Travaux de mise aux normes',
        description: 'Réalisation des modifications nécessaires par nos experts'
      },
      {
        step: 4,
        title: 'Contrôle et certification',
        description: 'Vérification finale et obtention de l\'attestation Consuel'
      }
    ]
  };

  return (
    <div>
      <ServiceHero {...serviceData} />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Mise en conformité électrique
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    La mise en conformité électrique est obligatoire pour garantir la sécurité 
                    de votre installation. LS COM vous accompagne dans cette démarche essentielle.
                  </p>
                  <p>
                    Nos électriciens certifiés réalisent un diagnostic complet de votre installation 
                    et effectuent tous les travaux nécessaires pour respecter la norme NF C 15-100.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Nos prestations de conformité :</h3>
                <div className="grid gap-3">
                  {[
                    'Diagnostic électrique complet',
                    'Mise aux normes tableau électrique',
                    'Remplacement des équipements défaillants',
                    'Installation de dispositifs de sécurité',
                    'Mise à la terre et protection différentielle',
                    'Contrôle et certification Consuel',
                    'Attestation de conformité officielle',
                    'Suivi post-travaux et garantie'
                  ].map((service, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Pourquoi mettre en conformité ?
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Sécurité des personnes',
                    description: 'Protection contre les risques d\'électrocution et d\'incendie'
                  },
                  {
                    title: 'Obligation légale',
                    description: 'Respect de la réglementation en vigueur'
                  },
                  {
                    title: 'Assurance habitation',
                    description: 'Maintien de la couverture en cas de sinistre'
                  },
                  {
                    title: 'Valeur du bien',
                    description: 'Préservation et valorisation de votre patrimoine'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceFeatures features={serviceData.features} />
      <ServiceProcess process={serviceData.process} />
      <ServiceCTA 
        title="Votre mise en conformité électrique"
        description="Confiez la mise aux normes de votre installation à des professionnels certifiés"
      />
    </div>
  );
};

export default ConformitePage;