import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import { 
  Home, 
  MapPin, 
  Euro, 
  Image, 
  Settings, 
  Menu, 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye,
  RefreshCw,
  LogOut,
  Users,
  BarChart3,
  Camera
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // États pour la gestion des villes
  const [cities, setCities] = useState<any[]>([]);
  const [editingCity, setEditingCity] = useState<any>(null);
  const [showCityForm, setShowCityForm] = useState(false);
  
  // États pour les prix IRVE
  const [irvePrices, setIrvePrices] = useState({
    greenup: { price: 710, label: 'Prise Green\'UP Legrand' },
    borne7kw: { price: 1280, label: 'Borne Murale 7,4kW' },
    borne22kw: { price: 1990, label: 'Borne Professionnelle 22kW' }
  });
  
  // États pour la gestion des images
  const [siteImages, setSiteImages] = useState({
    hero: '',
    about: '',
    services: '',
    irve: '',
    installation: '',
    depannage: '',
    conformite: '',
    tableau: ''
  });

  // Menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'cities', label: 'Gestion Villes', icon: MapPin },
    { id: 'irve-prices', label: 'Prix IRVE', icon: Euro },
    { id: 'images', label: 'Images Site', icon: Image },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  // Charger les données au montage
  useEffect(() => {
    loadCities();
    loadIrvePrices();
    loadSiteImages();
  }, []);

  const loadCities = () => {
    try {
      const stored = localStorage.getItem('admin_cities');
      let loadedCities = [];
      
      if (stored) {
        loadedCities = JSON.parse(stored);
      }
      
      // Si pas de villes ou très peu, restaurer depuis les données CSV
      if (!loadedCities || loadedCities.length < 10) {
        console.log('Restauration des villes depuis les données CSV...');
        loadedCities = restoreCitiesFromCSV();
        localStorage.setItem('admin_cities', JSON.stringify(loadedCities));
      }
      
      setCities(loadedCities);
    } catch (error) {
      console.error('Erreur chargement villes:', error);
      // En cas d'erreur, restaurer depuis CSV
      const restoredCities = restoreCitiesFromCSV();
      setCities(restoredCities);
      localStorage.setItem('admin_cities', JSON.stringify(restoredCities));
    }
  };

  const loadIrvePrices = () => {
    const stored = localStorage.getItem('irve_prices');
    if (stored) {
      try {
        setIrvePrices(JSON.parse(stored));
      } catch (error) {
        console.error('Erreur chargement prix IRVE:', error);
      }
    }
  };

  const loadSiteImages = () => {
    const stored = localStorage.getItem('site_images');
    if (stored) {
      try {
        setSiteImages(JSON.parse(stored));
      } catch (error) {
        console.error('Erreur chargement images:', error);
      }
    }
  };

  // Fonctions pour les villes
  const saveCity = (cityData: any) => {
    let updatedCities;
    if (editingCity) {
      updatedCities = cities.map(city => 
        city.id === editingCity.id ? { ...cityData, id: editingCity.id } : city
      );
    } else {
      updatedCities = [...cities, { ...cityData, id: Date.now().toString() }];
    }
    
    setCities(updatedCities);
    localStorage.setItem('admin_cities', JSON.stringify(updatedCities));
    setShowCityForm(false);
    setEditingCity(null);
  };

  const deleteCity = (cityId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ville ?')) {
      const updatedCities = cities.filter(city => city.id !== cityId);
      setCities(updatedCities);
      localStorage.setItem('admin_cities', JSON.stringify(updatedCities));
    }
  };

  // Fonctions pour les prix IRVE
  const saveIrvePrices = () => {
    localStorage.setItem('irve_prices', JSON.stringify(irvePrices));
    alert('Prix IRVE sauvegardés avec succès !');
  };

  // Fonction pour convertir les URLs Google Drive
  const convertGoogleDriveUrl = (url: string): string => {
    if (!url || typeof url !== 'string') return url;
    
    // Pattern pour Google Drive: https://drive.google.com/file/d/FILE_ID/view
    const drivePattern = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)(?:\/view)?/;
    const match = url.match(drivePattern);
    
    if (match) {
      const fileId = match[1];
      const convertedUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
      return convertedUrl;
    }
    
    return url;
  };

  // Fonction pour valider les URLs d'images
  const updateImage = (key: string, url: string) => {
    if (!url.trim()) {
      alert('Veuillez saisir une URL');
      return;
    }

    const finalUrl = url.trim();
    
    // Sauvegarder immédiatement
    const updatedImages = { ...siteImages, [key]: finalUrl };
    setSiteImages(updatedImages);
    localStorage.setItem('site_images', JSON.stringify(updatedImages));
    
    // Forcer le rechargement de la page pour propager les changements
    alert('✅ Image sauvegardée ! La page va se recharger pour appliquer les changements.');
    
    // Recharger la page complète pour s'assurer que tous les composants voient les nouvelles images
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  const resetImages = () => {
    if (confirm('Restaurer toutes les images par défaut ?')) {
      const defaultImages = {
        hero: '',
        about: '',
        services: '',
        irve: '',
        installation: '',
        depannage: '',
        conformite: '',
        tableau: ''
      };
      setSiteImages(defaultImages);
      localStorage.setItem('site_images', JSON.stringify(defaultImages));
      
      alert('Images supprimées ! La page va se recharger.');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  // Formulaire ville
  const CityForm = () => {
    const [formData, setFormData] = useState({
      name: editingCity?.name || '',
      slug: editingCity?.slug || '',
      title: editingCity?.title || '',
      metaDescription: editingCity?.metaDescription || '',
      status: editingCity?.status || 'active',
      depannagePrice: editingCity?.depannagePrice || 110,
      content: {
        localInfo: {
          codePostal: editingCity?.content?.localInfo?.codePostal || '',
          population: editingCity?.content?.localInfo?.population || '',
          departement: editingCity?.content?.localInfo?.departement || 'Yvelines'
        }
      }
    });

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">
          {editingCity ? 'Modifier la ville' : 'Nouvelle ville'}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom de la ville</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Slug URL</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Code Postal</label>
            <input
              type="text"
              value={formData.content.localInfo.codePostal}
              onChange={(e) => setFormData({
                ...formData, 
                content: {
                  ...formData.content,
                  localInfo: {...formData.content.localInfo, codePostal: e.target.value}
                }
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Prix dépannage (€ HT)</label>
            <select
              value={formData.depannagePrice}
              onChange={(e) => setFormData({...formData, depannagePrice: parseInt(e.target.value)})}
              className="w-full p-2 border rounded-md"
            >
              <option value={110}>110€ HT (Zone proximité)</option>
              <option value={130}>130€ HT (Zone intermédiaire)</option>
              <option value={150}>150€ HT (Zone étendue)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Statut</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full p-2 border rounded-md"
            >
              <option value="active">Active</option>
              <option value="draft">Brouillon</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Titre de la page</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Meta Description</label>
          <textarea
            value={formData.metaDescription}
            onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
            className="w-full p-2 border rounded-md h-20"
          />
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => saveCity(formData)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Sauvegarder</span>
          </button>
          <button
            onClick={() => {
              setShowCityForm(false);
              setEditingCity(null);
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Annuler
          </button>
        </div>
      </div>
    );
  };

  // Rendu du contenu selon l'onglet actif
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{cities.length}</p>
                    <p className="text-gray-600">Villes actives</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Euro className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-gray-600">Prix IRVE configurés</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Image className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                    <p className="text-gray-600">Images gérées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cities':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des Villes</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    const restoredCities = restoreCitiesFromCSV();
                    setCities(restoredCities);
                    localStorage.setItem('admin_cities', JSON.stringify(restoredCities));
                    alert(`${restoredCities.length} villes restaurées !`);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Restaurer les 54 villes</span>
                </button>
                <button
                  onClick={() => setShowCityForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nouvelle ville</span>
                </button>
              </div>
            </div>

            {showCityForm && <CityForm />}

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ville</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cities.map((city) => (
                      <tr key={city.id}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{city.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{city.slug}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{city.depannagePrice}€ HT</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            city.status === 'active' ? 'bg-green-100 text-green-800' :
                            city.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {city.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingCity(city);
                                setShowCityForm(true);
                              }}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteCity(city.id)}
                              className="text-red-600 hover:text-red-700"
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
            </div>
          </div>
        );

      case 'irve-prices':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Prix IRVE</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(irvePrices).map(([key, data]) => (
                <div key={key} className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">{data.label}</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Prix (€ HT)</label>
                      <input
                        type="number"
                        value={data.price}
                        onChange={(e) => setIrvePrices({
                          ...irvePrices,
                          [key]: { ...data, price: parseInt(e.target.value) }
                        })}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={saveIrvePrices}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md flex items-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Sauvegarder les prix</span>
            </button>
          </div>
        );

      case 'images':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des Images</h2>
              <button
                onClick={resetImages}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Supprimer toutes les images</span>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(siteImages).map(([key, url]) => (
                <div key={key} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-3 mb-4">
                    <Camera className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={url || '/api/placeholder/400/225'} 
                        alt={key}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">URL de l'image</label>
                      <div className="flex space-x-2">
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => {
                            const newUrl = e.target.value;
                            setSiteImages({...siteImages, [key]: newUrl});
                          }}
                          className="flex-1 p-2 border rounded-md text-sm"
                          placeholder="https://lh3.googleusercontent.com/d/VOTRE_ID"
                        />
                        <button
                          onClick={() => updateImage(key, url)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center space-x-1"
                        >
                          <Save className="h-4 w-4" />
                          <span>Sauver</span>
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        <p><strong>📋 URL directe recommandée :</strong></p>
                        <p>https://lh3.googleusercontent.com/d/VOTRE_ID_GOOGLE_DRIVE</p>
                        <p className="text-blue-600 mt-1">Ou toute URL d'image directe (Pexels, Unsplash, etc.)</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">📋 Comment obtenir l'URL directe :</h4>
              <p className="text-sm text-blue-700">
                <strong>Google Drive :</strong><br/>
                1. Partagez votre image (accès public)<br/>
                2. Copiez l'ID depuis l'URL de partage<br/>
                3. Utilisez : https://lh3.googleusercontent.com/d/VOTRE_ID<br/><br/>
                <strong>Autres sources :</strong> Pexels, Unsplash, Imgur (URL directe)
              </p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Actions Système</h3>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    if (confirm('Vider le cache du navigateur ?')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Vider le cache</span>
                </button>
                
                <button
                  onClick={() => {
                    if (confirm('Se déconnecter ?')) {
                      logout();
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}>
          
          {/* Header Sidebar */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">Admin LS COM</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Menu Navigation */}
          <nav className="mt-6">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                    activeTab === item.id ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overlay pour mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Contenu principal */}
        <div className="flex-1 lg:ml-0">
          {/* Header mobile */}
          <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          {/* Contenu */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;