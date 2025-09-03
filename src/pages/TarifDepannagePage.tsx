import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, AlertTriangle, CheckCircle, Euro } from 'lucide-react';
import SecurePhone from '../components/SecurePhone';

const TarifDepannagePage: React.FC = () => {
  const zones = [
    {
      name: 'ZONE PROXIMITÉ (0-5km)',
      price: '110€ HT',
      color: 'green',
      bgColor: 'from-green-600 to-green-500',
      cities: [
        { name: 'Magny-les-Hameaux', postal: '78114' },
        { name: 'Chevreuse', postal: '78460' },
        { name: 'Châteaufort', postal: '78117' },
        { name: 'Les Loges-en-Josas', postal: '78350' },
        { name: 'Voisins-le-Bretonneux', postal: '78960' },
        { name: 'Guyancourt', postal: '78280' }
      ]
    },
    {
      name: 'ZONE INTERMÉDIAIRE (5-10km)',
      price: '130€ HT',
      color: 'orange',
      bgColor: 'from-orange-600 to-orange-500',
      cities: [
        { name: 'Montigny-le-Bretonneux', postal: '78180' },
        { name: 'Milon La Chapelle', postal: '78470' },
        { name: 'St Lambert', postal: '78470' },
        { name: 'Le Chesnay', postal: '78150' },
        { name: 'Toussus-le-Noble', postal: '78117' },
        { name: 'Jouy-en-Josas', postal: '78350' },
        { name: 'Buc', postal: '78530' },
        { name: 'Versailles', postal: '78000' },
        { name: 'Viroflay', postal: '78220' },
        { name: 'Dampierre-en-Yvelines', postal: '78720' },
        { name: 'Saclay', postal: '91400' },
        { name: 'Gif-sur-Yvette', postal: '91190' },
        { name: 'Villiers-le-Bâcle', postal: '91190' }
      ]
    },
    {
      name: 'ZONE ÉTENDUE (10-15km)',
      price: '150€ HT',
      priceTTC: '(165€ TTC particuliers)',
      color: 'red',
      bgColor: 'from-red-600 to-red-500',
      cities: [
        { name: 'Plaisir', postal: '78370' },
        { name: 'Trappes', postal: '78190' },
        { name: 'St Cyr l\'École', postal: '78210' },
        { name: 'Élancourt', postal: '78990' },
        { name: 'Bois d\'Arcy', postal: '78390' },
        { name: 'St Aubin', postal: '91190' },
        { name: 'Bailly', postal: '78870' },
        { name: 'Noisy-le-Roi', postal: '78590' },
        { name: 'Rennemoulin', postal: '78590' },
        { name: 'Forges-les-Bains', postal: '91470' },
        { name: 'Limours', postal: '91470' },
        { name: 'Angervilliers', postal: '91470' },
        { name: 'Les Molières', postal: '91470' },
        { name: 'Gometz-la-Ville', postal: '91400' },
        { name: 'Orsay', postal: '91400' },
        { name: 'Bures-sur-Yvette', postal: '91440' },
        { name: 'L\'Étang-la-Ville', postal: '78620' },
        { name: 'St Nom-la-Bretèche', postal: '78860' },
        { name: 'Bonnelles', postal: '78830' },
        { name: 'Bullion', postal: '78830' },
        { name: 'Mareil-le-Roi', postal: '78160' },
        { name: 'Mareil-sur-Mauldre', postal: '78430' },
        { name: 'St Jean-de-Beauregard', postal: '91940' },
        { name: 'Gometz-le-Châtel', postal: '91940' },
        { name: 'Les Ulis', postal: '91940' },
        { name: 'Coignières', postal: '78310' },
        { name: 'Maurepas', postal: '78310' },
        { name: 'St Forget', postal: '78720' },
        { name: 'Senlisse', postal: '78720' },
        { name: 'La Celle-les-Bordes', postal: '78720' },
        { name: 'Les Essarts-le-Roi', postal: '78690' },
        { name: 'Pecqueuse', postal: '91470' },
        { name: 'La Celle Saint-Cloud', postal: '78170' }
      ]
    }
  ];

  const getZoneIcon = (color: string) => {
    switch (color) {
      case 'green': return '🟢';
      case 'orange': return '🟡';
      case 'red': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Euro className="h-12 w-12 text-blue-300" />
            <h1 className="text-4xl lg:text-5xl font-bold">
              Tarifs de Dépannage Électricien
            </h1>
          </div>
          <p className="text-xl text-blue-100 mb-4">
            Tarification transparente selon la distance depuis Magny-les-Hameaux
          </p>
          <div className="bg-blue-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-blue-600 inline-block">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-300" />
              <span className="text-blue-100">Zone de référence : Magny-les-Hameaux (78114)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grille Tarifaire */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Légende */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="h-6 w-6 text-blue-600 mr-3" />
              Grille Tarifaire par Zone
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">🟢</span>
                  <span className="font-bold text-green-800">0-5km</span>
                </div>
                <p className="text-2xl font-bold text-green-600">110€ HT</p>
                <p className="text-sm text-green-700">Zone proximité</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">🟡</span>
                  <span className="font-bold text-orange-800">5-10km</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">130€ HT</p>
                <p className="text-sm text-orange-700">Zone intermédiaire</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">🔴</span>
                  <span className="font-bold text-red-800">10-15km</span>
                </div>
                <p className="text-2xl font-bold text-red-600">150€ HT</p>
                <p className="text-sm text-red-700">Zone étendue</p>
              </div>
            </div>
          </div>

          {/* Zones de tarification */}
          {zones.map((zone, zoneIndex) => (
            <div key={zoneIndex} className="mb-12">
              <div className={`bg-gradient-to-r ${zone.bgColor} text-white p-6 rounded-t-2xl`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center">
                    <span className="text-2xl mr-3">{getZoneIcon(zone.color)}</span>
                    {zone.name}
                  </h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{zone.price}</p>
                    {zone.priceTTC && (
                      <p className="text-sm opacity-90">{zone.priceTTC}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Ville</th>
                        <th className="px-6 py-4 text-left font-semibold">Code Postal</th>
                        <th className="px-6 py-4 text-left font-semibold">Tarif HT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {zone.cities.map((city, cityIndex) => (
                        <tr 
                          key={cityIndex} 
                          className={`${cityIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                        >
                          <td className="px-6 py-4 font-semibold text-gray-900">{city.name}</td>
                          <td className="px-6 py-4 text-gray-600">{city.postal}</td>
                          <td className="px-6 py-4 font-bold text-blue-600">{zone.price.split(' ')[0]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}

          {/* Notes importantes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <h3 className="text-2xl font-bold text-gray-900">Notes importantes</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">TVA à 20% pour les professionnels et logements neufs</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">TVA à 10% pour les particuliers (logements de plus de 2 ans)</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Frais de déplacement inclus dans le tarif</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Devis gratuit sur demande</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Intervention sous 2h en zone de proximité</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Euro className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Paiement par chèque, espèces ou virement accepté</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Diagnostic et réparation inclus dans le forfait 1h</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-900 text-white p-8 rounded-2xl mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Besoin d'un dépannage électrique ?</h3>
            <p className="text-blue-100 mb-6">
              Contactez-nous pour une intervention rapide avec tarif transparent selon votre zone
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <SecurePhone 
                className="bg-[#b32a29] hover:bg-[#9a2426] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center space-x-2"
                variant="button"
                showIcon={true}
              >
                06 22 52 39 02
              </SecurePhone>
              
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Demander un devis gratuit
              </Link>
            </div>
            
            <p className="text-blue-200 text-sm mt-4">
              SIRET: 52445239800026 • Électricien certifié et assuré
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TarifDepannagePage;