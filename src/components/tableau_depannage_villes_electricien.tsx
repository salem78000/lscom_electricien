import React, { useState } from 'react';
import { Search } from 'lucide-react';

const TableauVillesElectricien = () => {
  // Toutes les données corrigées manuellement
  const donnees = [
    { nom: "Angervilliers", codePostal: "91470", departement: "Essonne", population: 2200, distance: 15, prixHT: 150, zone: "Zone étendue" },
    { nom: "Bailly", codePostal: "78870", departement: "Yvelines", population: 4200, distance: 12, prixHT: 150, zone: "Zone étendue" },
    { nom: "Bois d'Arcy", codePostal: "78390", departement: "Yvelines", population: 13500, distance: 13, prixHT: 150, zone: "Zone étendue" },
    { nom: "Bonnelles", codePostal: "78830", departement: "Yvelines", population: 1800, distance: 13, prixHT: 150, zone: "Zone étendue" },
    { nom: "Buc", codePostal: "78530", departement: "Yvelines", population: 6000, distance: 8, prixHT: 130, zone: "Zone intermédiaire" },
    { nom: "Bullion", codePostal: "78830", departement: "Yvelines", population: 2100, distance: 14, prixHT: 150, zone: "Zone étendue" },
    { nom: "Bures-sur-Yvette", codePostal: "91440", departement: "Essonne", population: 10500, distance: 12, prixHT: 150, zone: "Zone étendue" },
    { nom: "Châteaufort", codePostal: "78117", departement: "Yvelines", population: 1400, distance: 4, prixHT: 110, zone: "Zone proximité" },
    { nom: "Chaveney", codePostal: "78450", departement: "Yvelines", population: 1800, distance: 6, prixHT: 130, zone: "Zone intermédiaire" },
    { nom: "Chevreuse", codePostal: "78460", departement: "Yvelines", population: 5500, distance: 3, prixHT: 110, zone: "Zone proximité" },
    { nom: "Choisy", codePostal: "78460", departement: "Yvelines", population: 3500, distance: 7, prixHT: 130, zone: "Zone intermédiaire" },
    { nom: "Coignières", codePostal: "78310", departement: "Yvelines", population: 4500, distance: 14, prixHT: 150, zone: "Zone étendue" },
    { nom: "Dampierre-en-Yvelines", codePostal: "78720", departement: "Yvelines", population: 1100, distance: 9, prixHT: 130, zone: "Zone intermédiaire" },
    { nom: "Élancourt", codePostal: "78990", departement: "Yvelines", population: 26000, distance: 8, prixHT: 130, zone: "Zone intermédiaire" },
    { nom: "Forges-les-Bains", codePostal: "91470", departement: "Essonne", population: 3800, distance: 14, prixHT: 150, zone: "Zone étendue" },
    { nom: "Gif-sur-Yvette", codePostal: "91190", departement: "Essonne", population: 21000, distance: 9, prixHT: 130, zone: "Zone intermédiaire" },
    { nom: "Gometz-la-Ville", codePostal: "91400", departement: "Essonne", population: 1200, distance: 11, prixHT: 150, zone: "Zone étendue" },
    { nom: "Gometz-le-Châtel", codePostal: "91940", departement: "Essonne", population: 2400, distance: 13, prixHT: 150, zone: "Zone étendue" },
    { nom: "Guyancourt", codePostal: "78280", departement: "Yvelines", population: 29000, distance: 5, prixHT: 110, zone: "Zone proximité" },
    { nom: "Jouy-en-Josas", codePostal: "78350", departement: "Yvelines", population: 8100, distance: 8, prixHT: 130, zone: "Zone intermédiaire" },
    { nom: "La Celle-les-Bordes", codePostal: "78720", departement: "Yvelines", population: 600, distance: 14, prixHT: 150, zone: "Zone étendue" },
    { nom: "La Celle-Saint-Cloud", codePostal: "78170", departement: "Yvelines", population: 21000, distance: 15, prixHT: 150, zone: "Zone étendue" },
    { nom: "L'Étang-la-Ville", codePostal: "78620", departement: "Yvelines", population: 4500, distance: 13, prixHT: 150, zone: "Zone étendue" },
    { nom: "Le Chesnay", codePostal: "78150", departement: "Yvelines", population: 29000, distance: 5, prixHT: 110, zone: "Zone proximité" },
    { nom: "Les Clayes-sous-Bois", codePostal: "78340", departement: "Yvelines", population: 17500, distance: 15, prixHT: 150, zone: "Zone étendue" },
    { nom: "Les Essarts-le-Roi", codePostal: "78690", departement: "Yvelines", population: 7000, distance: 15, prixHT: 150, zone: "Zone étendue" },
    { nom: "Les Loges-en-Josas", codePostal: "78350", departement: "Yvelines", population: 1400, distance: 5, prixHT: 110, zone: "Zone proximité" },
    { nom: "Les Molières", codePostal: "91470", departement: "Essonne", population: 1900, distance: 12, prixHT: 150, zone: "Zone étendue" },
    { nom: "Les Ulis", codePostal: "91940", departement: "Essonne", population: 25000, distance: 15, prixHT: 150, zone: "Zone étendue" },
    { nom: "Lévis-Saint-Nom", codePostal: "78320", departement: "Yvelines", population: 1100, distance: 14, prixHT: 150, zone: "Zone étendue" },
    { nom: "Limours", codePostal: "91470", departement: "Essonne", population: 6700, distance: 13, prixHT: 150, zone: "Zone étendue" },
    { nom: "Magny-les-Hameaux", codePostal: "78114", departement: "Yvelines", population: 9500, distance: 0, prixHT: 110, zone: "Zone proximité" },
    { nom: "Maurepas", codePostal: "78310", departement: "Yvelines", population: 19500, distance: 13, prixHT: 150, zone: "Zone étendue" },
    { nom: "Milon-la-Chapelle", codePostal: "78470", departement: "Yvelines", population: 1200, distance: 4, prixHT: 110, zone: "Zone proximité" },
    { nom: "Montigny-le-Bretonneux", codePostal: "78180", departement: "Yvelines", population: 34000, distance: 6, prixHT: 130, zone: "Zone intermédiaire" },
    { nom: "Noisy-le-Roi", codePostal: "78590", departement: "Yvelines", population: 8500, distance: 13, prixHT: 150, zone: "Zone étendue" },
    { nom: "Orsay", codePostal: "91400", departement: "Essonne", population: 16000, distance: 12, prixHT: 150, zone: "Zone étendue" },
    { nom: "Pecqueuse", codePostal: "91470", departement: "Essonne", population: 600, distance: 14, prixHT: 150, zone: "Zone étendue" },
    { nom: "Plaisir", codePostal: "78370", departement: "Yvelines", population: 31000, distance: 15, prixHT: 150, zone: "Zone étendue" },
    { nom: "Rennemoulin", codePostal: "78590", departement: "Yvelines", population: 900, distance: 14, prixHT: 150, zone: "Zone étendue" },
    { nom: "Saclay", codePostal: "91400", departement: "Essonne", population: 4000, distance: 8, prixHT: 130, zone: "Zone intermédiaire" },
    { nom: "Saint-Aubin", codePostal: "91190", departement: "Essonne", population: 2800, distance: 12, prixHT: 150, zone: "Zone étendue" },
    { nom: "Saint-Forget", codePostal: "78720", departement: "Yvelines", population: 450, distance: 13, prixHT: 150, zone: "Zone étendue" },
    { nom: "Saint-Jean-de-Beauregard", codePostal: "91940", departement: "Essonne", population: 1100, distance: 14, prixHT: 150, zone: "Zone étendue" },
    { nom: "Saint-Lambert", codePostal: "78470", departement: "Yvelines", population: 800, distance: 4, prixHT: 110, zone: "Zone proximité" },
    { nom: "Saint-Nom-la-Bretèche", codePostal: "78860", departement: "Yvelines", population: 4877, distance: 14, prixHT: 150, zone: "Zone étendue" },
    { nom: "Senlisse", codePostal: "78720", departement: "Yvelines", population: 800, distance: 12, prixHT: 150, zone: "Zone étendue" },
    { nom: "Toussus-le-Noble", codePostal: "78117", departement: "Yvelines", population: 1200, distance: 4, prixHT: 110, zone: "Zone proximité" },
    { nom: "Trappes", codePostal: "78190", departement: "Yvelines", population: 31000, distance: 12, prixHT: 150, zone: "Zone étendue" },
    { nom: "Versailles", codePostal: "78000", departement: "Yvelines", population: 85000, distance: 10, prixHT: 130, zone: "Zone intermédiaire" },
    { nom: "Villiers-le-Bâcle", codePostal: "91190", departement: "Essonne", population: 750, distance: 10, prixHT: 130, zone: "Zone intermédiaire" },
    { nom: "Viroflay", codePostal: "78220", departement: "Yvelines", population: 15500, distance: 9, prixHT: 130, zone: "Zone intermédiaire" },
    { nom: "Voisins-le-Bretonneux", codePostal: "78960", departement: "Yvelines", population: 13500, distance: 3, prixHT: 110, zone: "Zone proximité" }
  ];

  const [recherche, setRecherche] = useState('');

  // Filtrer et trier les données par nom de ville A-Z
  const donneesAffichees = donnees
    .filter(ville => {
      if (!recherche) return true;
      const rechercheMin = recherche.toLowerCase();
      return ville.nom.toLowerCase().includes(rechercheMin) ||
             ville.codePostal.includes(rechercheMin) ||
             ville.departement.toLowerCase().includes(rechercheMin);
    })
    .sort((a, b) => a.nom.toLowerCase().localeCompare(b.nom.toLowerCase()));

  const getClasseZone = (zone) => {
    if (zone.includes('proximité')) return 'bg-green-100 text-green-800';
    if (zone.includes('intermédiaire')) return 'bg-yellow-100 text-yellow-800';
    if (zone.includes('étendue')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Villes d'Intervention - LS COM Électricien</h1>
        <p className="text-gray-600">
          {donnees.length} villes couvertes • Magny-les-Hameaux et environs
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une ville, code postal..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="pl-9 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {recherche && (
          <p className="text-sm text-gray-500 mt-1">
            {donneesAffichees.length} résultat(s) sur {donnees.length}
          </p>
        )}
      </div>

      {/* Tableau */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ville
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Code Postal
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Département
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Population
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Distance (km)
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Prix HT
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Zone
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donneesAffichees.map((ville, index) => (
                <tr key={`${ville.nom}-${ville.codePostal}-${ville.distance}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {ville.nom}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {ville.codePostal}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {ville.departement}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right">
                    {ville.population.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right">
                    {ville.distance}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                    {ville.prixHT}€
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getClasseZone(ville.zone)}`}>
                      {ville.zone}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {donneesAffichees.length === 0 && recherche && (
        <div className="text-center py-8">
          <p className="text-gray-500">Aucune ville trouvée pour "{recherche}"</p>
        </div>
      )}

      {/* Résumé */}
      <div className="mt-4 text-sm text-gray-500 space-y-1">
        <div>
          • <span className="inline-block w-3 h-3 bg-green-100 rounded mr-2"></span>
          Zone proximité : 110€ HT
        </div>
        <div>
          • <span className="inline-block w-3 h-3 bg-yellow-100 rounded mr-2"></span>
          Zone intermédiaire : 130€ HT  
        </div>
        <div>
          • <span className="inline-block w-3 h-3 bg-red-100 rounded mr-2"></span>
          Zone étendue : 150€ HT
        </div>
      </div>
    </div>
  );
};

export default TableauVillesElectricien;