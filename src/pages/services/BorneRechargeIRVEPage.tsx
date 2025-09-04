import React from 'react';
import { Link } from 'react-router-dom';
import { Car, CheckCircle, ArrowRight, Phone, Award, Zap, Shield, Euro } from 'lucide-react';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceFeatures from '../../components/services/ServiceFeatures';
import ServiceProcess from '../../components/services/ServiceProcess';
import ServiceCTA from '../../components/services/ServiceCTA';

const BorneRechargeIRVEPage: React.FC = () => {
  const serviceData = {
    title: 'Installation de bornes de recharge IRVE',
    subtitle: 'Installateur certifié QUALIFELEC IRVE pour véhicules électriques',
    description: 'LS COM, installateur certifié QUALIFELEC IRVE, vous accompagne dans l\'installation de bornes de recharge et prises Green\'UP pour véhicules électriques. Bénéficiez des aides financières et d\'une installation conforme aux normes.',
    image: 'https://images.pexels.com/photos/7869258/pexels-photo-7869258.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      {
        title: 'Certification QUALIFELEC IRVE',
        description: 'Installateur agréé pour les infrastructures de recharge',
        icon: 'quality'
      },
      {
        title: 'Éligibilité aux aides',
        description: 'Crédit d\'impôt, prime ADVENIR et subventions locales',
        icon: 'warranty'
      },
      {
        title: 'Installation sécurisée',
        description: 'Respect des normes NF C 15-100 et IEC 61851',
        icon: 'compliance'
      },
      {
        title: 'Garantie constructeur',
        description: 'Matériel garanti et service après-vente',
        icon: 'design'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Étude technique',
        description: 'Visite et analyse de votre installation électrique existante'
      },
      {
        step: 2,
        title: 'Choix de la solution',
        description: 'Sélection de la borne adaptée à vos besoins et véhicule'
      },
      {
        step: 3,
        title: 'Installation certifiée',
        description: 'Pose par nos électriciens certifiés QUALIFELEC IRVE'
      },
      {
        step: 4,
        title: 'Mise en service',
        description: 'Tests, formation et remise du certificat de conformité'
      }
    ]
  };

  const borneTypes = [
    {
      name: 'Prise Green\'UP',
      power: '3,7 kW',
      description: 'Solution économique pour recharge lente',
      features: ['Installation simple', 'Compatible tous VE', 'Sécurisée'],
      price: 'À partir de 300€'
    },
    {
      name: 'Borne murale 7kW',
      power: '7 kW',
      description: 'Solution optimale pour usage domestique',
      features: ['Recharge rapide', 'Écran de contrôle', 'Protection IP54'],
      price: 'À partir de 800€'
    },
    {
      name: 'Borne 22kW',
      power: '22 kW',
      description: 'Solution professionnelle haute puissance',
      features: ['Recharge ultra-rapide', 'Gestion intelligente', 'Robuste'],
      price: 'À partir de 1500€'
    }
  ];

  const aides = [
    {
      name: 'Crédit d\'impôt',
      amount: '75% (max 300€)',
      description: 'Pour les particuliers en résidence principale'
    },
    {
      name: 'Prime ADVENIR',
      amount: 'Jusqu\'à 960€',
      description: 'Pour copropriétés et entreprises'
    },
    {
      name: 'Aides locales',
      amount: 'Variables',
      description: 'Subventions régionales et communales'
    }
  ];

  return (
    <div>
      <ServiceHero {...serviceData} />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            <div className="space-y-8">
              <div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                  🏆 INSTALLATEUR CERTIFIÉ QUALIFELEC IRVE
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Installation de bornes de recharge IRVE
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    LS COM est un installateur certifié QUALIFELEC IRVE (Infrastructure de Recharge 
                    pour Véhicules Électriques), garantissant une installation conforme et sécurisée 
                    de votre borne de recharge.
                  </p>
                  <p>
                    Notre certification vous permet de bénéficier des aides financières disponibles 
                    et vous assure une installation réalisée selon les normes en vigueur.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Nos solutions IRVE :</h3>
                <div className="grid gap-3">
                  {[
                    'Prises Green\'UP sécurisées (3,7 kW)',
                    'Bornes murales domestiques (7 kW)',
                    'Bornes haute puissance (22 kW)',
                    'Solutions pour copropriétés',
                    'Installations professionnelles',
                    'Gestion intelligente de la charge',
                    'Supervision et maintenance',
                    'Information sur les aides disponibles'
                  ].map((service, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Car className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Pourquoi choisir un installateur IRVE ?
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Obligation légale',
                    description: 'Installation par un professionnel certifié obligatoire pour les bornes > 3,7 kW'
                  },
                  {
                    title: 'Aides financières',
                    description: 'Éligibilité aux crédits d\'impôt et subventions uniquement avec un installateur IRVE'
                  },
                  {
                    title: 'Sécurité garantie',
                    description: 'Installation conforme aux normes électriques et de sécurité'
                  },
                  {
                    title: 'Assurance validée',
                    description: 'Couverture assurance habitation maintenue'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <Award className="h-5 w-5 text-green-600 mr-2" />
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 text-sm ml-7">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types de bornes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos solutions de recharge
            </h2>
            <p className="text-xl text-gray-600">
              Solutions IRVE adaptées à tous vos besoins en Île-de-France
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Prise Green'UP Legrand */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Prise Green'UP Legrand</h3>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    3,7 kW
                  </span>
                </div>
                
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 font-medium">3,7 kW - Monophasé</p>
                  <p className="text-gray-600">Solution économique pour recharge lente et sécurisée</p>
                </div>
                
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Installation simple sur circuit dédié</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Compatible tous véhicules électriques</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Protection IP66 - Usage intérieur/extérieur</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Recharge jusqu'à 14A (vs 10A prise standard)</span>
                  </li>
                </ul>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-lg font-bold text-green-600">À partir de 710€ HT</p>
                  <p className="text-xs text-gray-500">Installation comprise avec protection différentielle</p>
                </div>
              </div>
            </div>

            {/* Borne Murale 7,4kW */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ring-2 ring-blue-200">
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                ⭐ POPULAIRE
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Borne Murale 7,4kW</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    7,4 kW
                  </span>
                </div>
                
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 font-medium">7,4 kW - Monophasé</p>
                  <p className="text-gray-600">Solution optimale pour usage domestique</p>
                </div>
                
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Recharge semi-rapide (35 km d'autonomie/heure)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Compatible gestion heures creuses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Écran de contrôle et sécurités intégrées</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Protection IP54 - Installation intérieure</span>
                  </li>
                </ul>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-lg font-bold text-blue-600">À partir de 1 280€ HT</p>
                  <p className="text-xs text-gray-500">Installation comprise</p>
                </div>
              </div>
            </div>

            {/* Borne Professionnelle 22kW */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Borne Professionnelle 22kW</h3>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    22 kW
                  </span>
                </div>
                
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 font-medium">22 kW - Triphasé</p>
                  <p className="text-gray-600">Solution professionnelle haute performance</p>
                </div>
                
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-700">Recharge rapide (100 km d'autonomie/heure)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-700">Gestion intelligente de la charge</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-700">Construction robuste - Usage intensif</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-700">Options connectivité et RFID</span>
                  </li>
                </ul>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-lg font-bold text-purple-600">À partir de 1 990€ HT</p>
                  <p className="text-xs text-gray-500">Installation comprise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aides financières */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Aides financières disponibles
            </h2>
            <p className="text-xl text-gray-600">
              Réduisez le coût de votre installation grâce aux aides publiques
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aides.map((aide, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Euro className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{aide.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-3">{aide.amount}</p>
                <p className="text-gray-600 text-sm">{aide.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-orange-100 p-6 rounded-lg border border-orange-200 inline-block">
              <p className="text-orange-800 font-medium mb-2">
                💡 Nous vous accompagnons dans vos démarches
              </p>
              <p className="text-orange-700 text-sm mb-4">
                Pour vos démarches d'aides financières, consultez le site officiel :
              </p>
              <a 
                href="https://advenir.mobi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#b32a29] hover:bg-[#9a2426] text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <span>Advenir.mobi</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServiceFeatures features={serviceData.features} />
      <ServiceProcess process={serviceData.process} />
      <ServiceCTA 
        title="Votre borne de recharge IRVE"
        description="Confiez l'installation de votre borne de recharge à un professionnel certifié QUALIFELEC IRVE"
      />
    </div>
  );
};

export default BorneRechargeIRVEPage;