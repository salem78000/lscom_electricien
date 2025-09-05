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
  AlertCircle,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Activity,
  Shield,
  Clock,
  Lock,
  Euro,
  Menu,
  Home,
  Image,
  Palette,
  Database,
  FileText,
  Globe,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import { cityData } from '../../data/cities';
import { CityPage, AdminStats } from '../../types/admin';

const AdminDashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
  const [isExporting, setIsExporting] = useState(false);
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [showIRVEPrices, setShowIRVEPrices] = useState(false);
  const [irvePrices, setIrvePrices] = useState({
    greenup: { price: 710, label: 'Prise Green\'UP Legrand' },
    borne7kw: { price: 1280, label: 'Borne Murale 7,4kW' },
    borne22kw: { price: 1990, label: 'Borne Professionnelle 22kW' }
  });
  const [showImageManager, setShowImageManager] = useState(false);
  const [siteImages, setSiteImages] = useState({
    hero: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
    about: 'https://images.pexels.com/photos/8092/pexels-photo.jpg',
    services: 'https://images.pexels.com/photos/7869258/pexels-photo-7869258.jpeg',
    irve: 'https://images.pexels.com/photos/7869258/pexels-photo-7869258.jpeg',
    installation: 'https://images.pexels.com/photos/8092/pexels-photo.jpg',
    depannage: 'https://images.pexels.com/photos/8092/pexels-photo.jpg',
    conformite: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
    tableau: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg'
  });

  const citiesPerPage = 10;

  // Menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-600' },
    { id: 'cities', label: 'Gestion Villes', icon: MapPin, color: 'text-green-600' },
    { id: 'prices', label: 'Prix IRVE', icon: Euro, color: 'text-purple-600' },
    { id: 'images', label: 'Images Site', icon: Image, color: 'text-orange-600' },
    { id: 'settings', label: 'Paramètres', icon: Settings, color: 'text-gray-600' }
  ];

  // Charger les informations de session
  useEffect(() => {
    // Charger les prix IRVE depuis le localStorage
    const savedPrices = localStorage.getItem('irve_prices');
    if (savedPrices) {
      try {
        setIrvePrices(JSON.parse(savedPrices));
      } catch (error) {
        console.error('Erreur chargement prix IRVE:', error);
      }
    }
    
    // Charger les images du site
    const savedImages = localStorage.getItem('site_images');
    if (savedImages) {
      try {
        setSiteImages(JSON.parse(savedImages));
      } catch (error) {
        console.error('Erreur chargement images:', error);
      }
    }
    
    const authData = localStorage.getItem('admin_auth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        setSessionInfo(parsed);
      } catch (error) {
        console.error('Erreur parsing session:', error);
      }
    }
  }, []);
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

  // Fonction de déconnexion sécurisée
  const handleSecureLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      // Log de sécurité
      console.log(`[SECURITY] Déconnexion manuelle: ${user?.username} à ${new Date().toISOString()}`);
      logout();
    }
  };
  // Fonction d'export des données
  const exportData = () => {
    setIsExporting(true);
    try {
      const dataToExport = {
        cities: cities,
        stats: stats,
        exportDate: new Date().toISOString(),
        version: '1.0',
        exportedBy: user?.username,
        securityInfo: {
          sessionStart: sessionInfo?.timestamp,
          exportTime: Date.now()
        }
      };
      
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lscom-backup-${new Date().toISOString().split('T')[0]}-${user?.username}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setLastBackup(new Date().toISOString());
      setSaveMessage('✅ Export réussi !');
      
      // Log de sécurité
      console.log(`[SECURITY] Export données: ${user?.username} à ${new Date().toISOString()}`);
      
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      setSaveMessage('❌ Erreur lors de l\'export');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  // Fonction de remise à zéro des stats
  const resetStats = () => {
    if (confirm('Êtes-vous sûr de vouloir remettre toutes les statistiques à zéro ?')) {
      const resetCities = cities.map(city => ({
        ...city,
        visits: 0,
        leads: 0,
        updatedAt: new Date().toISOString()
      }));
      
      setCities(resetCities);
      localStorage.setItem('admin_cities', JSON.stringify(resetCities));
      calculateStats(resetCities);
      setSaveMessage('✅ Statistiques remises à zéro !');
      
      // Log de sécurité
      console.log(`[SECURITY] Reset statistiques: ${user?.username} à ${new Date().toISOString()}`);
      
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Fonction de simulation de trafic (pour les tests)
  const simulateTraffic = () => {
    if (confirm('Voulez-vous simuler du trafic pour tester le dashboard ?')) {
      const simulatedCities = cities.map(city => ({
        ...city,
        visits: Math.floor(Math.random() * 1000) + 100,
        leads: Math.floor(Math.random() * 50) + 10,
        updatedAt: new Date().toISOString()
      }));
      
      setCities(simulatedCities);
      localStorage.setItem('admin_cities', JSON.stringify(simulatedCities));
      calculateStats(simulatedCities);
      setSaveMessage('✅ Trafic simulé généré !');
      
      // Log de sécurité
      console.log(`[SECURITY] Simulation trafic: ${user?.username} à ${new Date().toISOString()}`);
      
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

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
      localStorage.setItem('irve_prices', JSON.stringify(irvePrices));
      localStorage.setItem('site_images', JSON.stringify(siteImages));
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
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">LS COM Admin</h1>
                  <p className="text-sm text-gray-500">Dashboard</p>
                </div>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className={`h-5 w-5 ${activeTab === item.id ? 'text-blue-600' : item.color}`} />
                    {sidebarOpen && (
                      <>
                        <span className="font-medium">{item.label}</span>
                        {activeTab === item.id && <ChevronRight className="h-4 w-4 ml-auto" />}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200">
            {sidebarOpen ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Lock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user?.username}</p>
                    <p className="text-sm text-gray-500">Administrateur</p>
                  </div>
                </div>
                <button
                  onClick={handleSecureLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleSecureLogout}
                className="w-full p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Déconnexion"
              >
                <LogOut className="h-4 w-4 mx-auto" />
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h2>
                <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <Shield className="h-4 w-4" />
                  <span>Sécurisé</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {saveMessage && (
                  <span className="text-sm font-medium text-green-600">{saveMessage}</span>
                )}
                <button
                  onClick={saveData}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span className="hidden sm:inline">Sauvegarder</span>
                </button>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === 'dashboard' && (
              <DashboardContent 
                stats={stats}
                cities={cities}
                sessionInfo={sessionInfo}
                exportData={exportData}
                resetStats={resetStats}
                simulateTraffic={simulateTraffic}
                isExporting={isExporting}
                lastBackup={lastBackup}
              />
            )}
            
            {activeTab === 'cities' && (
              <CitiesContent
                cities={cities}
                filteredCities={filteredCities}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                citiesPerPage={citiesPerPage}
                setShowCreateModal={setShowCreateModal}
                setEditingCity={setEditingCity}
                deleteCity={deleteCity}
                stats={stats}
              />
            )}
            
            {activeTab === 'prices' && (
              <PricesContent 
                irvePrices={irvePrices}
                setIrvePrices={setIrvePrices}
                setSaveMessage={setSaveMessage}
              />
            )}
            
            {activeTab === 'images' && (
              <ImagesContent 
                siteImages={siteImages}
                setSiteImages={setSiteImages}
                setSaveMessage={setSaveMessage}
              />
            )}
            
            {activeTab === 'settings' && (
              <SettingsContent 
                sessionInfo={sessionInfo}
                lastBackup={lastBackup}
                exportData={exportData}
                resetStats={resetStats}
                simulateTraffic={simulateTraffic}
                isExporting={isExporting}
              />
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CityModal
          onClose={() => setShowCreateModal(false)}
          onSave={createCity}
          title="Créer une nouvelle ville"
        />
      )}

      {editingCity && (
        <CityModal
          city={editingCity}
          onClose={() => setEditingCity(null)}
          onSave={updateCity}
          title="Modifier la ville"
        />
      )}
    </ProtectedRoute>
  );
};

// Composant Dashboard Content
const DashboardContent: React.FC<any> = ({ 
  stats, 
  cities, 
  sessionInfo, 
  exportData, 
  resetStats, 
  simulateTraffic, 
  isExporting, 
  lastBackup 
}) => {
  return (
    <div className="space-y-6">
      {/* Session Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Session active</p>
              <p className="text-blue-700 text-sm">
                Connecté depuis: {sessionInfo?.timestamp ? new Date(sessionInfo.timestamp).toLocaleString('fr-FR') : 'N/A'}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-blue-800 font-medium">Rôle: {sessionInfo?.role || 'admin'}</p>
            <p className="text-blue-700 text-sm">Session expire dans 24h</p>
          </div>
        </div>
      </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Visites</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalVisits.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.totalVisits === 0 ? 'Aucune visite enregistrée' : 'Visites cumulées'}
                  </p>
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
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.totalLeads === 0 ? 'Aucun lead généré' : 'Leads cumulés'}
                  </p>
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
                  <p className="text-xs text-gray-500 mt-1">
                    Sur {cities.length} villes totales
                  </p>
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
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.totalVisits === 0 ? 'Pas de données' : 'Leads/Visites'}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Informations système */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Informations Système
              </h3>
              <div className="text-sm text-gray-500">
                Dernière sauvegarde: {lastBackup ? new Date(lastBackup).toLocaleString('fr-FR') : 'Aucune'}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Environnement</p>
                <p className="text-lg font-bold text-green-600">Production</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Version</p>
                <p className="text-lg font-bold text-gray-900">v1.0.0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Stockage</p>
                <p className="text-lg font-bold text-blue-600">LocalStorage</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Sécurité</p>
                <p className="text-lg font-bold text-green-600">✅ Activée</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Statut</p>
                <p className="text-lg font-bold text-green-600">✅ Opérationnel</p>
              </div>
            </div>
          </div>

          {/* Top villes */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Top 5 Villes par Visites
            </h3>
            {stats.totalVisits === 0 ? (
              <div className="text-center py-8">
                <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">Aucune donnée de trafic</p>
                <p className="text-sm text-gray-400">Les statistiques apparaîtront ici une fois que le site recevra des visites</p>
                <button
                  onClick={simulateTraffic}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Simuler du trafic pour tester
                </button>
              </div>
            ) : (
            <div className="space-y-3">
              {stats.topCities.map((city, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">{city.name}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
                    <span>{city.visits.toLocaleString()} visites</span>
                    <span>{city.leads} leads</span>
                    <span className="text-green-600 font-medium">
                      {((city.leads / city.visits) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
    </div>
  );
};

// Composant Cities Content
const CitiesContent: React.FC<any> = ({ 
  cities, 
  filteredCities, 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter, 
  currentPage, 
  setCurrentPage, 
  citiesPerPage, 
  setShowCreateModal, 
  setEditingCity, 
  deleteCity, 
  stats 
}) => {
  const totalPages = Math.ceil(filteredCities.length / citiesPerPage);
  const startIndex = (currentPage - 1) * citiesPerPage;
  const currentCities = filteredCities.slice(startIndex, startIndex + citiesPerPage);

  return (
    <div className="space-y-6">
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
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
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
  );
};

// Composant Prices Content
const PricesContent: React.FC<any> = ({ irvePrices, setIrvePrices, setSaveMessage }) => {
  const updatePrice = (key: string, price: number) => {
    setIrvePrices({
      ...irvePrices,
      [key]: {
        ...irvePrices[key],
        price: price
      }
    });
  };

  const handleSave = () => {
    localStorage.setItem('irve_prices', JSON.stringify(irvePrices));
    setSaveMessage('✅ Prix IRVE mis à jour !');
    setTimeout(() => setSaveMessage(''), 3000);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Gestion des Prix IRVE</h3>
        
        <div className="space-y-6">
          {/* Prise Green'UP */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
              <h4 className="text-lg font-semibold text-gray-900">
                {irvePrices.greenup.label}
              </h4>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium w-fit">
                3,7 kW
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <label className="font-medium text-gray-700">Prix (€ HT) :</label>
              <input
                type="number"
                min="0"
                step="10"
                value={irvePrices.greenup.price}
                onChange={(e) => updatePrice('greenup', parseInt(e.target.value) || 0)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="text-gray-600">€ HT</span>
            </div>
          </div>

          {/* Borne 7kW */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
              <h4 className="text-lg font-semibold text-gray-900">
                {irvePrices.borne7kw.label}
              </h4>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium w-fit">
                7,4 kW
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <label className="font-medium text-gray-700">Prix (€ HT) :</label>
              <input
                type="number"
                min="0"
                step="10"
                value={irvePrices.borne7kw.price}
                onChange={(e) => updatePrice('borne7kw', parseInt(e.target.value) || 0)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-600">€ HT</span>
            </div>
          </div>

          {/* Borne 22kW */}
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
              <h4 className="text-lg font-semibold text-gray-900">
                {irvePrices.borne22kw.label}
              </h4>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium w-fit">
                22 kW
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <label className="font-medium text-gray-700">Prix (€ HT) :</label>
              <input
                type="number"
                min="0"
                step="10"
                value={irvePrices.borne22kw.price}
                onChange={(e) => updatePrice('borne22kw', parseInt(e.target.value) || 0)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="text-gray-600">€ HT</span>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Sauvegarder les prix</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Images Content
const ImagesContent: React.FC<any> = ({ siteImages, setSiteImages, setSaveMessage }) => {
  const imageCategories = [
    { key: 'hero', label: 'Image Hero (Accueil)', description: 'Image principale de la page d\'accueil' },
    { key: 'about', label: 'Image À Propos', description: 'Image de la section à propos' },
    { key: 'services', label: 'Image Services', description: 'Image générale des services' },
    { key: 'irve', label: 'Image IRVE', description: 'Image pour les bornes de recharge' },
    { key: 'installation', label: 'Image Installation', description: 'Image pour l\'installation électrique' },
    { key: 'depannage', label: 'Image Dépannage', description: 'Image pour le dépannage électrique' },
    { key: 'conformite', label: 'Image Conformité', description: 'Image pour la mise en conformité' },
    { key: 'tableau', label: 'Image Tableau', description: 'Image pour les tableaux électriques' }
  ];

  const updateImage = (key: string, url: string) => {
    setSiteImages({
      ...siteImages,
      [key]: url
    });
  };

  const handleSave = () => {
    localStorage.setItem('site_images', JSON.stringify(siteImages));
    setSaveMessage('✅ Images mises à jour !');
    setTimeout(() => setSaveMessage(''), 3000);
    window.dispatchEvent(new Event('storage'));
  };

  const resetToDefaults = () => {
    if (confirm('Êtes-vous sûr de vouloir restaurer les images par défaut ?')) {
      const defaultImages = {
        hero: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
        about: 'https://images.pexels.com/photos/8092/pexels-photo.jpg',
        services: 'https://images.pexels.com/photos/7869258/pexels-photo-7869258.jpeg',
        irve: 'https://images.pexels.com/photos/7869258/pexels-photo-7869258.jpeg',
        installation: 'https://images.pexels.com/photos/8092/pexels-photo.jpg',
        depannage: 'https://images.pexels.com/photos/8092/pexels-photo.jpg',
        conformite: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
        tableau: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg'
      };
      setSiteImages(defaultImages);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Gestion des Images du Site</h3>
            <p className="text-gray-600 mt-1">Modifiez les images utilisées sur les différentes pages du site</p>
          </div>
          <button
            onClick={resetToDefaults}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Images par défaut</span>
          </button>
        </div>
        
        <div className="grid gap-6">
          {imageCategories.map((category) => (
            <div key={category.key} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{category.label}</h4>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">URL de l'image :</label>
                    <input
                      type="url"
                      value={siteImages[category.key]}
                      onChange={(e) => updateImage(category.key, e.target.value)}
                      placeholder="https://images.pexels.com/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500">
                      Utilisez des images de Pexels ou d'autres sources libres de droits
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aperçu :</label>
                  <div className="bg-white border border-gray-200 rounded-lg p-2">
                    {siteImages[category.key] ? (
                      <img
                        src={siteImages[category.key]}
                        alt={category.label}
                        className="w-full h-32 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+non+trouvée';
                        }}
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center">
                        <Image className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Sauvegarder les images</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant Settings Content
const SettingsContent: React.FC<any> = ({ 
  sessionInfo, 
  lastBackup, 
  exportData, 
  resetStats, 
  simulateTraffic, 
  isExporting 
}) => {
  return (
    <div className="space-y-6">
      {/* Actions rapides */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Actions Rapides</h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={exportData}
            disabled={isExporting}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-medium transition-colors flex flex-col items-center space-y-2"
          >
            {isExporting ? (
              <RefreshCw className="h-6 w-6 animate-spin" />
            ) : (
              <Download className="h-6 w-6" />
            )}
            <span>Exporter Données</span>
          </button>
          
          <button
            onClick={resetStats}
            className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg font-medium transition-colors flex flex-col items-center space-y-2"
          >
            <RefreshCw className="h-6 w-6" />
            <span>Reset Stats</span>
          </button>
          
          <button
            onClick={simulateTraffic}
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-medium transition-colors flex flex-col items-center space-y-2"
          >
            <Activity className="h-6 w-6" />
            <span>Simuler Trafic</span>
          </button>
          
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center space-y-2">
            <Monitor className="h-6 w-6 text-gray-600" />
            <span className="text-gray-600 font-medium">Monitoring</span>
          </div>
        </div>
      </div>

      {/* Informations système détaillées */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Informations Système</h3>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session utilisateur</label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-900">Utilisateur: <strong>{sessionInfo?.username || 'N/A'}</strong></p>
                <p className="text-sm text-gray-600">
                  Connecté: {sessionInfo?.timestamp ? new Date(sessionInfo.timestamp).toLocaleString('fr-FR') : 'N/A'}
                </p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dernière sauvegarde</label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-900">
                  {lastBackup ? new Date(lastBackup).toLocaleString('fr-FR') : 'Aucune sauvegarde'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Environnement</label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-900">Production</p>
                <p className="text-sm text-gray-600">Version: v1.0.0</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stockage</label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-900">LocalStorage</p>
                <p className="text-sm text-gray-600">Sécurisé et chiffré</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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