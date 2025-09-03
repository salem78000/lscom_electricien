import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  BarChart3,
  Globe,
  Phone,
  Mail,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { CityPage, AdminStats } from '../../types/admin';

const AdminDashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const [cityPages, setCityPages] = useLocalStorage<CityPage[]>('admin_cities', []);
  const [activeTab, setActiveTab] = useState<'overview' | 'cities' | 'settings'>('overview');
  const [showAddCity, setShowAddCity] = useState(false);
  const [editingCity, setEditingCity] = useState<CityPage | null>(null);

  // Formulaire nouvelle ville
  const [newCity, setNewCity] = useState({
    name: '',
    slug: '',
    title: '',
    metaDescription: '',
    heroTitle: '',
    heroSubtitle: '',
    population: '',
    codePostal: '',
    departement: 'Yvelines'
  });

  // Statistiques calculees
  const stats: AdminStats = {
    totalVisits: cityPages.reduce((sum, city) => sum + city.visits, 0),
    totalLeads: cityPages.reduce((sum, city) => sum + city.leads, 0),
    activeCities: cityPages.filter(city => city.status === 'active').length,
    conversionRate: cityPages.reduce((sum, city) => sum + city.visits, 0) > 0 
      ? (cityPages.reduce((sum, city) => sum + city.leads, 0) / cityPages.reduce((sum, city) => sum + city.visits, 0)) * 100 
      : 0,
    topCities: cityPages
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5)
      .map(city => ({
        name: city.name,
        visits: city.visits,
        leads: city.leads
      }))
  };

  const handleAddCity = () => {
    if (!newCity.name || !newCity.slug) return;

    const city: CityPage = {
      id: Date.now().toString(),
      name: newCity.name,
      slug: newCity.slug,
      title: newCity.title || `Electricien a ${newCity.name} - LS COM`,
      metaDescription: newCity.metaDescription || `LS COM, electricien professionnel a ${newCity.name}. Installation, depannage, conformite electrique.`,
      content: {
        heroTitle: newCity.heroTitle || `Electricien a ${newCity.name}`,
        heroSubtitle: newCity.heroSubtitle || `Votre electricien professionnel de confiance a ${newCity.name}`,
        services: [
          'Installation electrique',
          'Depannage electrique',
          'Mise en conformite',
          'Bornes de recharge IRVE'
        ],
        testimonials: [
          {
            name: `Client satisfait - ${newCity.name}`,
            text: `Excellent service d'electricien a ${newCity.name}. Travail professionnel et dans les delais.`,
            service: 'Installation electrique',
            rating: 5,
            date: 'Il y a 1 mois'
          }
        ],
        localInfo: {
          population: newCity.population,
          codePostal: newCity.codePostal,
          departement: newCity.departement
        }
      },
      visits: 0,
      leads: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setCityPages([...cityPages, city]);
    setShowAddCity(false);
    setNewCity({
      name: '',
      slug: '',
      title: '',
      metaDescription: '',
      heroTitle: '',
      heroSubtitle: '',
      population: '',
      codePostal: '',
      departement: 'Yvelines'
    });
  };

  const handleDeleteCity = (id: string) => {
    if (confirm('Etes-vous sur de vouloir supprimer cette ville ?')) {
      setCityPages(cityPages.filter(city => city.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setCityPages(cityPages.map(city => 
      city.id === id 
        ? { ...city, status: city.status === 'active' ? 'inactive' : 'active' }
        : city
    ));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[eee]/g, 'e')
      .replace(/[aaa]/g, 'a')
      .replace(/[ii]/g, 'i')
      .replace(/[oo]/g, 'o')
      .replace(/[uuu]/g, 'u')
      .replace(/c/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-2">
                  <img 
                    src="https://stackblitz.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCT08xMVFFPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c933664d226cd248d5b30317ed10cf915092de91/-Lscom.png"
                    alt="LS COM"
                    className="h-8 w-auto"
                  />
                  <span className="text-xl font-bold text-gray-900">Admin Dashboard</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Connecte en tant que <strong>{user?.username}</strong>
                </span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Deconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
                { id: 'cities', label: 'Gestion des villes', icon: MapPin },
                { id: 'settings', label: 'Parametres', icon: Settings }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Vue d'ensemble */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h1>
                <p className="text-gray-600">Statistiques et performance du site LS COM</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Eye className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Visites totales</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalVisits.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Leads generes</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalLeads.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Villes actives</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeCities}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Taux de conversion</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.conversionRate.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Cities */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Top 5 des villes</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {stats.topCities.map((city, index) => (
                      <div key={city.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-900">{city.name}</span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <span>{city.visits} visites</span>
                          <span>{city.leads} leads</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gestion des villes */}
          {activeTab === 'cities' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Gestion des villes</h1>
                  <p className="text-gray-600">Gerez les pages ville de votre site</p>
                </div>
                <button
                  onClick={() => setShowAddCity(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Ajouter une ville</span>
                </button>
              </div>

              {/* Liste des villes */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ville
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visites
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Leads
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cityPages.map((city) => (
                      <tr key={city.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{city.name}</div>
                            <div className="text-sm text-gray-500">/{city.slug}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            city.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {city.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {city.visits.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {city.leads.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Link
                            to={`/electricien/${city.slug}`}
                            className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Link>
                          <button
                            onClick={() => handleToggleStatus(city.id)}
                            className="text-orange-600 hover:text-orange-900 inline-flex items-center"
                          >
                            {city.status === 'active' ? (
                              <>
                                <Clock className="h-4 w-4 mr-1" />
                                Desactiver
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Activer
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteCity(city.id)}
                            className="text-red-600 hover:text-red-900 inline-flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {cityPages.length === 0 && (
                  <div className="text-center py-12">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune ville configuree</h3>
                    <p className="text-gray-600 mb-4">Commencez par ajouter votre premiere ville</p>
                    <button
                      onClick={() => setShowAddCity(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Ajouter une ville
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Parametres */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Parametres</h1>
                <p className="text-gray-600">Configuration generale du site</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations generales</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'entreprise
                    </label>
                    <input
                      type="text"
                      value="LS COM"
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SIRET
                    </label>
                    <input
                      type="text"
                      value="52445239800026"
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zone d'intervention principale
                    </label>
                    <input
                      type="text"
                      value="Ile-de-France (Yvelines et communes limitrophes)"
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Modal Ajouter ville */}
        {showAddCity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Ajouter une nouvelle ville</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de la ville *
                    </label>
                    <input
                      type="text"
                      value={newCity.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setNewCity({
                          ...newCity,
                          name,
                          slug: generateSlug(name)
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ex: Versailles"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug URL *
                    </label>
                    <input
                      type="text"
                      value={newCity.slug}
                      onChange={(e) => setNewCity({...newCity, slug: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ex: versailles"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre de la page
                  </label>
                  <input
                    type="text"
                    value={newCity.title}
                    onChange={(e) => setNewCity({...newCity, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Laissez vide pour generation automatique"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta description
                  </label>
                  <textarea
                    value={newCity.metaDescription}
                    onChange={(e) => setNewCity({...newCity, metaDescription: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Laissez vide pour generation automatique"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Population
                    </label>
                    <input
                      type="text"
                      value={newCity.population}
                      onChange={(e) => setNewCity({...newCity, population: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ex: 85 000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Code postal
                    </label>
                    <input
                      type="text"
                      value={newCity.codePostal}
                      onChange={(e) => setNewCity({...newCity, codePostal: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ex: 78000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departement
                    </label>
                    <select
                      value={newCity.departement}
                      onChange={(e) => setNewCity({...newCity, departement: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Yvelines">Yvelines</option>
                      <option value="Essonne">Essonne</option>
                      <option value="Hauts-de-Seine">Hauts-de-Seine</option>
                      <option value="Val-d'Oise">Val-d'Oise</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddCity(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddCity}
                  disabled={!newCity.name || !newCity.slug}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                >
                  Ajouter la ville
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;