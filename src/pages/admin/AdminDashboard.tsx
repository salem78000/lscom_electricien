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
  LogOut,
  Save,
  X,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { CityPage, AdminStats } from '../../types/admin';

const AdminDashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const [cityPages, setCityPages] = useLocalStorage<CityPage[]>('admin_cities', []);
  const [activeTab, setActiveTab] = useState<'overview' | 'cities' | 'settings' | 'analytics'>('overview');
  const [showAddCity, setShowAddCity] = useState(false);
  const [editingCity, setEditingCity] = useState<CityPage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

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
    departement: 'Yvelines',
    distanceFromBase: 0,
    depannagePrice: 110
  });

  // Initialiser avec les villes existantes si le localStorage est vide
  useEffect(() => {
    if (cityPages.length === 0) {
      const defaultCities: CityPage[] = [
        {
          id: 'versailles-001',
          name: 'Versailles',
          slug: 'versailles',
          title: 'Electricien a Versailles - LS COM | Installation, Depannage, Conformite',
          metaDescription: 'LS COM, electricien professionnel a Versailles (78000). Installation electrique, depannage 110€ HT, mise en conformite, bornes IRVE. Devis gratuit.',
          content: {
            heroTitle: 'Electricien a Versailles',
            heroSubtitle: 'Votre electricien professionnel de confiance a Versailles',
            services: [
              'Installation electrique',
              'Depannage electrique',
              'Mise en conformite',
              'Bornes de recharge IRVE'
            ],
            testimonials: [
              {
                name: 'Marie L. - Versailles',
                text: 'Excellent electricien a Versailles ! Installation electrique complete de ma maison, travail soigne et dans les delais. Je recommande LS COM.',
                service: 'Installation electrique',
                rating: 5,
                date: 'Il y a 2 mois'
              },
              {
                name: 'Pierre D. - Versailles',
                text: 'Depannage electrique rapide a Versailles. Panne resolue en 1h avec le forfait 110€. Electricien professionnel et competent.',
                service: 'Depannage electrique',
                rating: 5,
                date: 'Il y a 1 mois'
              }
            ],
            localInfo: {
              population: '85 000',
              codePostal: '78000',
              departement: 'Yvelines'
            }
          },
          visits: 1250,
          leads: 45,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          distanceFromBase: 8,
          depannagePrice: 130
        },
        {
          id: 'magny-les-hameaux-001',
          name: 'Magny-les-Hameaux',
          slug: 'magny-les-hameaux',
          title: 'Electricien a Magny-les-Hameaux - LS COM | Installation, Depannage, Conformite',
          metaDescription: 'LS COM, electricien professionnel a Magny-les-Hameaux (78114). Installation electrique, depannage 110€ HT, mise en conformite, bornes IRVE. Devis gratuit.',
          content: {
            heroTitle: 'Electricien a Magny-les-Hameaux',
            heroSubtitle: 'Votre electricien professionnel de confiance a Magny-les-Hameaux',
            services: [
              'Installation electrique',
              'Depannage electrique',
              'Mise en conformite',
              'Bornes de recharge IRVE'
            ],
            testimonials: [
              {
                name: 'Sophie M. - Magny-les-Hameaux',
                text: 'Mise en conformite de mon tableau electrique a Magny-les-Hameaux. Travail de qualite, explications claires. Tres satisfaite du service LS COM.',
                service: 'Mise en conformite',
                rating: 5,
                date: 'Il y a 3 semaines'
              }
            ],
            localInfo: {
              population: '9 500',
              codePostal: '78114',
              departement: 'Yvelines'
            }
          },
          visits: 890,
          leads: 32,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          distanceFromBase: 0,
          depannagePrice: 110
        }
      ];
      setCityPages(defaultCities);
    }
  }, [cityPages.length, setCityPages]);

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

  // Filtrer les villes
  const filteredCities = cityPages.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || city.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
      updatedAt: new Date().toISOString(),
      distanceFromBase: newCity.distanceFromBase,
      depannagePrice: newCity.depannagePrice
    };

    setCityPages([...cityPages, city]);
    setShowAddCity(false);
    resetNewCityForm();
  };

  const handleEditCity = (city: CityPage) => {
    setEditingCity(city);
    setNewCity({
      name: city.name,
      slug: city.slug,
      title: city.title,
      metaDescription: city.metaDescription,
      heroTitle: city.content.heroTitle,
      heroSubtitle: city.content.heroSubtitle,
      population: city.content.localInfo.population,
      codePostal: city.content.localInfo.codePostal,
      departement: city.content.localInfo.departement,
      distanceFromBase: city.distanceFromBase || 0,
      depannagePrice: city.depannagePrice || 110
    });
    setShowAddCity(true);
  };

  const handleUpdateCity = () => {
    if (!editingCity || !newCity.name || !newCity.slug) return;

    const updatedCity: CityPage = {
      ...editingCity,
      name: newCity.name,
      slug: newCity.slug,
      title: newCity.title,
      metaDescription: newCity.metaDescription,
      content: {
        ...editingCity.content,
        heroTitle: newCity.heroTitle,
        heroSubtitle: newCity.heroSubtitle,
        localInfo: {
          population: newCity.population,
          codePostal: newCity.codePostal,
          departement: newCity.departement
        }
      },
      distanceFromBase: newCity.distanceFromBase,
      depannagePrice: newCity.depannagePrice,
      updatedAt: new Date().toISOString()
    };

    setCityPages(cityPages.map(city => 
      city.id === editingCity.id ? updatedCity : city
    ));
    
    setShowAddCity(false);
    setEditingCity(null);
    resetNewCityForm();
  };

  const handleDeleteCity = (id: string) => {
    if (confirm('Etes-vous sur de vouloir supprimer cette ville ?')) {
      setCityPages(cityPages.filter(city => city.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setCityPages(cityPages.map(city => 
      city.id === id 
        ? { ...city, status: city.status === 'active' ? 'inactive' : 'active', updatedAt: new Date().toISOString() }
        : city
    ));
  };

  const resetNewCityForm = () => {
    setNewCity({
      name: '',
      slug: '',
      title: '',
      metaDescription: '',
      heroTitle: '',
      heroSubtitle: '',
      population: '',
      codePostal: '',
      departement: 'Yvelines',
      distanceFromBase: 0,
      depannagePrice: 110
    });
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

  const exportData = () => {
    const dataStr = JSON.stringify(cityPages, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `lscom-cities-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
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
                { id: 'analytics', label: 'Analytiques', icon: TrendingUp },
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
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h1>
                  <p className="text-gray-600">Statistiques et performance du site LS COM</p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Actualiser</span>
                </button>
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
                      <p className="text-xs text-green-600">+12% ce mois</p>
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
                      <p className="text-xs text-green-600">+8% ce mois</p>
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
                      <p className="text-xs text-blue-600">+2 cette semaine</p>
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
                      <p className="text-xs text-green-600">+0.5% ce mois</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Cities */}
              <div className="grid lg:grid-cols-2 gap-8">
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
                            <span className="text-green-600 font-medium">{city.leads} leads</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Activite recente</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Plus className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Nouvelle ville ajoutee</p>
                          <p className="text-xs text-gray-500">Il y a 2 heures</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Page Versailles mise a jour</p>
                          <p className="text-xs text-gray-500">Il y a 1 jour</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-orange-100 p-2 rounded-full">
                          <TrendingUp className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Pic de trafic detecte</p>
                          <p className="text-xs text-gray-500">Il y a 3 jours</p>
                        </div>
                      </div>
                    </div>
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
                <div className="flex space-x-3">
                  <button
                    onClick={exportData}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Exporter</span>
                  </button>
                  <button
                    onClick={() => setShowAddCity(true)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Ajouter une ville</span>
                  </button>
                </div>
              </div>

              {/* Filtres et recherche */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Rechercher une ville..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">Toutes</option>
                      <option value="active">Actives</option>
                      <option value="inactive">Inactives</option>
                    </select>
                  </div>
                </div>
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
                        Distance/Prix
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCities.map((city) => (
                      <tr key={city.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{city.name}</div>
                            <div className="text-sm text-gray-500">/{city.slug}</div>
                            <div className="text-xs text-gray-400">{city.content.localInfo.codePostal}</div>
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
                          <div>
                            <div>{city.distanceFromBase || 0}km</div>
                            <div className="text-blue-600 font-medium">{city.depannagePrice || 110}€ HT</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div>{city.visits.toLocaleString()} visites</div>
                            <div className="text-green-600 font-medium">{city.leads.toLocaleString()} leads</div>
                            <div className="text-xs text-gray-500">
                              {city.visits > 0 ? ((city.leads / city.visits) * 100).toFixed(1) : 0}% conv.
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link
                              to={`/electricien/${city.slug}`}
                              className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Link>
                            <button
                              onClick={() => handleEditCity(city)}
                              className="text-orange-600 hover:text-orange-900 inline-flex items-center"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Modifier
                            </button>
                            <button
                              onClick={() => handleToggleStatus(city.id)}
                              className="text-purple-600 hover:text-purple-900 inline-flex items-center"
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredCities.length === 0 && (
                  <div className="text-center py-12">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {searchTerm || filterStatus !== 'all' ? 'Aucun resultat' : 'Aucune ville configuree'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm || filterStatus !== 'all' 
                        ? 'Essayez de modifier vos criteres de recherche'
                        : 'Commencez par ajouter votre premiere ville'
                      }
                    </p>
                    {!searchTerm && filterStatus === 'all' && (
                      <button
                        onClick={() => setShowAddCity(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Ajouter une ville
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Analytiques */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytiques</h1>
                <p className="text-gray-600">Analyse detaillee des performances</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance par ville</h2>
                  <div className="space-y-4">
                    {cityPages.slice(0, 10).map((city) => (
                      <div key={city.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <MapPin className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{city.name}</p>
                            <p className="text-sm text-gray-500">{city.content.localInfo.codePostal}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{city.visits} visites</p>
                          <p className="text-sm text-green-600">{city.leads} leads</p>
                          <p className="text-xs text-gray-500">
                            {city.visits > 0 ? ((city.leads / city.visits) * 100).toFixed(1) : 0}% conversion
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Metriques cles</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Taux de conversion moyen</span>
                        <span className="font-bold text-green-600">{stats.conversionRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Visites par ville</span>
                        <span className="font-bold text-blue-600">
                          {cityPages.length > 0 ? Math.round(stats.totalVisits / cityPages.length) : 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Leads par ville</span>
                        <span className="font-bold text-purple-600">
                          {cityPages.length > 0 ? Math.round(stats.totalLeads / cityPages.length) : 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Zones de prix</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">110€ HT (0-5km)</span>
                        <span className="font-bold text-green-600">
                          {cityPages.filter(c => (c.depannagePrice || 110) === 110).length} villes
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">130€ HT (5-10km)</span>
                        <span className="font-bold text-orange-600">
                          {cityPages.filter(c => (c.depannagePrice || 110) === 130).length} villes
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">150€ HT (10-15km)</span>
                        <span className="font-bold text-red-600">
                          {cityPages.filter(c => (c.depannagePrice || 110) === 150).length} villes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
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

              <div className="grid lg:grid-cols-2 gap-6">
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

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Tarification</h2>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="font-medium text-green-800 mb-2">Zone proximite (0-5km)</h3>
                      <p className="text-2xl font-bold text-green-600">110€ HT</p>
                      <p className="text-sm text-green-700">Forfait depannage 1h</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <h3 className="font-medium text-orange-800 mb-2">Zone intermediaire (5-10km)</h3>
                      <p className="text-2xl font-bold text-orange-600">130€ HT</p>
                      <p className="text-sm text-orange-700">Forfait depannage 1h</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h3 className="font-medium text-red-800 mb-2">Zone etendue (10-15km)</h3>
                      <p className="text-2xl font-bold text-red-600">150€ HT</p>
                      <p className="text-sm text-red-700">Forfait depannage 1h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Modal Ajouter/Modifier ville */}
        {showAddCity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingCity ? 'Modifier la ville' : 'Ajouter une nouvelle ville'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddCity(false);
                      setEditingCity(null);
                      resetNewCityForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Informations de base */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de base</h3>
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
                </div>

                {/* Informations locales */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Informations locales</h3>
                  <div className="grid grid-cols-4 gap-4">
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
                        <option value="Seine-et-Marne">Seine-et-Marne</option>
                        <option value="Val-de-Marne">Val-de-Marne</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Distance (km)
                      </label>
                      <input
                        type="number"
                        value={newCity.distanceFromBase}
                        onChange={(e) => {
                          const distance = parseInt(e.target.value) || 0;
                          let price = 110;
                          if (distance >= 5 && distance < 10) price = 130;
                          else if (distance >= 10) price = 150;
                          
                          setNewCity({
                            ...newCity, 
                            distanceFromBase: distance,
                            depannagePrice: price
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                        min="0"
                        max="20"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Prix de depannage automatique :</strong> {newCity.depannagePrice}€ HT
                      {newCity.distanceFromBase < 5 && ' (Zone proximite)'}
                      {newCity.distanceFromBase >= 5 && newCity.distanceFromBase < 10 && ' (Zone intermediaire)'}
                      {newCity.distanceFromBase >= 10 && ' (Zone etendue)'}
                    </p>
                  </div>
                </div>

                {/* SEO */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">SEO et contenu</h3>
                  <div className="space-y-4">
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Titre hero
                        </label>
                        <input
                          type="text"
                          value={newCity.heroTitle}
                          onChange={(e) => setNewCity({...newCity, heroTitle: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Laissez vide pour generation automatique"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sous-titre hero
                        </label>
                        <input
                          type="text"
                          value={newCity.heroSubtitle}
                          onChange={(e) => setNewCity({...newCity, heroSubtitle: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Laissez vide pour generation automatique"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAddCity(false);
                    setEditingCity(null);
                    resetNewCityForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={editingCity ? handleUpdateCity : handleAddCity}
                  disabled={!newCity.name || !newCity.slug}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingCity ? 'Mettre a jour' : 'Ajouter la ville'}</span>
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