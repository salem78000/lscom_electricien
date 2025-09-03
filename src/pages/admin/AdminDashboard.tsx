import React, { useState } from 'react';
import { BarChart3, Users, FileText, MapPin, Settings, Plus, Edit, Trash2, Eye, LogOut, Download, Search, Filter, Copy, Globe, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Lead, CityPage } from '../../types/admin';
import ProtectedRoute from '../../components/admin/ProtectedRoute';

const AdminDashboardContent: React.FC = () => {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [leads, setLeads] = useLocalStorage<Lead[]>('admin_leads', []);
  
  // Initialiser avec des pages ville d'exemple
  const [cityPages, setCityPages] = useLocalStorage<CityPage[]>('admin_cities', [
    {
      id: '1',
      name: 'Magny-les-Hameaux',
      slug: 'magny-les-hameaux',
      title: 'Électricien à Magny-les-Hameaux - LS COM | Installation, Dépannage, Conformité',
      metaDescription: 'LS COM, électricien professionnel à Magny-les-Hameaux (78114). Installation électrique, dépannage 110€ HT, mise en conformité, bornes IRVE. Devis gratuit.',
      content: {
        heroTitle: 'Électricien à Magny-les-Hameaux',
        heroSubtitle: 'Votre électricien professionnel de confiance à Magny-les-Hameaux',
        services: [
          'Installation électrique complète',
          'Mise en conformité tableau électrique',
          'Dépannage électrique',
          'Bornes de recharge IRVE'
        ],
        testimonials: [
          {
            name: 'Client de Magny-les-Hameaux',
            text: 'Excellent électricien à Magny-les-Hameaux ! Installation électrique complète de ma maison, travail soigné et dans les délais. Je recommande LS COM.',
            service: 'Installation électrique',
            rating: 5,
            date: 'Il y a 2 mois'
          }
        ],
        localInfo: {
          population: '9 500',
          codePostal: '78114',
          departement: 'Yvelines'
        }
      },
      visits: 1250,
      leads: 18,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Versailles',
      slug: 'versailles',
      title: 'Électricien à Versailles - LS COM | Installation, Dépannage, Conformité',
      metaDescription: 'LS COM, électricien professionnel à Versailles (78000). Installation électrique, dépannage 110€ HT, mise en conformité, bornes IRVE. Devis gratuit.',
      content: {
        heroTitle: 'Électricien à Versailles',
        heroSubtitle: 'Votre électricien professionnel de confiance à Versailles',
        services: [
          'Installation électrique complète',
          'Mise en conformité tableau électrique',
          'Dépannage électrique',
          'Bornes de recharge IRVE'
        ],
        testimonials: [
          {
            name: 'Client de Versailles',
            text: 'Service impeccable à Versailles. Électricien très professionnel et prix correct. Dépannage résolu rapidement.',
            service: 'Dépannage électrique',
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
      visits: 2100,
      leads: 32,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityPage | null>(null);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isNewCityModalOpen, setIsNewCityModalOpen] = useState(false);

  // Système de tarification par distance
  const [distancePricing, setDistancePricing] = useLocalStorage<DistancePricing[]>('admin_distance_pricing', [
    {
      id: '1',
      name: 'Zone proche (0-5km)',
      minDistance: 0,
      maxDistance: 5,
      price: 110,
      description: 'Magny-les-Hameaux et communes limitrophes'
    },
    {
      id: '2', 
      name: 'Zone moyenne (5-10km)',
      minDistance: 5,
      maxDistance: 10,
      price: 130,
      description: 'Versailles, Guyancourt, Saint-Quentin-en-Yvelines'
    },
    {
      id: '3',
      name: 'Zone éloignée (10-15km)',
      minDistance: 10,
      maxDistance: 15,
      price: 150,
      description: 'Paris proche banlieue, Essonne limitrophe'
    }
  ]);

  // Fonction pour obtenir le prix selon la distance
  const getPriceForDistance = (distance: number): number => {
    const zone = distancePricing.find(zone => 
      distance >= zone.minDistance && distance < zone.maxDistance
    );
    return zone?.price || 110; // Prix par défaut
  };

  const stats = [
    {
      title: 'Demandes de devis',
      value: leads.length.toString(),
      change: '+12%',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Pages ville actives',
      value: cityPages.filter(city => city.status === 'active').length.toString(),
      change: '100%',
      icon: MapPin,
      color: 'green'
    },
    {
      title: 'Visiteurs mensuels',
      value: cityPages.reduce((total, city) => total + city.visits, 0).toLocaleString(),
      change: '+8%',
      icon: Users,
      color: 'orange'
    },
    {
      title: 'Taux de conversion',
      value: cityPages.reduce((total, city) => total + city.visits, 0) > 0 
        ? `${((cityPages.reduce((total, city) => total + city.leads, 0) / cityPages.reduce((total, city) => total + city.visits, 0)) * 100).toFixed(1)}%`
        : '0%',
      change: '+0.5%',
      icon: BarChart3,
      color: 'purple'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau': return 'bg-blue-100 text-blue-800';
      case 'contacté': return 'bg-orange-100 text-orange-800';
      case 'devis envoyé': return 'bg-green-100 text-green-800';
      case 'converti': return 'bg-purple-100 text-purple-800';
      case 'perdu': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const deleteLead = (leadId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      setLeads(leads.filter(lead => lead.id !== leadId));
    }
  };

  const exportLeads = () => {
    const csvContent = [
      ['Nom', 'Email', 'Téléphone', 'Ville', 'Service', 'Date', 'Statut', 'Source'].join(','),
      ...leads.map(lead => [
        lead.name,
        lead.email,
        lead.phone,
        lead.city,
        lead.service,
        lead.date,
        lead.status,
        lead.source
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const cloneCity = (city: CityPage) => {
    const newCity: CityPage = {
      ...city,
      id: Date.now().toString(),
      name: `${city.name} - Copie`,
      slug: `${city.slug}-copie`,
      title: city.title.replace(city.name, `${city.name} - Copie`),
      visits: 0,
      leads: 0,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCityPages([...cityPages, newCity]);
  };

  const deleteCity = (cityId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette page ville ?')) {
      setCityPages(cityPages.filter(city => city.id !== cityId));
    }
  };

  const updateCityStatus = (cityId: string, newStatus: CityPage['status']) => {
    setCityPages(cityPages.map(city => 
      city.id === cityId ? { ...city, status: newStatus, updatedAt: new Date().toISOString() } : city
    ));
  };

  const saveCityChanges = (updatedCity: CityPage) => {
    setCityPages(cityPages.map(city => 
      city.id === updatedCity.id ? { ...updatedCity, updatedAt: new Date().toISOString() } : city
    ));
    setIsCityModalOpen(false);
    setSelectedCity(null);
  };

  const createNewCity = (newCityData: Partial<CityPage>) => {
    const newCity: CityPage = {
      id: Date.now().toString(),
      name: newCityData.name || '',
      slug: newCityData.name?.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[àáâãäå]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôõö]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/[ç]/g, 'c')
        .replace(/['']/g, '-')
        .replace(/[^a-z0-9-]/g, '') || '',
      title: `Électricien à ${newCityData.name} - LS COM | Installation, Dépannage, Conformité`,
      metaDescription: `LS COM, électricien professionnel à ${newCityData.name}. Installation électrique, dépannage 110€ HT, mise en conformité, bornes IRVE. Devis gratuit.`,
      content: {
        heroTitle: `Électricien à ${newCityData.name}`,
        heroSubtitle: `Votre électricien professionnel de confiance à ${newCityData.name}`,
        services: [
          'Installation électrique complète',
          'Mise en conformité tableau électrique',
          'Dépannage électrique',
          'Bornes de recharge IRVE'
        ],
        testimonials: [
          {
            name: `Client de ${newCityData.name}`,
            text: `Excellent électricien à ${newCityData.name} ! Installation électrique complète de ma maison, travail soigné et dans les délais. Je recommande LS COM.`,
            service: 'Installation électrique',
            rating: 5,
            date: 'Il y a 2 mois'
          }
        ],
        localInfo: {
          population: newCityData.content?.localInfo?.population || '',
          codePostal: newCityData.content?.localInfo?.codePostal || '',
          departement: 'Yvelines'
        }
      },
      visits: 0,
      leads: 0,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCityPages([...cityPages, newCity]);
    setIsNewCityModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin LS COM</h1>
              <p className="text-gray-600">Gestion du site électricien professionnel</p>
              <p className="text-sm text-gray-500">Connecté en tant que: {user?.username}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsNewCityModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Nouvelle page ville</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Vue d\'ensemble' },
              { id: 'leads', label: 'Demandes de devis' },
              { id: 'cities', label: 'Pages ville' },
              { id: 'content', label: 'Contenu' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change} ce mois</p>
                      </div>
                      <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                        <IconComponent className={`h-6 w-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Recent Leads */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Dernières demandes</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {leads.length > 0 ? leads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{lead.name}</p>
                          <p className="text-sm text-gray-600">{lead.city} - {lead.service}</p>
                          <p className="text-xs text-gray-500">{lead.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </div>
                    )) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Aucune demande de devis pour le moment</p>
                        <p className="text-sm text-gray-400 mt-2">
                          Les nouvelles demandes apparaîtront ici automatiquement
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Top Cities */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Top villes</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {cityPages.length > 0 ? cityPages.slice(0, 5).map((city, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{city.name}</p>
                          <p className="text-sm text-gray-600">{city.visits} visites</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-blue-600">{city.leads} leads</p>
                          <p className="text-xs text-gray-500">ce mois</p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Aucune page ville configurée</p>
                        <p className="text-sm text-gray-400 mt-2">
                          Ajoutez des pages ville pour suivre les performances
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Demandes de devis</h3>
                <button 
                  onClick={exportLeads}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Exporter CSV</span>
                </button>
              </div>
              
              {/* Filtres */}
              <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, email ou ville..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="nouveau">Nouveau</option>
                    <option value="contacté">Contacté</option>
                    <option value="devis envoyé">Devis envoyé</option>
                    <option value="converti">Converti</option>
                    <option value="perdu">Perdu</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ville
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
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
                  {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{lead.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{lead.email}</div>
                        <div className="text-sm text-gray-500">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                          className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(lead.status)}`}
                        >
                          <option value="nouveau">Nouveau</option>
                          <option value="contacté">Contacté</option>
                          <option value="devis envoyé">Devis envoyé</option>
                          <option value="converti">Converti</option>
                          <option value="perdu">Perdu</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => {
                              setSelectedLead(lead);
                              setIsEditModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deleteLead(lead.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <p className="text-lg font-medium">Aucune demande de devis</p>
                          <p className="text-sm mt-2">Les nouvelles demandes apparaîtront automatiquement dans ce tableau</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cities Tab */}
        {activeTab === 'cities' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Gestion des pages ville</h3>
                    <p className="text-sm text-gray-600 mt-1">Créez et gérez vos pages ville pour le référencement local</p>
                  </div>
                  <button 
                    onClick={() => setIsNewCityModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Ajouter une ville</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ville
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        URL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visites (30j)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Leads générés
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Taux conversion
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
                    {cityPages.length > 0 ? cityPages.map((city, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{city.name}</div>
                          <div className="text-sm text-gray-500">{city.content.localInfo.codePostal} - {city.content.localInfo.departement}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-600">/electricien-{city.slug}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {city.visits.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {city.leads}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {city.visits > 0 ? ((city.leads / city.visits) * 100).toFixed(1) : '0'}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <span className="font-medium">{city.distanceFromBase || 0}km</span>
                            <div className="text-xs text-gray-500">
                              {city.depannagePrice || getPriceForDistance(city.distanceFromBase || 0)}€ HT
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={city.status}
                            onChange={(e) => updateCityStatus(city.id, e.target.value as CityPage['status'])}
                            className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${
                              city.status === 'active' ? 'bg-green-100 text-green-800' :
                              city.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <option value="active">Active</option>
                            <option value="draft">Brouillon</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => window.open(`/electricien-${city.slug}`, '_blank')}
                              className="text-blue-600 hover:text-blue-900"
                              title="Voir la page"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedCity(city);
                                setIsCityModalOpen(true);
                              }}
                              className="text-green-600 hover:text-green-900"
                              title="Modifier"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => cloneCity(city)}
                              className="text-purple-600 hover:text-purple-900"
                              title="Cloner"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => deleteCity(city.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Supprimer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <div className="text-gray-500">
                            <p className="text-lg font-medium">Aucune page ville configurée</p>
                            <p className="text-sm mt-2">Ajoutez des pages ville pour améliorer votre référencement local</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Guide SEO */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">💡 Guide pour le référencement local</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <h5 className="font-medium mb-2">Bonnes pratiques :</h5>
                  <ul className="space-y-1">
                    <li>• Créez une page par ville importante</li>
                    <li>• Utilisez le nom de la ville dans le titre</li>
                    <li>• Ajoutez du contenu local spécifique</li>
                    <li>• Optimisez les méta-descriptions</li>
                    <li>• Les villes sont automatiquement liées depuis l'accueil</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Villes prioritaires :</h5>
                  <ul className="space-y-1">
                    <li>• Versailles (85k habitants)</li>
                    <li>• Guyancourt (30k habitants)</li>
                    <li>• Montigny-le-Bretonneux (35k habitants)</li>
                    <li>• Trappes (30k habitants)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium mb-2">🔗 Redirections automatiques</p>
                <p className="text-green-700 text-sm">
                  Toutes les villes du tableau "Principales villes desservies" sur la page d'accueil 
                  redirigent automatiquement vers leurs pages dédiées. Créez simplement une page 
                  avec le bon slug (ex: "versailles" pour Versailles) et elle sera accessible !
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestion du contenu</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Pages principales</h4>
                  <div className="space-y-2">
                    {['Accueil', 'Services', 'Contact', 'À propos'].map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-900">{page}</span>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Pages légales</h4>
                  <div className="space-y-2">
                    {['Mentions légales', 'Politique de confidentialité', 'CGV'].map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-900">{page}</span>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de détail lead */}
      {isEditModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Détails de la demande</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <p className="text-gray-900">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <p className="text-gray-900">{selectedLead.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <p className="text-gray-900">{selectedLead.city}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <p className="text-gray-900">{selectedLead.service}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">{selectedLead.date}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedLead.message}</p>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedLead.status)}`}>
                  {selectedLead.status}
                </span>
                <div className="flex space-x-2">
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Appeler
                  </a>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'édition ville */}
      {isCityModalOpen && selectedCity && (
        <CityEditModal 
          city={selectedCity}
          onSave={saveCityChanges}
          onClose={() => {
            setIsCityModalOpen(false);
            setSelectedCity(null);
          }}
        />
      )}

      {/* Modal nouvelle ville */}
      {isNewCityModalOpen && (
        <NewCityModal 
          onSave={createNewCity}
          onClose={() => setIsNewCityModalOpen(false)}
        />
      )}
    </div>
  );
};

// Composant modal d'édition de ville
const CityEditModal: React.FC<{
  city: CityPage;
  onSave: (city: CityPage) => void;
  onClose: () => void;
}> = ({ city, onSave, onClose }) => {
  const [editedCity, setEditedCity] = useState<CityPage>(city);

  const handleSave = () => {
    onSave(editedCity);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Modifier la page ville : {city.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la ville</label>
              <input
                type="text"
                value={editedCity.name}
                onChange={(e) => setEditedCity({...editedCity, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
              <input
                type="text"
                value={editedCity.content.localInfo.codePostal}
                onChange={(e) => setEditedCity({
                  ...editedCity, 
                  content: {
                    ...editedCity.content,
                    localInfo: {...editedCity.content.localInfo, codePostal: e.target.value}
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Distance et prix */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-3">Tarification dépannage</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distance depuis Magny-les-Hameaux (km)</label>
                <input
                  type="number"
                  value={editedCity.distanceFromBase || 0}
                  onChange={(e) => setEditedCity({...editedCity, distanceFromBase: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix dépannage personnalisé (€ HT)</label>
                <input
                  type="number"
                  value={editedCity.depannagePrice || ''}
                  onChange={(e) => setEditedCity({...editedCity, depannagePrice: parseInt(e.target.value) || undefined})}
                  placeholder="Laissez vide pour prix automatique"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="80"
                  max="200"
                />
              </div>
            </div>
            <div className="mt-3 p-3 bg-white rounded border">
              <p className="text-sm text-gray-600">
                <strong>Prix automatique selon la distance :</strong>
                <br />• 0-5km : 110€ HT
                <br />• 5-10km : 130€ HT  
                <br />• 10-15km : 150€ HT
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre SEO</label>
            <input
              type="text"
              value={editedCity.title}
              onChange={(e) => setEditedCity({...editedCity, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Méta-description</label>
            <textarea
              value={editedCity.metaDescription}
              onChange={(e) => setEditedCity({...editedCity, metaDescription: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre héro</label>
            <input
              type="text"
              value={editedCity.content.heroTitle}
              onChange={(e) => setEditedCity({
                ...editedCity,
                content: {...editedCity.content, heroTitle: e.target.value}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre héro</label>
            <input
              type="text"
              value={editedCity.content.heroSubtitle}
              onChange={(e) => setEditedCity({
                ...editedCity,
                content: {...editedCity.content, heroSubtitle: e.target.value}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant modal nouvelle ville
const NewCityModal: React.FC<{
  onSave: (city: Partial<CityPage>) => void;
  onClose: () => void;
}> = ({ onSave, onClose }) => {
  const [newCity, setNewCity] = useState({
    name: '',
    codePostal: '',
    population: ''
  });

  const handleSave = () => {
    if (!newCity.name.trim()) {
      alert('Le nom de la ville est obligatoire');
      return;
    }
    
    onSave({
      name: newCity.name,
      content: {
        localInfo: {
          codePostal: newCity.codePostal,
          population: newCity.population,
          departement: 'Yvelines'
        }
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Créer une nouvelle page ville</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la ville *</label>
            <input
              type="text"
              value={newCity.name}
              onChange={(e) => setNewCity({...newCity, name: e.target.value})}
              placeholder="Ex: Versailles"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
              <input
                type="text"
                value={newCity.codePostal}
                onChange={(e) => setNewCity({...newCity, codePostal: e.target.value})}
                placeholder="Ex: 78000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Population</label>
              <input
                type="text"
                value={newCity.population}
                onChange={(e) => setNewCity({...newCity, population: e.target.value})}
                placeholder="Ex: 85 000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Aperçu :</strong> La page sera créée avec l'URL <code>/electricien-{newCity.name.toLowerCase().replace(/\s+/g, '-')}</code>
            </p>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Créer la page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
};

export default AdminDashboard;