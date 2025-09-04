import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Mail, MapPin, FileText, Shield } from 'lucide-react';
import SecurePhone from '../../components/SecurePhone';
import SecureEmail from '../../components/SecureEmail';

const MentionsLegalesPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <FileText className="h-12 w-12 text-blue-300" />
            <h1 className="text-4xl lg:text-5xl font-bold">
              Mentions légales
            </h1>
          </div>
          <p className="text-xl text-blue-100">
            Informations légales et réglementaires de LS COM Électricien
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Identification de l'entreprise */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <Building className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Identification de l'entreprise
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Dénomination sociale</h3>
                    <p className="text-gray-700">LS COM</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Forme juridique</h3>
                    <p className="text-gray-700">SARL</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">SIRET</h3>
                    <p className="text-gray-700">52445239800026</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Activité</h3>
                    <p className="text-gray-700">Travaux d'installation électrique</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Adresse du siège social</h3>
                      <p className="text-gray-700">
                        36 allée des érables<br />
                        78114 Magny-les-Hameaux<br />
                        France
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Adresse du bureau</h3>
                      <p className="text-gray-700">
                        24 Avenue de Chevincourt<br />
                        78114 Magny-les-Hameaux<br />
                        France
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 text-blue-600 flex-shrink-0 flex items-center justify-center">
                      📞
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Téléphone</h3>
                      <p className="text-blue-600 font-medium">0622523902</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                      <a href="mailto:contact@lscom.fr" className="text-blue-600 hover:text-blue-700 font-medium">
                        contact@lscom.fr
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Directeur de publication */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Directeur de publication
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  Le directeur de la publication du site web est le représentant légal de l'entreprise LS COM.
                </p>
              </div>
            </div>

            {/* Hébergement */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Hébergement du site
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Ce site est hébergé par un prestataire technique professionnel garantissant 
                  la sécurité et la disponibilité des données.
                </p>
                <p className="text-sm text-gray-600">
                  Les informations détaillées de l'hébergeur sont disponibles sur demande.
                </p>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Propriété intellectuelle
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  L'ensemble de ce site relève de la législation française et internationale 
                  sur le droit d'auteur et la propriété intellectuelle.
                </p>
                <p>
                  Tous les droits de reproduction sont réservés, y compris pour les documents 
                  téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p>
                  La reproduction de tout ou partie de ce site sur un support électronique 
                  quel qu'il soit est formellement interdite sauf autorisation expresse du 
                  directeur de la publication.
                </p>
              </div>
            </div>

            {/* Responsabilité */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Limitation de responsabilité
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Les informations contenues sur ce site sont aussi précises que possible et 
                  le site est périodiquement remis à jour, mais peut toutefois contenir des 
                  inexactitudes, des omissions ou des lacunes.
                </p>
                <p>
                  Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                  merci de bien vouloir le signaler par email en décrivant le problème de la 
                  manière la plus précise possible.
                </p>
                <p>
                  LS COM ne pourra en aucune circonstance être tenu responsable de tout dommage 
                  de quelque nature qu'il soit résultant de l'interprétation ou de l'utilisation 
                  des informations et/ou documents disponibles sur ce site.
                </p>
              </div>
            </div>

            {/* Liens hypertextes */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Liens hypertextes
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Les sites internet peuvent proposer des liens vers d'autres sites internet 
                  ou d'autres ressources disponibles sur Internet. LS COM ne dispose d'aucun 
                  moyen pour contrôler les sites en connexion avec ses sites internet.
                </p>
                <p>
                  LS COM ne répond pas de la disponibilité de tels sites et sources externes, 
                  ni ne la garantit. Elle ne peut être tenue pour responsable de tout dommage, 
                  de quelque nature que ce soit, résultant du contenu de ces sites ou sources 
                  externes, et notamment des informations, produits ou services qu'ils proposent, 
                  ou de tout usage qui peut être fait de ces éléments.
                </p>
              </div>
            </div>

            {/* Droit applicable */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Droit applicable et juridiction compétente
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  Tout litige en relation avec l'utilisation du site est soumis au droit français. 
                  Il est fait attribution exclusive de juridiction aux tribunaux compétents de Versailles.
                </p>
              </div>
            </div>

            {/* Contact et réclamations */}
            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-200">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-8 w-8 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Contact et réclamations
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Pour toute question relative aux présentes mentions légales ou pour signaler 
                  un problème sur le site, vous pouvez nous contacter :
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">Par téléphone :</p>
                    <p className="text-orange-600 font-medium">0622523902</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">Par email :</p>
                    <SecureEmail 
                      className="text-blue-600 hover:text-blue-700 font-medium"
                      variant="link"
                      showIcon={false}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-orange-200">
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center space-x-2 bg-[#b32a29] hover:bg-[#9a2426] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <span>Nous contacter</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Date de mise à jour */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Mentions légales mises à jour le : {new Date().toLocaleDateString('fr-FR')}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <Link to="/politique-confidentialite" className="text-blue-600 hover:text-blue-700">
                  Consulter notre politique de confidentialité
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentionsLegalesPage;