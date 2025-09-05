import React from 'react';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceFeatures from '../../components/services/ServiceFeatures';
import ServiceProcess from '../../components/services/ServiceProcess';
import ServiceCTA from '../../components/services/ServiceCTA';

const DepannagePage: React.FC = () => {
  const serviceData = {
    title: 'Dépannage électrique',
    subtitle: 'Intervention rapide pour tous vos problèmes électriques avec tarif fixe',
    description: 'LS COM assure un service de dépannage électrique à partir de 110€ HT selon zone. Nos électriciens certifiés interviennent rapidement pour résoudre tous vos problèmes électriques et rétablir votre installation en toute sécurité.',
    features: [
      {
        title: 'À partir de 110€ HT',
        description: 'Prix selon zone pour 1h de dépannage électrique',
        icon: 'design'
      },
      {
        title: 'Diagnostic rapide',
        description: 'Identification immédiate de la panne électrique',
        icon: 'quality'
      },
      {
        title: 'Réparation incluse',
        description: 'Réparation si possible dans le forfait 1 heure',
        icon: 'compliance'
      },
      {
        title: 'Sécurité garantie',
        description: 'Remise en sécurité immédiate de votre installation',
        icon: 'warranty'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Prise de contact',
        description: 'Contactez-nous pour signaler votre panne électrique'
      },
      {
        step: 2,
        title: 'Déplacement',
        description: 'Déplacement de votre électricien dans notre zone d\'intervention'
      },
      {
        step: 3,
        title: 'Diagnostic & réparation',
        description: 'Identification du problème et réparation immédiate si possible'
      },
      {
        step: 4,
        title: 'Finalisation',
        description: 'Vérification complète et remise en service sécurisée'
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
                  Dépannage électrique
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Une panne électrique nécessite une intervention 
                    rapide pour rétablir votre installation en toute sécurité.
                  </p>
                  <p>
                    LS COM intervient rapidement sur tous types de pannes électriques en Île-de-France 
                    avec un tarif transparent à partir de 110€ HT selon votre zone.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Forfait dépannage à partir de 110€ HT selon votre zone :</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Dépannage électricité (1h) - À partir de 110€ HT</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Déplacement de votre électricien</li>
                    <li>• Recherche de panne</li>
                    <li>• Réparation si possible dans le forfait 1 heure</li>
                    <li>• Établissement devis complémentaire si nécessaire</li>
                    <li>• Fournitures non comprises</li>
                  </ul>
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Types de pannes traitées :</h4>
                <div className="grid gap-3">
                  {[
                    'Coupure de courant générale ou partielle',
                    'Court-circuit et disjoncteur qui saute',
                    'Panne de tableau électrique',
                    'Problème de prises ou interrupteurs',
                    'Défaillance éclairage intérieur/extérieur',
                    'Panne de chauffage électrique',
                    'Problème de terre ou différentiel',
                    'Surtension et protection des équipements',
                    'Autres pannes électriques courantes'
                  ].map((service, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
              <h3 className="text-2xl font-bold text-red-800 mb-6">
                ⚡ Panne électrique ?
              </h3>
              <div className="space-y-4">
                <p className="text-red-700">
                  En cas de panne électrique, contactez-nous pour une intervention rapide. 
                  Nos électriciens interviennent à partir de 110€ HT selon votre zone.
                </p>
                
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="text-center">
                    <p className="text-red-800 font-medium mb-2">Contactez-nous</p>
                    <div className="text-2xl font-bold text-red-600">
                      06 22 52 39 02
                    </div>
                    <p className="text-sm text-red-600 mt-1">À partir de 110€ HT selon zone</p>
                    <div className="mt-2">
                      <button 
                        onClick={() => window.location.href = 'tel:+33622523902'}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Appeler maintenant
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-red-800">Notre forfait dépannage :</h4>
                  <ul className="space-y-1 text-sm text-red-700">
                    <li>• À partir de 110€ HT selon zone pour 1h</li>
                    <li>• Diagnostic gratuit sur place</li>
                    <li>• Réparation incluse si possible</li>
                    <li>• Électriciens équipés et formés</li>
                    <li>• Devis transparent avant travaux</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceFeatures features={serviceData.features} />
      <ServiceProcess process={serviceData.process} />
      <ServiceCTA 
        title="Panne électrique ?"
        description="Contactez nos électriciens pour un dépannage rapide à partir de 110€ HT selon zone"
      />
    </div>
  );
};

export default DepannagePage;