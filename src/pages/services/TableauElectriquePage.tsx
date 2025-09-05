import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, ArrowRight, AlertTriangle, Euro, Zap, Award, Clock } from 'lucide-react';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceFeatures from '../../components/services/ServiceFeatures';
import ServiceProcess from '../../components/services/ServiceProcess';
import ServiceCTA from '../../components/services/ServiceCTA';
import SecurePhone from '../../components/SecurePhone';

const TableauElectriquePage: React.FC = () => {
  // État pour l'image tableau
  const [tableauImage, setTableauImage] = React.useState('');
  
  // Charger l'image tableau depuis le localStorage
  React.useEffect(() => {
    const loadTableauImage = () => {
      const stored = localStorage.getItem('site_images');
      if (stored) {
        try {
          const images = JSON.parse(stored);
          if (images.tableau && images.tableau.trim()) {
            setTableauImage(images.tableau);
            console.log('✅ Tableau image loaded:', images.tableau);
          }
        } catch (error) {
          console.error('Erreur chargement image tableau:', error);
        }
      }
    };
    
    loadTableauImage();
    
    // Écouter les changements
    const handleStorageChange = () => {
      console.log('🔄 Tableau image storage change detected');
      loadTableauImage();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', loadTableauImage);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadTableauImage);
    };
  }, []);

  const serviceData = {
    title: 'Mise en sécurité tableau électrique',
    subtitle: 'Remplacement de tableau électrique avec tarifs fixes transparents',
    description: 'LS COM assure le remplacement complet de votre tableau électrique avec des tarifs fixes selon le nombre de rangées. Installation conforme aux normes NF C 15-100 pour votre sécurité.',
    image: tableauImage,
    features: [
      {
        title: 'Tarifs fixes transparents',
        description: 'Prix clairs selon le nombre de rangées, sans surprise',
        icon: 'design'
      },
      {
        title: 'Matériel professionnel',
        description: 'Tableaux et disjoncteurs de marques reconnues',
        icon: 'quality'
      },
      {
        title: 'Conformité NF C 15-100',
        description: 'Installation aux normes électriques en vigueur',
        icon: 'compliance'
      },
      {
        title: 'Garantie travaux',
        description: 'Installation garantie et service après-vente',
        icon: 'warranty'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Diagnostic tableau existant',
        description: 'Évaluation de votre installation et besoins en rangées'
      },
      {
        step: 2,
        title: 'Devis tarif fixe',
        description: 'Proposition avec tarif transparent selon configuration'
      },
      {
        step: 3,
        title: 'Remplacement tableau',
        description: 'Installation du nouveau tableau par nos électriciens'
      },
      {
        step: 4,
        title: 'Mise en service',
        description: 'Tests complets et remise en service sécurisée'
      }
    ]
  };

  const tableauPrices = [
    {
      rangees: '1 rangée',
      price: '890€',
      description: 'Tableau électrique 1 rangée - Idéal pour petits logements',
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: [
        'Tableau électrique neuf (coffret, peignes de connexion)',
        '1 interrupteur différentiel de type A',
        'Disjoncteurs de protection (selon équipements électriques du logement)',
        'Identification des circuits en amont fait par le client',
        'Matériel de marque Legrand ou équivalent'
      ]
    },
    {
      rangees: '2 rangées',
      price: '1290€',
      description: 'Tableau électrique 2 rangées - Configuration standard',
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: [
        'Tableau électrique neuf (coffret, peignes de connexion)',
        '1 interrupteur différentiel de type AC',
        '1 interrupteur différentiel de type A',
        'Disjoncteurs de protection (selon équipements électriques du logement)',
        'Identification des circuits en amont fait par le client',
        'Matériel de marque Legrand ou équivalent'
      ],
      popular: true
    },
    {
      rangees: '3 rangées',
      price: '1390€',
      description: 'Tableau électrique 3 rangées - Pour grandes installations',
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: [
        'Tableau électrique neuf (coffret, peignes de connexion)',
        '2 interrupteurs différentiels de type AC',
        '1 interrupteur différentiel de type A',
        'Disjoncteurs de protection (selon équipements électriques du logement)',
        'Identification des circuits en amont fait par le client',
        'Matériel de marque Legrand ou équivalent'
      ]
    },
    {
      rangees: '4 rangées',
      price: '1690€',
      description: 'Tableau électrique 4 rangées - Installation complète',
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: [
        'Tableau électrique neuf (coffret, peignes de connexion)',
        '3 interrupteurs différentiels de type AC',
        '1 interrupteur différentiel de type A',
        'Disjoncteurs de protection (selon équipements électriques du logement)',
        'Identification des circuits en amont fait par le client',
        'Matériel de marque Legrand ou équivalent'
      ]
    }
  ];

  return (
    <div>
      <ServiceHero {...serviceData} />
      
      {/* Section Tarifs Fixes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tarifs fixes remplacement tableau électrique
            </h2>
            <p className="text-xl text-gray-600">
              Prix transparents selon le nombre de rangées - Installation complète incluse
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tableauPrices.map((tableau, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  tableau.popular 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {tableau.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      ⭐ POPULAIRE
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-4 flex items-center justify-center">
                      <img 
                        src={`/Tableau ${index + 1} rangée${index > 0 ? 's' : ''}.png`}
                        alt={`Tableau électrique ${tableau.rangees}`}
                        className="w-20 h-20 object-contain"
                        onError={(e) => {
                          // Fallback vers l'icône en cas d'erreur de chargement
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center hidden">
                        <Shield className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Tableau {tableau.rangees}
                    </h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {tableau.price}
                    </div>
                    <p className="text-sm text-gray-600">
                      {tableau.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tableau.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    to="/contact" 
                    className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                      tableau.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Option Neutre Commun */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Zap className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Option Neutre Commun
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Si votre installation existante dispose d'un <strong>câblage en neutre commun en amont</strong>, 
                    nous proposons une option spécifique pour adapter le nouveau tableau à cette configuration.
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Adaptation Neutre Commun
                      </h4>
                      <span className="text-2xl font-bold text-orange-600">
                        +350€
                      </span>
                    </div>
                    
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">Adaptation du câblage existant</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">Raccordement neutre commun</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">Vérification conformité</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">Tests de fonctionnement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <img 
                  src="/neutre-commun.jpg" 
                  alt="Neutre commun en hamon - Configuration électrique spéciale"
                  className="rounded-lg shadow-lg w-full h-64 object-cover mb-4"
                />
                <p className="text-sm text-gray-600 italic">
                  Configuration neutre commun existante
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  Pourquoi remplacer votre tableau électrique ?
                </h2>
                <p className="text-xl text-gray-600">
                  Un tableau électrique vétuste présente des risques pour votre sécurité 
                  et celle de votre famille.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Sécurité des personnes</h3>
                    <p className="text-gray-600">
                      Protection contre les risques d'électrocution et d'incendie 
                      grâce aux dispositifs différentiels modernes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Conformité aux normes</h3>
                    <p className="text-gray-600">
                      Mise aux normes NF C 15-100 obligatoire pour la vente 
                      et recommandée pour votre sécurité.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Euro className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Assurance habitation</h3>
                    <p className="text-gray-600">
                      Maintien de votre couverture assurance en cas de sinistre 
                      avec une installation conforme.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Valeur du bien</h3>
                    <p className="text-gray-600">
                      Valorisation de votre patrimoine immobilier avec une 
                      installation électrique moderne et sécurisée.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Nos tarifs fixes incluent
              </h3>
              <div className="space-y-4">
                {[
                  'Dépose de l\'ancien tableau',
                  'Fourniture du nouveau tableau',
                  'Tous les dispositifs de protection',
                  'Raccordement de tous les circuits',
                  'Tests et mise en service',
                  'Nettoyage du chantier',
                  'Garantie travaux'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-blue-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Besoin d'un remplacement de tableau ?
                  </p>
                  <div className="space-y-3">
                    <Link 
                      to="/contact" 
                      className="block bg-[#b32a29] hover:bg-[#9a2426] text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      Demander un devis gratuit
                    </Link>
                    <SecurePhone 
                      className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                      variant="link"
                      showIcon={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informations importantes */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-yellow-200">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                Informations importantes
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Tarifs et conditions :</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Tarifs HT - TVA à 10% (particuliers, logements +2 ans)</li>
                  <li>• TVA à 20% (professionnels et logements neufs)</li>
                  <li>• Installation standard en apparent</li>
                  <li>• Raccordement sur circuits existants</li>
                  <li>• Déplacement inclus en Île-de-France</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Prestations incluses :</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Diagnostic de l'installation existante</li>
                  <li>• Fourniture complète du tableau</li>
                  <li>• Main d'œuvre et mise en service</li>
                  <li>• Garantie 2 ans sur l'installation</li>
                  <li>• Attestation de conformité</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium text-center">
                💡 Devis gratuit et sans engagement - Intervention sous 48h
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceFeatures features={serviceData.features} />
      <ServiceProcess process={serviceData.process} />
      <ServiceCTA 
        title="Votre nouveau tableau électrique"
        description="Confiez le remplacement de votre tableau électrique à des professionnels certifiés"
      />
    </div>
  );
};

export default TableauElectriquePage;