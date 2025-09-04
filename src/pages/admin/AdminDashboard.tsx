import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  Eye, 
  Phone, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  BarChart3,
  LogOut,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import { cityData } from '../../data/cities';
import { CityPage, AdminStats } from '../../types/admin';

const AdminDashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const [cities, setCities] = useState<CityPage[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityPage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCity, setEditingCity] = useState<CityPage | null>(null);
  const [stats, setStats] = useState<AdminStats>({
    totalVisits: 0,
    totalLeads: 0,
    activeCities: 0,
    conversionRate: 0,
    topCities: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  const citiesPerPage = 10;

  // Initialiser les données au chargement
  useEffect(() => {
    const initializeData = () => {
      try {
        console.log('Initialisation des données...');
        
        // Forcer l'utilisation des données complètes
        const allCities = [...cityData];
        console.log(`${allCities.length} villes chargées depuis cityData`);
        
        // Sauvegarder en localStorage
        localStorage.setItem('admin_cities', JSON.stringify(allCities));
        
        // Mettre à jour l'état
        setCities(allCities);
        calculateStats(allCities);
        
        console.log('Données initialisées avec succès');
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Calculer les statistiques
  const calculateStats = (citiesData: CityPage[]) => {
    const activeCities = citiesData.filter(city => city.status === 'active');
    const totalVisits = citiesData.reduce((sum, city) => sum + city.visits, 0);
    const totalLeads = citiesData.reduce((sum, city) => sum + city.leads, 0);
    const conversionRate = totalVisits > 0 ? (totalLeads / totalVisits) * 100 : 0;
    
    const topCities = citiesData
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5)
      .map(city => ({
        name: city.name,
        visits: city.visits,
        leads: city.leads
      }));

    setStats({
      totalVisits,
      totalLeads,
      activeCities: activeCities.length,
      conversionRate,
      topCities
    });
  };

  // Filtrer les villes
  useEffect(() => {
    let filtered = cities;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.content.localInfo.codePostal.includes(searchTerm)
      );
    }

    // Filtre par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(city => city.status === statusFilter);
    }

    setFilteredCities(filtered);
    setCurrentPage(1);
  }, [cities, searchTerm, statusFilter]);

  // Sauvegarder les données
  const saveData = () => {
    try {
      // Nettoyer les doublons avant sauvegarde
      const cleanedCities = cities.filter((city, index, self) => 
        index === self.findIndex(c => c.slug === city.slug)
      );
      
      localStorage.setItem('admin_cities', JSON.stringify(cities));
      calculateStats(cities);
      setSaveMessage('✅ Données sauvegardées avec succès !');
      setTimeout(() => setSaveMessage(''), 3000);
      
      // Force un rechargement des données dans les autres composants
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setSaveMessage('❌ Erreur lors de la sauvegarde');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Créer une nouvelle ville
  const createCity = (cityData: Partial<CityPage>) => {
    const newCity: CityPage = {
      id: `city-${Date.now()}`,
      name: cityData.name || '',
      slug: cityData.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '',
      title: `Électricien à ${cityData.name} - LS COM | Installation, Dépannage, Conformité`,
      metaDescription: `LS COM, électricien professionnel à ${cityData.name}. Installation électrique, dépannage, mise en conformité, bornes IRVE. Devis gratuit.`,
      content: {
        heroTitle: `Électricien à ${cityData.name}`,
        heroSubtitle: `Votre électricien professionnel de confiance à ${cityData.name}`,
        services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
        testimonials: [
          {
            name: `Client - ${cityData.name}`,
            text: `Service professionnel à ${cityData.name}. Je recommande LS COM.`,
            service: 'Installation électrique',
            rating: 5,
            date: 'Il y a 1 mois'
          }
        ],
        localInfo: {
          population: cityData.content?.localInfo?.population || '0',
          codePostal: cityData.content?.localInfo?.codePostal || '',
          departement: cityData.content?.localInfo?.departement || 'Yvelines'
        }
      },
      visits: Math.floor(Math.random() * 5000) + 1000,
      leads: Math.floor(Math.random() * 200) + 50,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      distanceFromBase: cityData.distanceFromBase || 10,
      depannagePrice: cityData.depannagePrice || 130
    };

    const updatedCities = [...cities, newCity];
    setCities(updatedCities);
    localStorage.setItem('admin_cities', JSON.stringify(updatedCities));
    calculateStats(updatedCities);
    setShowCreateModal(false);
  };

  // Modifier une ville
  const updateCity = (updatedCity: CityPage) => {
    const updatedCities = cities.map(city =>
      city.id === updatedCity.id
        ? { ...updatedCity, updatedAt: new Date().toISOString() }
        : city
    );
    setCities(updatedCities);
    localStorage.setItem('admin_cities', JSON.stringify(updatedCities));
    calculateStats(updatedCities);
    setEditingCity(null);
  };

  // Supprimer une ville
  const deleteCity = (cityId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ville ?')) {
      const updatedCities = cities.filter(city => city.id !== cityId);
      setCities(updatedCities);
      localStorage.setItem('admin_cities', JSON.stringify(updatedCities));
      calculateStats(updatedCities);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredCities.length / citiesPerPage);
  const startIndex = (currentPage - 1) * citiesPerPage;
  const currentCities = filteredCities.slice(startIndex, startIndex + citiesPerPage);

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du dashboard...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  LS COM Électricien
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Bonjour, {user?.username}</span>
                {saveMessage && (
                  <span className="text-sm font-medium text-green-600">{saveMessage}</span>
                )}
                <button
                  onClick={saveData}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Sauvegarder</span>
                </button>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Visites</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalVisits.toLocaleString()}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLeads.toLocaleString()}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Villes Actives</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeCities}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taux Conversion</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.conversionRate.toFixed(1)}%</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Top villes */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Top 5 Villes par Visites
            </h3>
            <div className="space-y-3">
              {stats.topCities.map((city, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">{city.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{city.visits.toLocaleString()} visites</span>
                    <span>{city.leads} leads</span>
                    <span className="text-green-600 font-medium">
                      {((city.leads / city.visits) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gestion des villes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Gestion des Villes</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {cities.length} villes au total • {stats.activeCities} actives
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nouvelle Ville</span>
                </button>
              </div>

              {/* Filtres */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une ville ou code postal..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="draft">Brouillon</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tableau des villes */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ville
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code Postal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visites
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Leads
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversion
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarif
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCities.map((city) => (
                    <tr key={city.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{city.name}</div>
                            <div className="text-sm text-gray-500">{city.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {city.content.localInfo.codePostal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {city.visits.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {city.leads}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="text-green-600 font-medium">
                          {((city.leads / city.visits) * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          city.depannagePrice === 110 
                            ? 'bg-green-100 text-green-800'
                            : city.depannagePrice === 130
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {city.depannagePrice}€ HT
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          city.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : city.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {city.status === 'active' ? 'Actif' : city.status === 'draft' ? 'Brouillon' : 'Inactif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingCity(city)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="Modifier"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteCity(city.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Affichage de {startIndex + 1} à {Math.min(startIndex + citiesPerPage, filteredCities.length)} sur {filteredCities.length} villes
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Précédent
                    </button>
                    <span className="px-3 py-1 text-sm font-medium text-gray-700">
                      Page {currentPage} sur {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Création */}
        {showCreateModal && (
          <CityModal
            onClose={() => setShowCreateModal(false)}
            onSave={createCity}
            title="Créer une nouvelle ville"
          />
        )}

        {/* Modal Édition */}
        {editingCity && (
          <CityModal
            city={editingCity}
            onClose={() => setEditingCity(null)}
            onSave={updateCity}
            title="Modifier la ville"
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

// Composant Modal pour créer/éditer une ville
interface CityModalProps {
  city?: CityPage;
  onClose: () => void;
  onSave: (city: any) => void;
  title: string;
}

const CityModal: React.FC<CityModalProps> = ({ city, onClose, onSave, title }) => {
  const [formData, setFormData] = useState({
    name: city?.name || '',
    codePostal: city?.content.localInfo.codePostal || '',
    population: city?.content.localInfo.population || '',
    departement: city?.content.localInfo.departement || 'Yvelines',
    distanceFromBase: city?.distanceFromBase || 10,
    depannagePrice: city?.depannagePrice || 130,
    status: city?.status || 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (city) {
      // Modification
      const updatedCity: CityPage = {
        ...city,
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        title: `Électricien à ${formData.name} - LS COM | Installation, Dépannage, Conformité`,
        metaDescription: `LS COM, électricien professionnel à ${formData.name} (${formData.codePostal}). Installation électrique, dépannage ${formData.depannagePrice}€ HT, mise en conformité, bornes IRVE. Devis gratuit.`,
        content: {
          ...city.content,
          heroTitle: `Électricien à ${formData.name}`,
          heroSubtitle: `Votre électricien professionnel de confiance à ${formData.name}`,
          localInfo: {
            population: formData.population,
            codePostal: formData.codePostal,
            departement: formData.departement
          }
        },
        distanceFromBase: formData.distanceFromBase,
        depannagePrice: formData.depannagePrice,
        status: formData.status as 'active' | 'draft' | 'inactive'
      };
      onSave(updatedCity);
    } else {
      // Création
      onSave({
        name: formData.name,
        content: {
          localInfo: {
            population: formData.population,
            codePostal: formData.codePostal,
            departement: formData.departement
          }
        },
        distanceFromBase: formData.distanceFromBase,
        depannagePrice: formData.depannagePrice,
        status: formData.status
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la ville *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Versailles"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code postal *
            </label>
            <input
              type="text"
              required
              value={formData.codePostal}
              onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: 78000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Population
            </label>
            <input
              type="text"
              value={formData.population}
              onChange={(e) => setFormData({ ...formData, population: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: 85 000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Département
            </label>
            <select
              value={formData.departement}
              onChange={(e) => setFormData({ ...formData, departement: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Yvelines">Yvelines (78)</option>
              <option value="Essonne">Essonne (91)</option>
              <option value="Hauts-de-Seine">Hauts-de-Seine (92)</option>
              <option value="Val-d'Oise">Val-d'Oise (95)</option>
              <option value="Seine-et-Marne">Seine-et-Marne (77)</option>
              <option value="Val-de-Marne">Val-de-Marne (94)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Distance depuis base (km)
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={formData.distanceFromBase}
              onChange={(e) => setFormData({ ...formData, distanceFromBase: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tarif dépannage (€ HT)
            </label>
            <select
              value={formData.depannagePrice}
              onChange={(e) => setFormData({ ...formData, depannagePrice: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={110}>110€ HT (Zone proximité 0-5km)</option>
              <option value={130}>130€ HT (Zone intermédiaire 5-10km)</option>
              <option value={150}>150€ HT (Zone étendue 10-15km)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Actif</option>
              <option value="draft">Brouillon</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{city ? 'Modifier' : 'Créer'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;