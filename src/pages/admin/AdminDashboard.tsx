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
        },
        // Nouvelles villes - Zone proximité (110€ HT)
        {
          id: 'voisins-le-bretonneux',
          name: 'Voisins-le-Bretonneux',
          slug: 'voisins-le-bretonneux',
          title: 'Électricien Voisins-le-Bretonneux - Dépannage électrique 78960',
          metaDescription: 'Électricien expert à Voisins-le-Bretonneux (78960). Service de dépannage électrique rapide et professionnel. Tarif 110€ HT zone proximité.',
          content: {
            heroTitle: 'Électricien à Voisins-le-Bretonneux',
            heroSubtitle: 'Dépannage électrique rapide - Tarif 110€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '13500',
              codePostal: '78960',
              departement: 'Yvelines'
            }
          },
          visits: 1180,
          leads: 42,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 3,
          depannagePrice: 110
        },
        {
          id: 'milion-la-chapelle',
          name: 'Milion La Chapelle',
          slug: 'milion-la-chapelle',
          title: 'Électricien Milion La Chapelle - Service électrique 78470',
          metaDescription: 'Électricien professionnel à Milion La Chapelle (78470). Interventions électriques rapides et sécurisées. Tarif 110€ HT.',
          content: {
            heroTitle: 'Électricien à Milion La Chapelle',
            heroSubtitle: 'Service électrique de qualité - Tarif 110€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '1200',
              codePostal: '78470',
              departement: 'Yvelines'
            }
          },
          visits: 320,
          leads: 11,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 4,
          depannagePrice: 110
        },
        {
          id: 'saint-lambert',
          name: 'St Lambert',
          slug: 'saint-lambert',
          title: 'Électricien St Lambert - Réparation électrique 78470',
          metaDescription: 'Électricien à St Lambert (78470) pour tous vos besoins électriques. Intervention sous 2h en zone proximité. Tarif 110€ HT.',
          content: {
            heroTitle: 'Électricien à St Lambert',
            heroSubtitle: 'Réparation électrique professionnelle - Tarif 110€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '800',
              codePostal: '78470',
              departement: 'Yvelines'
            }
          },
          visits: 280,
          leads: 9,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 4,
          depannagePrice: 110
        },
        {
          id: 'le-chesnay',
          name: 'Le Chesnay',
          slug: 'le-chesnay',
          title: 'Électricien Le Chesnay - Dépannage électrique 78150',
          metaDescription: 'Électricien Le Chesnay (78150). Service de dépannage électrique professionnel. Installation et réparation. Tarif 110€ HT.',
          content: {
            heroTitle: 'Électricien au Chesnay',
            heroSubtitle: 'Dépannage électrique 24h/24 - Tarif 110€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '29000',
              codePostal: '78150',
              departement: 'Yvelines'
            }
          },
          visits: 1350,
          leads: 48,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 5,
          depannagePrice: 110
        },
        {
          id: 'guyancourt',
          name: 'Guyancourt',
          slug: 'guyancourt',
          title: 'Électricien Guyancourt - Installation électrique 78280',
          metaDescription: 'Électricien professionnel à Guyancourt (78280). Installation et dépannage électrique. Intervention rapide. Tarif 110€ HT.',
          content: {
            heroTitle: 'Électricien à Guyancourt',
            heroSubtitle: 'Installation électrique professionnelle - Tarif 110€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '29000',
              codePostal: '78280',
              departement: 'Yvelines'
            }
          },
          visits: 1320,
          leads: 46,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 5,
          depannagePrice: 110
        },
        // Zone intermédiaire (130€ HT)
        {
          id: 'montigny-le-bretonneux',
          name: 'Montigny-le-Bretonneux',
          slug: 'montigny-le-bretonneux',
          title: 'Électricien Montigny-le-Bretonneux - Dépannage 78180',
          metaDescription: 'Électricien professionnel à Montigny-le-Bretonneux (78180). Dépannage électrique rapide et efficace. Tarif 130€ HT.',
          content: {
            heroTitle: 'Électricien à Montigny-le-Bretonneux',
            heroSubtitle: 'Dépannage électrique efficace - Tarif 130€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '34000',
              codePostal: '78180',
              departement: 'Yvelines'
            }
          },
          visits: 1450,
          leads: 52,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 6,
          depannagePrice: 130
        },
        {
          id: 'elancourt',
          name: 'Élancourt',
          slug: 'elancourt',
          title: 'Électricien Élancourt - Installation électrique 78990',
          metaDescription: 'Électricien à Élancourt (78990). Installation et rénovation électrique. Service professionnel. Tarif 130€ HT.',
          content: {
            heroTitle: 'Électricien à Élancourt',
            heroSubtitle: 'Installation électrique moderne - Tarif 130€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '26000',
              codePostal: '78990',
              departement: 'Yvelines'
            }
          },
          visits: 1180,
          leads: 41,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 8,
          depannagePrice: 130
        },
        {
          id: 'buc',
          name: 'Buc',
          slug: 'buc',
          title: 'Électricien Buc - Dépannage électrique 78530',
          metaDescription: 'Électricien à Buc (78530). Dépannage électrique rapide et professionnel. Service 24h/24. Tarif 130€ HT.',
          content: {
            heroTitle: 'Électricien à Buc',
            heroSubtitle: 'Dépannage électrique 24h/24 - Tarif 130€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '6000',
              codePostal: '78530',
              departement: 'Yvelines'
            }
          },
          visits: 520,
          leads: 18,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 8,
          depannagePrice: 130
        },
        {
          id: 'gif-sur-yvette',
          name: 'Gif-sur-Yvette',
          slug: 'gif-sur-yvette',
          title: 'Électricien Gif-sur-Yvette - Dépannage 91190',
          metaDescription: 'Électricien Gif-sur-Yvette (91190). Dépannage et maintenance électrique experte. Tarif zone intermédiaire 130€ HT.',
          content: {
            heroTitle: 'Électricien à Gif-sur-Yvette',
            heroSubtitle: 'Dépannage électrique expert - Tarif 130€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '21000',
              codePostal: '91190',
              departement: 'Essonne'
            }
          },
          visits: 980,
          leads: 34,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 9,
          depannagePrice: 130
        },
        {
          id: 'saclay',
          name: 'Saclay',
          slug: 'saclay',
          title: 'Électricien Saclay - Dépannage électrique 91400',
          metaDescription: 'Électricien professionnel à Saclay (91400). Dépannage électrique pour particuliers et entreprises. Tarif 130€ HT.',
          content: {
            heroTitle: 'Électricien à Saclay',
            heroSubtitle: 'Dépannage électrique pro - Tarif 130€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '4000',
              codePostal: '91400',
              departement: 'Essonne'
            }
          },
          visits: 420,
          leads: 15,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 8,
          depannagePrice: 130
        },
        {
          id: 'viroflay',
          name: 'Viroflay',
          slug: 'viroflay',
          title: 'Électricien Viroflay - Service électrique 78220',
          metaDescription: 'Électricien Viroflay (78220). Service électrique professionnel et de confiance. Tarif zone intermédiaire 130€ HT.',
          content: {
            heroTitle: 'Électricien à Viroflay',
            heroSubtitle: 'Service électrique confiance - Tarif 130€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '15500',
              codePostal: '78220',
              departement: 'Yvelines'
            }
          },
          visits: 780,
          leads: 27,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 9,
          depannagePrice: 130
        },
        // Zone étendue (150€ HT)
        {
          id: 'trappes',
          name: 'Trappes',
          slug: 'trappes',
          title: 'Électricien Trappes - Service électrique 78190',
          metaDescription: 'Électricien professionnel à Trappes (78190). Service électrique complet et fiable. Zone étendue tarif 150€ HT.',
          content: {
            heroTitle: 'Électricien à Trappes',
            heroSubtitle: 'Service électrique fiable - Tarif 150€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '31000',
              codePostal: '78190',
              departement: 'Yvelines'
            }
          },
          visits: 1280,
          leads: 44,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 12,
          depannagePrice: 150
        },
        {
          id: 'plaisir',
          name: 'Plaisir',
          slug: 'plaisir',
          title: 'Électricien Plaisir - Dépannage électrique 78370',
          metaDescription: 'Électricien professionnel à Plaisir (78370). Dépannage électrique rapide et efficace. Tarif zone étendue 150€ HT.',
          content: {
            heroTitle: 'Électricien à Plaisir',
            heroSubtitle: 'Dépannage électrique Plaisir - Tarif 150€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '31000',
              codePostal: '78370',
              departement: 'Yvelines'
            }
          },
          visits: 1290,
          leads: 45,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 15,
          depannagePrice: 150
        },
        {
          id: 'bois-d-arcy',
          name: 'Bois d\'Arcy',
          slug: 'bois-d-arcy',
          title: 'Électricien Bois d\'Arcy - Installation électrique 78390',
          metaDescription: 'Électricien Bois d\'Arcy (78390). Installation et rénovation électrique professionnelle. Tarif 150€ HT zone étendue.',
          content: {
            heroTitle: 'Électricien à Bois d\'Arcy',
            heroSubtitle: 'Installation électrique sur mesure - Tarif 150€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '13500',
              codePostal: '78390',
              departement: 'Yvelines'
            }
          },
          visits: 720,
          leads: 25,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 13,
          depannagePrice: 150
        },
        {
          id: 'maurepas',
          name: 'Maurepas',
          slug: 'maurepas',
          title: 'Électricien Maurepas - Dépannage électrique 78310',
          metaDescription: 'Électricien Maurepas (78310). Dépannage électrique 24h/24 et service d\'urgence. Tarif 150€ HT.',
          content: {
            heroTitle: 'Électricien à Maurepas',
            heroSubtitle: 'Dépannage électrique 24h/24 - Tarif 150€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '19500',
              codePostal: '78310',
              departement: 'Yvelines'
            }
          },
          visits: 890,
          leads: 31,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 13,
          depannagePrice: 150
        },
        {
          id: 'coignieres',
          name: 'Coignières',
          slug: 'coignieres',
          title: 'Électricien Coignières - Installation électrique 78310',
          metaDescription: 'Électricien Coignières (78310). Installation et rénovation électrique professionnelle. Tarif 150€ HT.',
          content: {
            heroTitle: 'Électricien à Coignières',
            heroSubtitle: 'Rénovation électrique pro - Tarif 150€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '4500',
              codePostal: '78310',
              departement: 'Yvelines'
            }
          },
          visits: 420,
          leads: 14,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 14,
          depannagePrice: 150
        },
        {
          id: 'les-clayes-sous-bois',
          name: 'Les Clayes-sous-bois',
          slug: 'les-clayes-sous-bois',
          title: 'Électricien Les Clayes-sous-bois - Installation 78340',
          metaDescription: 'Électricien Les Clayes-sous-bois (78340). Installation et maintenance électrique professionnelle. Tarif 150€ HT.',
          content: {
            heroTitle: 'Électricien aux Clayes-sous-bois',
            heroSubtitle: 'Installation électrique pro - Tarif 150€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '17500',
              codePostal: '78340',
              departement: 'Yvelines'
            }
          },
          visits: 820,
          leads: 28,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 15,
          depannagePrice: 150
        },
        {
          id: 'orsay',
          name: 'Orsay',
          slug: 'orsay',
          title: 'Électricien Orsay - Service électrique 91400',
          metaDescription: 'Électricien Orsay (91400). Service électrique complet pour résidentiel et tertiaire. Tarif 150€ HT.',
          content: {
            heroTitle: 'Électricien à Orsay',
            heroSubtitle: 'Service électrique résidentiel - Tarif 150€ HT',
            services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
            testimonials: [],
            localInfo: {
              population: '16000',
              codePostal: '91400',
              departement: 'Essonne'
            }
          },
          visits: 780,
          leads: 27,
          status: 'active' as const,
          createdAt: '2025-01-27T10:00:00Z',
          updatedAt: '2025-01-27T10:00:00Z',
          distanceFromBase: 12,
          depannagePrice: 150
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
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {city.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{city.distanceFromBase || 0} km</div>
                          <div className="text-sm text-gray-500">{city.depannagePrice || 110}€ HT</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{city.visits} visites</div>
                          <div className="text-sm text-green-600">{city.leads} leads</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/ville/${city.slug}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleEditCity(city)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleToggleStatus(city.id)}
                              className={`${
                                city.status === 'active' 
                                  ? 'text-red-600 hover:text-red-900' 
                                  : 'text-green-600 hover:text-green-900'
                              }`}
                            >
                              {city.status === 'active' ? <X className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => handleDeleteCity(city.id)}
                              className="text-red-600 hover:text-red-900"
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
          )}

          {/* Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytiques</h1>
                <p className="text-gray-600">Analyse detaillee des performances</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance par zone</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Zone proximité (110€)</span>
                      <span className="text-sm text-gray-900">
                        {cityPages.filter(c => c.depannagePrice === 110).reduce((sum, c) => sum + c.visits, 0)} visites
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Zone intermédiaire (130€)</span>
                      <span className="text-sm text-gray-900">
                        {cityPages.filter(c => c.depannagePrice === 130).reduce((sum, c) => sum + c.visits, 0)} visites
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Zone étendue (150€)</span>
                      <span className="text-sm text-gray-900">
                        {cityPages.filter(c => c.depannagePrice === 150).reduce((sum, c) => sum + c.visits, 0)} visites
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Taux de conversion par zone</h2>
                  <div className="space-y-4">
                    {[110, 130, 150].map(price => {
                      const zoneCities = cityPages.filter(c => c.depannagePrice === price);
                      const totalVisits = zoneCities.reduce((sum, c) => sum + c.visits, 0);
                      const totalLeads = zoneCities.reduce((sum, c) => sum + c.leads, 0);
                      const conversionRate = totalVisits > 0 ? (totalLeads / totalVisits) * 100 : 0;
                      
                      return (
                        <div key={price} className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">
                            Zone {price === 110 ? 'proximité' : price === 130 ? 'intermédiaire' : 'étendue'}
                          </span>
                          <span className="text-sm text-gray-900">{conversionRate.toFixed(1)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
                <p className="text-gray-600">Configuration du système</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Paramètres généraux</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom de l'entreprise</label>
                    <input
                      type="text"
                      defaultValue="LS COM"
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email de contact</label>
                    <input
                      type="email"
                      defaultValue="contact@lscom.fr"
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input
                      type="tel"
                      defaultValue="01 23 45 67 89"
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Modal Ajouter/Modifier ville */}
        {showAddCity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom de la ville *
                    </label>
                    <input
                      type="text"
                      value={newCity.name}
                      onChange={(e) => {
                        setNewCity({ ...newCity, name: e.target.value });
                        if (!editingCity) {
                          setNewCity(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                        }
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Versailles"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug URL *
                    </label>
                    <input
                      type="text"
                      value={newCity.slug}
                      onChange={(e) => setNewCity({ ...newCity, slug: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: versailles"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Code postal
                    </label>
                    <input
                      type="text"
                      value={newCity.codePostal}
                      onChange={(e) => setNewCity({ ...newCity, codePostal: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 78000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Population
                    </label>
                    <input
                      type="text"
                      value={newCity.population}
                      onChange={(e) => setNewCity({ ...newCity, population: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 85 000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distance de la base (km)
                    </label>
                    <input
                      type="number"
                      value={newCity.distanceFromBase}
                      onChange={(e) => setNewCity({ ...newCity, distanceFromBase: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 8"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prix dépannage (€ HT)
                    </label>
                    <select
                      value={newCity.depannagePrice}
                      onChange={(e) => setNewCity({ ...newCity, depannagePrice: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={110}>110€ HT (Zone proximité)</option>
                      <option value={130}>130€ HT (Zone intermédiaire)</option>
                      <option value={150}>150€ HT (Zone étendue)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre de la page
                  </label>
                  <input
                    type="text"
                    value={newCity.title}
                    onChange={(e) => setNewCity({ ...newCity, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Électricien à Versailles - LS COM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta description
                  </label>
                  <textarea
                    value={newCity.metaDescription}
                    onChange={(e) => setNewCity({ ...newCity, metaDescription: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Description pour les moteurs de recherche..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre hero
                  </label>
                  <input
                    type="text"
                    value={newCity.heroTitle}
                    onChange={(e) => setNewCity({ ...newCity, heroTitle: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Électricien à Versailles"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sous-titre hero
                  </label>
                  <input
                    type="text"
                    value={newCity.heroSubtitle}
                    onChange={(e) => setNewCity({ ...newCity, heroSubtitle: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Votre électricien professionnel de confiance"
                  />
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
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingCity ? 'Mettre à jour' : 'Ajouter'}</span>
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