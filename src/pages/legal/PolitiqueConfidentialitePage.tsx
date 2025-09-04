import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, Database, UserCheck, AlertTriangle, Mail } from 'lucide-react';
import SecurePhone from '../../components/SecurePhone';
import SecureEmail from '../../components/SecureEmail';

const PolitiqueConfidentialitePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Shield className="h-12 w-12 text-blue-300" />
            <h1 className="text-4xl lg:text-5xl font-bold">
              Politique de confidentialité
            </h1>
          </div>
          <p className="text-xl text-blue-100">
            Protection et traitement de vos données personnelles - LS COM Électricien
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Introduction */}
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
              <div className="flex items-center space-x-3 mb-6">
                <UserCheck className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Engagement de confidentialité
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  LS COM s'engage à protéger la confidentialité et la sécurité de vos données personnelles. 
                  Cette politique de confidentialité explique comment nous collectons, utilisons, stockons 
                  et protégeons vos informations personnelles conformément au Règlement Général sur la 
                  Protection des Données (RGPD).
                </p>
                <p className="font-medium text-blue-800">
                  Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>

            {/* Responsable du traitement */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Responsable du traitement des données
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-3">
                  <p><strong>Entreprise :</strong> LS COM</p>
                  <p><strong>Adresse :</strong> 24 Avenue de Chevincourt, 78114 Magny-les-Hameaux</p>
                  <p><strong>SIRET :</strong> 52445239800026</p>
                  <p><strong>Téléphone :</strong> 0622523902</p>
                  <p><strong>Email :</strong> <SecureEmail variant="text" showIcon={false} /></p>
                </div>
              </div>
            </div>

            {/* Données collectées */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Database className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Données personnelles collectées
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Données collectées via les formulaires de contact
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Données d'identification :</strong> Nom, prénom</li>
                    <li>• <strong>Coordonnées :</strong> Adresse email, numéro de téléphone</li>
                    <li>• <strong>Localisation :</strong> Ville d'intervention</li>
                    <li>• <strong>Informations projet :</strong> Type de prestation, description des travaux</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Données collectées automatiquement
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Données de navigation :</strong> Adresse IP, type de navigateur, pages visitées</li>
                    <li>• <strong>Cookies :</strong> Cookies techniques et de mesure d'audience</li>
                    <li>• <strong>Données de connexion :</strong> Date et heure de visite, durée de session</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Finalités du traitement */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Finalités du traitement
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Gestion des demandes de devis</h3>
                  <p className="text-gray-700 text-sm">
                    Traitement de vos demandes de devis, prise de contact et suivi commercial
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Amélioration des services</h3>
                  <p className="text-gray-700 text-sm">
                    Analyse de l'utilisation du site pour améliorer nos services et votre expérience
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Communication marketing</h3>
                  <p className="text-gray-700 text-sm">
                    Envoi d'informations sur nos services (avec votre consentement)
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Obligations légales</h3>
                  <p className="text-gray-700 text-sm">
                    Respect de nos obligations légales et réglementaires
                  </p>
                </div>
              </div>
            </div>

            {/* Base légale */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Base légale du traitement
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Le traitement de vos données personnelles repose sur les bases légales suivantes :
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• <strong>Consentement :</strong> Pour l'envoi de communications marketing</li>
                  <li>• <strong>Intérêt légitime :</strong> Pour la gestion des demandes de devis et l'amélioration de nos services</li>
                  <li>• <strong>Obligation légale :</strong> Pour le respect de nos obligations comptables et fiscales</li>
                </ul>
              </div>
            </div>

            {/* Conservation des données */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Conservation des données
                </h2>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Données de contact et devis</h3>
                    <p className="text-gray-700 text-sm">Conservées 3 ans à compter du dernier contact</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Données de navigation</h3>
                    <p className="text-gray-700 text-sm">Conservées 13 mois maximum (cookies)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Données comptables</h3>
                    <p className="text-gray-700 text-sm">Conservées 10 ans conformément aux obligations légales</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vos droits */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Vos droits sur vos données
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Droit d\'accès',
                    description: 'Obtenir une copie de vos données personnelles'
                  },
                  {
                    title: 'Droit de rectification',
                    description: 'Corriger ou mettre à jour vos données'
                  },
                  {
                    title: 'Droit d\'effacement',
                    description: 'Demander la suppression de vos données'
                  },
                  {
                    title: 'Droit d\'opposition',
                    description: 'Vous opposer au traitement de vos données'
                  },
                  {
                    title: 'Droit à la portabilité',
                    description: 'Récupérer vos données dans un format structuré'
                  },
                  {
                    title: 'Droit de limitation',
                    description: 'Limiter le traitement de vos données'
                  }
                ].map((right, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">{right.title}</h3>
                    <p className="text-gray-700 text-sm">{right.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-3">Comment exercer vos droits ?</h3>
                <p className="text-gray-700 mb-4">
                  Pour exercer vos droits, contactez-nous par email ou téléphone. 
                  Nous vous répondrons dans un délai maximum d'un mois.
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <SecureEmail 
                    className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium"
                    variant="link"
                    showIcon={true}
                  />
                  <SecurePhone 
                    className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium"
                    variant="link"
                    showIcon={true}
                  >
                    06 22 52 39 02
                  </SecurePhone>
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Sécurité de vos données
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  LS COM met en œuvre des mesures techniques et organisationnelles appropriées 
                  pour protéger vos données personnelles contre :
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• L'accès non autorisé</li>
                  <li>• La modification, la divulgation ou la destruction</li>
                  <li>• La perte accidentelle</li>
                  <li>• Les cyberattaques</li>
                </ul>
                <p>
                  Nos mesures de sécurité incluent le chiffrement des données, l'accès restreint 
                  aux données personnelles et la formation de notre personnel.
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Politique des cookies
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation 
                  et analyser l'utilisation du site.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Types de cookies utilisés :</h3>
                  <ul className="space-y-2">
                    <li>• <strong>Cookies techniques :</strong> Nécessaires au fonctionnement du site</li>
                    <li>• <strong>Cookies analytiques :</strong> Mesure d'audience (Google Analytics)</li>
                    <li>• <strong>Cookies de préférence :</strong> Mémorisation de vos choix</li>
                  </ul>
                </div>
                
                <p>
                  Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté 
                  lors de leur dépôt. Cependant, certaines fonctionnalités du site pourraient 
                  être affectées.
                </p>
              </div>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Modifications de la politique
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  Cette politique de confidentialité peut être modifiée pour refléter les changements 
                  dans nos pratiques ou pour des raisons légales. Toute modification sera publiée 
                  sur cette page avec la date de mise à jour.
                </p>
              </div>
            </div>

            {/* Réclamations */}
            <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Réclamations
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Si vous estimez que le traitement de vos données personnelles constitue une 
                  violation de la réglementation, vous avez le droit d'introduire une réclamation 
                  auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés).
                </p>
                
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Contact CNIL :</h3>
                  <p className="text-gray-700 text-sm">
                    Site web : <a href="https://www.cnil.fr" className="text-red-600 hover:text-red-700">www.cnil.fr</a><br />
                    Téléphone : 01 53 73 22 22<br />
                    Adresse : 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Nous contacter
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Pour toute question concernant cette politique de confidentialité ou 
                  le traitement de vos données personnelles :
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">Par email :</p>
                    <SecureEmail 
                      className="text-blue-600 hover:text-blue-700 font-medium"
                      variant="link"
                      showIcon={false}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">Par téléphone :</p>
                    <a href="tel:+33622523902" className="text-blue-600 hover:text-blue-700 font-medium">0622523902</a>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-blue-200">
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center space-x-2 bg-[#b32a29] hover:bg-[#9a2426] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <span>Nous contacter</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Politique de confidentialité mise à jour le : {new Date().toLocaleDateString('fr-FR')}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <Link to="/mentions-legales" className="text-blue-600 hover:text-blue-700">
                  Consulter nos mentions légales
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PolitiqueConfidentialitePage;