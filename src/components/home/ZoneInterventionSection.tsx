import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';
import SecurePhone from '../SecurePhone';

const ZoneInterventionSection: React.FC = () => {
  const cities = [
    { name: 'Magny les hameaux', slug: 'magny-les-hameaux' },
    { name: 'Voisins le bretonneux', slug: 'voisins-le-bretonneux' },
    { name: 'Milon la chapelle', slug: 'milon-la-chapelle' },
    { name: 'St lambert', slug: 'st-lambert' },
    { name: 'Chevreuse', slug: 'chevreuse' },
    { name: 'Guyancourt', slug: 'guyancourt' },
    { name: 'Montigny le bretonneux', slug: 'montigny-le-bretonneux' },
    { name: 'Trappes', slug: 'trappes' },
    { name: 'Elancourt', slug: 'elancourt' },
    { name: 'Choisel', slug: 'choisel' },
    { name: 'Châteaufort', slug: 'chateaufort' },
    { name: 'Toussus le noble', slug: 'toussus-le-noble' },
    { name: 'St cyr l ecole', slug: 'st-cyr-l-ecole' },
    { name: 'Bois d arcy', slug: 'bois-d-arcy' },
    { name: 'Fontenay le fleury', slug: 'fontenay-le-fleury' },
    { name: 'Buc', slug: 'buc' },
    { name: 'St aubin', slug: 'st-aubin' },
    { name: 'Gif sur yvette', slug: 'gif-sur-yvette' },
    { name: 'Villiers le bacle', slug: 'villiers-le-bacle' },
    { name: 'Versailles', slug: 'versailles' },
    { name: 'Bailly', slug: 'bailly' },
    { name: 'La verriere', slug: 'la-verriere' },
    { name: 'Levis st nom', slug: 'levis-st-nom' },
    { name: 'Le mesnil st denis', slug: 'le-mesnil-st-denis' },
    { name: 'Noisy le roi', slug: 'noisy-le-roi' },
    { name: 'Rennemoulin', slug: 'rennemoulin' },
    { name: 'Les clayes sous bois', slug: 'les-clayes-sous-bois' },
    { name: 'Forges les bains', slug: 'forges-les-bains' },
    { name: 'Limours', slug: 'limours' },
    { name: 'Angervilliers', slug: 'angervilliers' },
    { name: 'Les molieres', slug: 'les-molieres' },
    { name: 'Gometz le chatel', slug: 'gometz-le-chatel' },
    { name: 'Pecqueuse', slug: 'pecqueuse' },
    { name: 'Saclay', slug: 'saclay' },
    { name: 'Orsay', slug: 'orsay' },
    { name: 'Gometz la ville', slug: 'gometz-la-ville' },
    { name: 'Chavenay', slug: 'chavenay' },
    { name: 'Jouy en josas', slug: 'jouy-en-josas' },
    { name: 'Les loges en josas', slug: 'les-loges-en-josas' },
    { name: 'Le chesnay', slug: 'le-chesnay' },
    { name: 'Rocquencourt', slug: 'rocquencourt' },
    { name: 'Dampierre en yvelines', slug: 'dampierre-en-yvelines' },
    { name: 'La celle les bordes', slug: 'la-celle-les-bordes' },
    { name: 'Les essarts le roi', slug: 'les-essarts-le-roi' },
    { name: 'St forget', slug: 'st-forget' },
    { name: 'Senlisse', slug: 'senlisse' },
    { name: 'Dures sur yvette', slug: 'dures-sur-yvette' },
    { name: 'L etang la ville', slug: 'l-etang-la-ville' },
    { name: 'St nom la breteche', slug: 'st-nom-la-breteche' },
    { name: 'Plaisir', slug: 'plaisir' },
    { name: 'Bonnelles', slug: 'bonnelles' },
    { name: 'Bullion', slug: 'bullion' },
    { name: 'Mareil le roi', slug: 'mareil-le-roi' },
    { name: 'St jean de beauregard', slug: 'st-jean-de-beauregard' },
    { name: 'Coignieres', slug: 'coignieres' },
    { name: 'Maurepas', slug: 'maurepas' },
    { name: 'Viroflay', slug: 'viroflay' },
    { name: 'La celle st cloud', slug: 'la-celle-st-cloud' }
  ];

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
                  onClick={() => {
                    console.log('Clicking on city:', city.name, 'slug:', city.slug);
                    // Scroll vers le haut sera géré par le composant CityTemplate
                  }}
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
                <span className="font-medium text-blue-400">60+ villes</span> couvertes en Île-de-France
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