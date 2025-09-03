import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';
import SecurePhone from '../SecurePhone';
import { cityData } from '../../data/cities';

const ZoneInterventionSection: React.FC = () => {
  // Récupérer les villes depuis les données avec fallback
  const getCitiesFromData = () => {
    try {
      // Combiner les données du localStorage et les données statiques
      const stored = localStorage.getItem('admin_cities');
      const localStorageCities = stored ? JSON.parse(stored) : [];
      const storedCities = Array.isArray(localStorageCities) ? localStorageCities : [];
      const staticCities = Array.isArray(cityData) ? cityData : [];
      const allCities = [...storedCities, ...staticCities];
      
      // Éviter les doublons en utilisant le slug comme clé unique
      const uniqueCities = allCities.reduce((acc, city) => {
        if (!acc.find(c => c.slug === city.slug)) {
          acc.push(city);
        }
        return acc;
      }, []);
      
      // Filtrer les villes actives et prendre les 60 premières
      return uniqueCities
        .filter(city => city.status === 'active')
        .slice(0, 60)
        .map(city => ({
          name: city.name,
          slug: city.slug
        }));
    } catch (error) {
      console.error('Error loading cities:', error);
      // Fallback avec villes principales
      return [
        { name: 'Magny-les-Hameaux', slug: 'magny-les-hameaux' },
        { name: 'Versailles', slug: 'versailles' },
        { name: 'Voisins-le-Bretonneux', slug: 'voisins-le-bretonneux' },
        { name: 'Guyancourt', slug: 'guyancourt' },
        { name: 'Montigny-le-Bretonneux', slug: 'montigny-le-bretonneux' },
        { name: 'Trappes', slug: 'trappes' },
        { name: 'Plaisir', slug: 'plaisir' },
        { name: 'Le Chesnay', slug: 'le-chesnay' },
        { name: 'Élancourt', slug: 'elancourt' },
        { name: 'Buc', slug: 'buc' },
        { name: 'Gif-sur-Yvette', slug: 'gif-sur-yvette' },
        { name: 'Saclay', slug: 'saclay' },
        { name: 'Viroflay', slug: 'viroflay' },
        { name: 'Bois d\'Arcy', slug: 'bois-d-arcy' },
        { name: 'Maurepas', slug: 'maurepas' },
        { name: 'Coignières', slug: 'coignieres' },
        { name: 'Les Clayes-sous-bois', slug: 'les-clayes-sous-bois' },
        { name: 'Orsay', slug: 'orsay' },
        { name: 'Saint-Lambert', slug: 'saint-lambert' },
        { name: 'Milon La Chapelle', slug: 'milon-la-chapelle' },
        { name: 'Choisy', slug: 'choisy' },
        { name: 'Toussus-le-Noble', slug: 'toussus-le-noble' },
        { name: 'Saint-Aubin', slug: 'saint-aubin' },
        { name: 'Villiers-le-Bâcle', slug: 'villiers-le-bacle' },
        { name: 'Bailly', slug: 'bailly' },
        { name: 'Noisy-le-Roi', slug: 'noisy-le-roi' },
        { name: 'Rennemoulin', slug: 'rennemoulin' },
        { name: 'Forges-les-Bains', slug: 'forges-les-bains' },
        { name: 'Limours', slug: 'limours' },
        { name: 'Angervilliers', slug: 'angervilliers' },
        { name: 'Les Molières', slug: 'les-molieres' },
        { name: 'Gometz-la-Ville', slug: 'gometz-la-ville' },
        { name: 'Bures-sur-Yvette', slug: 'bures-sur-yvette' },
        { name: 'L\'Étang-la-Ville', slug: 'l-etang-la-ville' }
      ];
    }
  };

  const cities = getCitiesFromData();

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-8 w-8 text-blue-400" />
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Zone d intervention
                </h2>
              </div>
              
              <p className="text-xl text-gray-300">
                LS COM intervient dans toute l Ile-de-France, avec une expertise 
                particulière dans les Yvelines et les communes limitrophes.
              </p>
            </div>

            {/* Service Features */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Intervention rapide</h3>
                  <p className="text-gray-300">Deplacement sous 2h en urgence dans toute notre zone</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Service de dépannage</h3>
                  <p className="text-gray-300">Depannage electrique a partir de 110€ HT selon zone</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Connaissance locale</h3>
                  <p className="text-gray-300">Plus de 15 ans d experience sur le territoire francilien</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-blue-800 p-6 rounded-lg border border-blue-700">
              <h3 className="text-lg font-semibold mb-3">Votre ville n apparait pas ?</h3>
              <p className="text-gray-300 mb-4">
                Contactez-nous pour verifier si nous intervenons dans votre secteur. 
                Notre zone d intervention s etend regulierement.
              </p>
              <SecurePhone 
                className="inline-flex items-center space-x-2 bg-[#b32a29] hover:bg-[#9a2426] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                variant="button"
                className="inline-block bg-[#b32a29] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#9a2426] transition-colors"
              >
                06 22 52 39 02
              </SecurePhone>
            </div>
          </div>

          {/* Cities Grid */}
          <div className="bg-gray-800 p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-6 text-center">Principales villes desservies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cities.map((city, index) => (
                <Link
                  key={index} 
                  to={`/electricien/${city.slug}`}
                  className="bg-gray-700 hover:bg-blue-600 px-3 py-2 rounded-lg text-center transition-colors cursor-pointer group block"
                >
                  <span className="text-sm font-medium group-hover:text-white transition-colors">
                    {city.name}
                  </span>
                </Link>
              ))}
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-center text-gray-400 text-sm">
                <span className="font-medium text-blue-400">{cities.length}+ villes</span> couvertes en Île-de-France
                <br />
                <span className="text-xs">Et de nombreuses autres communes</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZoneInterventionSection;