import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Filter,
  Download,
  BarChart3,
  Settings,
  LogOut,
  Euro,
  Clock,
  Star
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { CityPage, AdminStats, DistancePricing } from '../../types/admin';

// Données initiales complètes avec toutes les villes (41 villes au total)
const initialCities: CityPage[] = [
  // Zone proximité (0-5km) - 110€ HT
  {
    id: '1',
    name: 'Magny-les-Hameaux',
    slug: 'magny-les-hameaux',
    title: 'Électricien à Magny-les-Hameaux - LS COM | Installation, Dépannage, Conformité',
    metaDescription: 'LS COM, électricien professionnel à Magny-les-Hameaux (78114). Installation électrique, dépannage 110€ HT, mise en conformité, bornes IRVE. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Magny-les-Hameaux',
      heroSubtitle: 'Votre électricien professionnel de confiance à Magny-les-Hameaux',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '9 500',
        codePostal: '78114',
        departement: 'Yvelines'
      }
    },
    visits: 2850,
    leads: 98,
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-12-20',
    distanceFromBase: 0,
    depannagePrice: 110
  },
  {
    id: '2',
    name: 'Voisins-le-Bretonneux',
    slug: 'voisins-le-bretonneux',
    title: 'Électricien à Voisins-le-Bretonneux - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Voisins-le-Bretonneux (78960). Installation électrique, dépannage 110€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Voisins-le-Bretonneux',
      heroSubtitle: 'Votre électricien professionnel de confiance à Voisins-le-Bretonneux',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '13 500',
        codePostal: '78960',
        departement: 'Yvelines'
      }
    },
    visits: 1890,
    leads: 67,
    status: 'active',
    createdAt: '2024-01-20',
    updatedAt: '2024-12-20',
    distanceFromBase: 3,
    depannagePrice: 110
  },
  {
    id: '3',
    name: 'Milion La Chapelle',
    slug: 'milion-la-chapelle',
    title: 'Électricien à Milion La Chapelle - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Milion La Chapelle (78470). Installation électrique, dépannage 110€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Milion La Chapelle',
      heroSubtitle: 'Votre électricien professionnel de confiance à Milion La Chapelle',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '2 800',
        codePostal: '78470',
        departement: 'Yvelines'
      }
    },
    visits: 420,
    leads: 15,
    status: 'active',
    createdAt: '2024-01-25',
    updatedAt: '2024-12-20',
    distanceFromBase: 4,
    depannagePrice: 110
  },
  {
    id: '4',
    name: 'Chevreuse',
    slug: 'chevreuse',
    title: 'Électricien à Chevreuse - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Chevreuse (78460). Installation électrique, dépannage 110€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Chevreuse',
      heroSubtitle: 'Votre électricien professionnel de confiance à Chevreuse',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '5 500',
        codePostal: '78460',
        departement: 'Yvelines'
      }
    },
    visits: 780,
    leads: 28,
    status: 'active',
    createdAt: '2024-02-01',
    updatedAt: '2024-12-20',
    distanceFromBase: 5,
    depannagePrice: 110
  },
  {
    id: '5',
    name: 'Guyancourt',
    slug: 'guyancourt',
    title: 'Électricien à Guyancourt - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Guyancourt (78280). Installation électrique, dépannage 110€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Guyancourt',
      heroSubtitle: 'Votre électricien professionnel de confiance à Guyancourt',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '30 000',
        codePostal: '78280',
        departement: 'Yvelines'
      }
    },
    visits: 4200,
    leads: 145,
    status: 'active',
    createdAt: '2024-02-05',
    updatedAt: '2024-12-20',
    distanceFromBase: 4,
    depannagePrice: 110
  },
  {
    id: '6',
    name: 'Châteaufort',
    slug: 'chateaufort',
    title: 'Électricien à Châteaufort - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Châteaufort (78117). Installation électrique, dépannage 110€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Châteaufort',
      heroSubtitle: 'Votre électricien professionnel de confiance à Châteaufort',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '1 400',
        codePostal: '78117',
        departement: 'Yvelines'
      }
    },
    visits: 210,
    leads: 8,
    status: 'active',
    createdAt: '2024-02-10',
    updatedAt: '2024-12-20',
    distanceFromBase: 3,
    depannagePrice: 110
  },
  {
    id: '7',
    name: 'Toussus-le-Noble',
    slug: 'toussus-le-noble',
    title: 'Électricien à Toussus-le-Noble - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Toussus-le-Noble (78117). Installation électrique, dépannage 110€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Toussus-le-Noble',
      heroSubtitle: 'Votre électricien professionnel de confiance à Toussus-le-Noble',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '1 200',
        codePostal: '78117',
        departement: 'Yvelines'
      }
    },
    visits: 180,
    leads: 6,
    status: 'active',
    createdAt: '2024-02-15',
    updatedAt: '2024-12-20',
    distanceFromBase: 5,
    depannagePrice: 110
  },
  {
    id: '8',
    name: 'Les Loges-en-Josas',
    slug: 'les-loges-en-josas',
    title: 'Électricien aux Loges-en-Josas - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel aux Loges-en-Josas (78350). Installation électrique, dépannage 110€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien aux Loges-en-Josas',
      heroSubtitle: 'Votre électricien professionnel de confiance aux Loges-en-Josas',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '1 500',
        codePostal: '78350',
        departement: 'Yvelines'
      }
    },
    visits: 225,
    leads: 9,
    status: 'active',
    createdAt: '2024-02-20',
    updatedAt: '2024-12-20',
    distanceFromBase: 4,
    depannagePrice: 110
  },

  // Zone intermédiaire (5-10km) - 130€ HT
  {
    id: '9',
    name: 'Montigny-le-Bretonneux',
    slug: 'montigny-le-bretonneux',
    title: 'Électricien à Montigny-le-Bretonneux - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Montigny-le-Bretonneux (78180). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Montigny-le-Bretonneux',
      heroSubtitle: 'Votre électricien professionnel de confiance à Montigny-le-Bretonneux',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '35 000',
        codePostal: '78180',
        departement: 'Yvelines'
      }
    },
    visits: 4900,
    leads: 168,
    status: 'active',
    createdAt: '2024-02-25',
    updatedAt: '2024-12-20',
    distanceFromBase: 7,
    depannagePrice: 130
  },
  {
    id: '10',
    name: 'Élancourt',
    slug: 'elancourt',
    title: 'Électricien à Élancourt - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Élancourt (78990). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Élancourt',
      heroSubtitle: 'Votre électricien professionnel de confiance à Élancourt',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '26 000',
        codePostal: '78990',
        departement: 'Yvelines'
      }
    },
    visits: 3640,
    leads: 125,
    status: 'active',
    createdAt: '2024-03-01',
    updatedAt: '2024-12-20',
    distanceFromBase: 8,
    depannagePrice: 130
  },
  {
    id: '11',
    name: 'Le Chesnay',
    slug: 'le-chesnay',
    title: 'Électricien au Chesnay - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel au Chesnay (78150). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien au Chesnay',
      heroSubtitle: 'Votre électricien professionnel de confiance au Chesnay',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '30 000',
        codePostal: '78150',
        departement: 'Yvelines'
      }
    },
    visits: 4200,
    leads: 144,
    status: 'active',
    createdAt: '2024-03-05',
    updatedAt: '2024-12-20',
    distanceFromBase: 9,
    depannagePrice: 130
  },
  {
    id: '12',
    name: 'Jouy-en-Josas',
    slug: 'jouy-en-josas',
    title: 'Électricien à Jouy-en-Josas - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Jouy-en-Josas (78350). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Jouy-en-Josas',
      heroSubtitle: 'Votre électricien professionnel de confiance à Jouy-en-Josas',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '8 000',
        codePostal: '78350',
        departement: 'Yvelines'
      }
    },
    visits: 1120,
    leads: 38,
    status: 'active',
    createdAt: '2024-03-10',
    updatedAt: '2024-12-20',
    distanceFromBase: 6,
    depannagePrice: 130
  },
  {
    id: '13',
    name: 'Buc',
    slug: 'buc',
    title: 'Électricien à Buc - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Buc (78530). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Buc',
      heroSubtitle: 'Votre électricien professionnel de confiance à Buc',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '6 000',
        codePostal: '78530',
        departement: 'Yvelines'
      }
    },
    visits: 840,
    leads: 29,
    status: 'active',
    createdAt: '2024-03-15',
    updatedAt: '2024-12-20',
    distanceFromBase: 7,
    depannagePrice: 130
  },
  {
    id: '14',
    name: 'Gif-sur-Yvette',
    slug: 'gif-sur-yvette',
    title: 'Électricien à Gif-sur-Yvette - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Gif-sur-Yvette (91190). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Gif-sur-Yvette',
      heroSubtitle: 'Votre électricien professionnel de confiance à Gif-sur-Yvette',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '21 000',
        codePostal: '91190',
        departement: 'Essonne'
      }
    },
    visits: 2940,
    leads: 101,
    status: 'active',
    createdAt: '2024-03-20',
    updatedAt: '2024-12-20',
    distanceFromBase: 8,
    depannagePrice: 130
  },
  {
    id: '15',
    name: 'Saclay',
    slug: 'saclay',
    title: 'Électricien à Saclay - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Saclay (91400). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Saclay',
      heroSubtitle: 'Votre électricien professionnel de confiance à Saclay',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '4 000',
        codePostal: '91400',
        departement: 'Essonne'
      }
    },
    visits: 560,
    leads: 19,
    status: 'active',
    createdAt: '2024-03-25',
    updatedAt: '2024-12-20',
    distanceFromBase: 9,
    depannagePrice: 130
  },
  {
    id: '16',
    name: 'Viroflay',
    slug: 'viroflay',
    title: 'Électricien à Viroflay - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Viroflay (78220). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Viroflay',
      heroSubtitle: 'Votre électricien professionnel de confiance à Viroflay',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '16 000',
        codePostal: '78220',
        departement: 'Yvelines'
      }
    },
    visits: 2240,
    leads: 77,
    status: 'active',
    createdAt: '2024-03-30',
    updatedAt: '2024-12-20',
    distanceFromBase: 10,
    depannagePrice: 130
  },
  {
    id: '17',
    name: 'Dampierre-en-Yvelines',
    slug: 'dampierre-en-yvelines',
    title: 'Électricien à Dampierre-en-Yvelines - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Dampierre-en-Yvelines (78720). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Dampierre-en-Yvelines',
      heroSubtitle: 'Votre électricien professionnel de confiance à Dampierre-en-Yvelines',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '1 100',
        codePostal: '78720',
        departement: 'Yvelines'
      }
    },
    visits: 154,
    leads: 5,
    status: 'active',
    createdAt: '2024-04-01',
    updatedAt: '2024-12-20',
    distanceFromBase: 8,
    depannagePrice: 130
  },

  // Zone étendue (10-15km) - 150€ HT
  {
    id: '18',
    name: 'Versailles',
    slug: 'versailles',
    title: 'Électricien à Versailles - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Versailles (78000). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Versailles',
      heroSubtitle: 'Votre électricien professionnel de confiance à Versailles',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '85 000',
        codePostal: '78000',
        departement: 'Yvelines'
      }
    },
    visits: 11900,
    leads: 408,
    status: 'active',
    createdAt: '2024-04-05',
    updatedAt: '2024-12-20',
    distanceFromBase: 12,
    depannagePrice: 150
  },
  {
    id: '19',
    name: 'Trappes',
    slug: 'trappes',
    title: 'Électricien à Trappes - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Trappes (78190). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Trappes',
      heroSubtitle: 'Votre électricien professionnel de confiance à Trappes',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '30 000',
        codePostal: '78190',
        departement: 'Yvelines'
      }
    },
    visits: 4200,
    leads: 144,
    status: 'active',
    createdAt: '2024-04-10',
    updatedAt: '2024-12-20',
    distanceFromBase: 11,
    depannagePrice: 150
  },
  {
    id: '20',
    name: 'Plaisir',
    slug: 'plaisir',
    title: 'Électricien à Plaisir - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Plaisir (78370). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Plaisir',
      heroSubtitle: 'Votre électricien professionnel de confiance à Plaisir',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '31 000',
        codePostal: '78370',
        departement: 'Yvelines'
      }
    },
    visits: 4340,
    leads: 149,
    status: 'active',
    createdAt: '2024-04-15',
    updatedAt: '2024-12-20',
    distanceFromBase: 13,
    depannagePrice: 150
  },
  {
    id: '21',
    name: 'Bois d\'Arcy',
    slug: 'bois-d-arcy',
    title: 'Électricien à Bois d\'Arcy - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Bois d\'Arcy (78390). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Bois d\'Arcy',
      heroSubtitle: 'Votre électricien professionnel de confiance à Bois d\'Arcy',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '14 000',
        codePostal: '78390',
        departement: 'Yvelines'
      }
    },
    visits: 1960,
    leads: 67,
    status: 'active',
    createdAt: '2024-04-20',
    updatedAt: '2024-12-20',
    distanceFromBase: 14,
    depannagePrice: 150
  },
  {
    id: '22',
    name: 'Maurepas',
    slug: 'maurepas',
    title: 'Électricien à Maurepas - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Maurepas (78310). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Maurepas',
      heroSubtitle: 'Votre électricien professionnel de confiance à Maurepas',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '20 000',
        codePostal: '78310',
        departement: 'Yvelines'
      }
    },
    visits: 2800,
    leads: 96,
    status: 'active',
    createdAt: '2024-04-25',
    updatedAt: '2024-12-20',
    distanceFromBase: 12,
    depannagePrice: 150
  },
  {
    id: '23',
    name: 'Coignières',
    slug: 'coignieres',
    title: 'Électricien à Coignières - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Coignières (78310). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Coignières',
      heroSubtitle: 'Votre électricien professionnel de confiance à Coignières',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '4 500',
        codePostal: '78310',
        departement: 'Yvelines'
      }
    },
    visits: 630,
    leads: 22,
    status: 'active',
    createdAt: '2024-04-30',
    updatedAt: '2024-12-20',
    distanceFromBase: 13,
    depannagePrice: 150
  },
  {
    id: '24',
    name: 'Les Clayes-sous-Bois',
    slug: 'les-clayes-sous-bois',
    title: 'Électricien aux Clayes-sous-Bois - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel aux Clayes-sous-Bois (78340). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien aux Clayes-sous-Bois',
      heroSubtitle: 'Votre électricien professionnel de confiance aux Clayes-sous-Bois',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '18 000',
        codePostal: '78340',
        departement: 'Yvelines'
      }
    },
    visits: 2520,
    leads: 86,
    status: 'active',
    createdAt: '2024-05-01',
    updatedAt: '2024-12-20',
    distanceFromBase: 15,
    depannagePrice: 150
  },
  {
    id: '25',
    name: 'Orsay',
    slug: 'orsay',
    title: 'Électricien à Orsay - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Orsay (91400). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Orsay',
      heroSubtitle: 'Votre électricien professionnel de confiance à Orsay',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '17 000',
        codePostal: '91400',
        departement: 'Essonne'
      }
    },
    visits: 2380,
    leads: 82,
    status: 'active',
    createdAt: '2024-05-05',
    updatedAt: '2024-12-20',
    distanceFromBase: 14,
    depannagePrice: 150
  },
  // Nouvelles villes ajoutées
  {
    id: '26',
    name: 'Saint-Lambert',
    slug: 'saint-lambert',
    title: 'Électricien à Saint-Lambert - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Saint-Lambert (78470). Installation électrique, dépannage 110€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Saint-Lambert',
      heroSubtitle: 'Votre électricien professionnel de confiance à Saint-Lambert',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '1 200',
        codePostal: '78470',
        departement: 'Yvelines'
      }
    },
    visits: 168,
    leads: 6,
    status: 'active',
    createdAt: '2024-05-10',
    updatedAt: '2024-12-20',
    distanceFromBase: 4,
    depannagePrice: 110
  },
  {
    id: '27',
    name: 'Milon La Chapelle',
    slug: 'milon-la-chapelle',
    title: 'Électricien à Milon La Chapelle - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Milon La Chapelle (78470). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Milon La Chapelle',
      heroSubtitle: 'Votre électricien professionnel de confiance à Milon La Chapelle',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '2 800',
        codePostal: '78470',
        departement: 'Yvelines'
      }
    },
    visits: 392,
    leads: 13,
    status: 'active',
    createdAt: '2024-05-15',
    updatedAt: '2024-12-20',
    distanceFromBase: 6,
    depannagePrice: 130
  },
  {
    id: '28',
    name: 'Choisy',
    slug: 'choisy',
    title: 'Électricien à Choisy - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Choisy (78460). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Choisy',
      heroSubtitle: 'Votre électricien professionnel de confiance à Choisy',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '1 500',
        codePostal: '78460',
        departement: 'Yvelines'
      }
    },
    visits: 210,
    leads: 7,
    status: 'active',
    createdAt: '2024-05-20',
    updatedAt: '2024-12-20',
    distanceFromBase: 7,
    depannagePrice: 130
  },
  {
    id: '29',
    name: 'Toussus-le-Noble',
    slug: 'toussus-le-noble',
    title: 'Électricien à Toussus-le-Noble - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Toussus-le-Noble (78117). Installation électrique, dépannage 110€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Toussus-le-Noble',
      heroSubtitle: 'Votre électricien professionnel de confiance à Toussus-le-Noble',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '1 200',
        codePostal: '78117',
        departement: 'Yvelines'
      }
    },
    visits: 168,
    leads: 6,
    status: 'active',
    createdAt: '2024-05-25',
    updatedAt: '2024-12-20',
    distanceFromBase: 5,
    depannagePrice: 110
  },
  {
    id: '30',
    name: 'Saint-Aubin',
    slug: 'saint-aubin',
    title: 'Électricien à Saint-Aubin - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Saint-Aubin (91190). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Saint-Aubin',
      heroSubtitle: 'Votre électricien professionnel de confiance à Saint-Aubin',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '2 100',
        codePostal: '91190',
        departement: 'Essonne'
      }
    },
    visits: 294,
    leads: 10,
    status: 'active',
    createdAt: '2024-05-30',
    updatedAt: '2024-12-20',
    distanceFromBase: 8,
    depannagePrice: 130
  },
  {
    id: '31',
    name: 'Villiers-le-Bâcle',
    slug: 'villiers-le-bacle',
    title: 'Électricien à Villiers-le-Bâcle - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Villiers-le-Bâcle (91190). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Villiers-le-Bâcle',
      heroSubtitle: 'Votre électricien professionnel de confiance à Villiers-le-Bâcle',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '1 800',
        codePostal: '91190',
        departement: 'Essonne'
      }
    },
    visits: 252,
    leads: 9,
    status: 'active',
    createdAt: '2024-06-01',
    updatedAt: '2024-12-20',
    distanceFromBase: 9,
    depannagePrice: 130
  },
  {
    id: '32',
    name: 'Bailly',
    slug: 'bailly',
    title: 'Électricien à Bailly - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Bailly (78870). Installation électrique, dépannage 130€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Bailly',
      heroSubtitle: 'Votre électricien professionnel de confiance à Bailly',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '4 200',
        codePostal: '78870',
        departement: 'Yvelines'
      }
    },
    visits: 588,
    leads: 20,
    status: 'active',
    createdAt: '2024-06-05',
    updatedAt: '2024-12-20',
    distanceFromBase: 10,
    depannagePrice: 130
  },
  {
    id: '33',
    name: 'Noisy-le-Roi',
    slug: 'noisy-le-roi',
    title: 'Électricien à Noisy-le-Roi - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Noisy-le-Roi (78590). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Noisy-le-Roi',
      heroSubtitle: 'Votre électricien professionnel de confiance à Noisy-le-Roi',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '8 500',
        codePostal: '78590',
        departement: 'Yvelines'
      }
    },
    visits: 1190,
    leads: 41,
    status: 'active',
    createdAt: '2024-06-10',
    updatedAt: '2024-12-20',
    distanceFromBase: 12,
    depannagePrice: 150
  },
  {
    id: '34',
    name: 'Rennemoulin',
    slug: 'rennemoulin',
    title: 'Électricien à Rennemoulin - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Rennemoulin (78590). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Rennemoulin',
      heroSubtitle: 'Votre électricien professionnel de confiance à Rennemoulin',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '900',
        codePostal: '78590',
        departement: 'Yvelines'
      }
    },
    visits: 126,
    leads: 4,
    status: 'active',
    createdAt: '2024-06-15',
    updatedAt: '2024-12-20',
    distanceFromBase: 13,
    depannagePrice: 150
  },
  {
    id: '35',
    name: 'Forges-les-Bains',
    slug: 'forges-les-bains',
    title: 'Électricien à Forges-les-Bains - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Forges-les-Bains (91470). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Forges-les-Bains',
      heroSubtitle: 'Votre électricien professionnel de confiance à Forges-les-Bains',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '4 100',
        codePostal: '91470',
        departement: 'Essonne'
      }
    },
    visits: 574,
    leads: 20,
    status: 'active',
    createdAt: '2024-06-20',
    updatedAt: '2024-12-20',
    distanceFromBase: 14,
    depannagePrice: 150
  },
  {
    id: '36',
    name: 'Limours',
    slug: 'limours',
    title: 'Électricien à Limours - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Limours (91470). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Limours',
      heroSubtitle: 'Votre électricien professionnel de confiance à Limours',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '6 800',
        codePostal: '91470',
        departement: 'Essonne'
      }
    },
    visits: 952,
    leads: 33,
    status: 'active',
    createdAt: '2024-06-25',
    updatedAt: '2024-12-20',
    distanceFromBase: 15,
    depannagePrice: 150
  },
  {
    id: '37',
    name: 'Angervilliers',
    slug: 'angervilliers',
    title: 'Électricien à Angervilliers - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Angervilliers (91470). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Angervilliers',
      heroSubtitle: 'Votre électricien professionnel de confiance à Angervilliers',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '2 200',
        codePostal: '91470',
        departement: 'Essonne'
      }
    },
    visits: 308,
    leads: 11,
    status: 'active',
    createdAt: '2024-06-30',
    updatedAt: '2024-12-20',
    distanceFromBase: 14,
    depannagePrice: 150
  },
  {
    id: '38',
    name: 'Les Molières',
    slug: 'les-molieres',
    title: 'Électricien aux Molières - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel aux Molières (91470). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien aux Molières',
      heroSubtitle: 'Votre électricien professionnel de confiance aux Molières',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '1 900',
        codePostal: '91470',
        departement: 'Essonne'
      }
    },
    visits: 266,
    leads: 9,
    status: 'active',
    createdAt: '2024-07-01',
    updatedAt: '2024-12-20',
    distanceFromBase: 13,
    depannagePrice: 150
  },
  {
    id: '39',
    name: 'Gometz-la-Ville',
    slug: 'gometz-la-ville',
    title: 'Électricien à Gometz-la-Ville - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Gometz-la-Ville (91400). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Gometz-la-Ville',
      heroSubtitle: 'Votre électricien professionnel de confiance à Gometz-la-Ville',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '1 400',
        codePostal: '91400',
        departement: 'Essonne'
      }
    },
    visits: 196,
    leads: 7,
    status: 'active',
    createdAt: '2024-07-05',
    updatedAt: '2024-12-20',
    distanceFromBase: 12,
    depannagePrice: 150
  },
  {
    id: '40',
    name: 'Bures-sur-Yvette',
    slug: 'bures-sur-yvette',
    title: 'Électricien à Bures-sur-Yvette - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à Bures-sur-Yvette (91440). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Bures-sur-Yvette',
      heroSubtitle: 'Votre électricien professionnel de confiance à Bures-sur-Yvette',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '10 200',
        codePostal: '91440',
        departement: 'Essonne'
      }
    },
    visits: 1428,
    leads: 49,
    status: 'active',
    createdAt: '2024-07-10',
    updatedAt: '2024-12-20',
    distanceFromBase: 11,
    depannagePrice: 150
  },
  {
    id: '41',
    name: 'L\'Étang-la-Ville',
    slug: 'l-etang-la-ville',
    title: 'Électricien à L\'Étang-la-Ville - LS COM | Installation, Dépannage',
    metaDescription: 'LS COM, électricien professionnel à L\'Étang-la-Ville (78620). Installation électrique, dépannage 150€ HT, mise en conformité. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à L\'Étang-la-Ville',
      heroSubtitle: 'Votre électricien professionnel de confiance à L\'Étang-la-Ville',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [],
      localInfo: {
        population: '4 500',
        codePostal: '78620',
        departement: 'Yvelines'
      }
    },
    visits: 630,
    leads: 22,
    status: 'active',
    createdAt: '2024-07-15',
    updatedAt: '2024-12-20',
    distanceFromBase: 15,
    depannagePrice: 150
  }
];

const AdminDashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const [cities, setCities] = useLocalStorage<CityPage[]>('admin_cities', initialCities);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCity, setEditingCity] = useState<CityPage | null>(null);
  const itemsPerPage = 10;

  // Calcul des statistiques
  const stats: AdminStats = {
    totalVisits: cities.reduce((sum, city) => sum + city.visits, 0),
    totalLeads: cities.reduce((sum, city) => sum + city.leads, 0),
    activeCities: cities.filter(city => city.status === 'active').length,
    conversionRate: cities.reduce((sum, city) => sum + city.leads, 0) / cities.reduce((sum, city) => sum + city.visits, 0) * 100,
    topCities: cities
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5)
      .map(city => ({
        name: city.name,
        visits: city.visits,
        leads: city.leads
      }))
  };

  // Filtrage et recherche
  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || city.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCities = filteredCities.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteCity = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette ville ?')) {
      setCities(cities.filter(city => city.id !== id));
    }
  };

  const handleEditCity = (city: CityPage) => {
    setEditingCity(city);
    setShowCreateModal(true);
  };

  const handleCreateCity = () => {
    setEditingCity(null);
    setShowCreateModal(true);
  };

  const getZoneInfo = (distance: number) => {
    if (distance <= 5) return { zone: 'Proximité', color: 'text-green-600', bg: 'bg-green-100' };
    if (distance <= 10) return { zone: 'Intermédiaire', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { zone: 'Étendue', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                <span className="text-sm text-gray-500">LS COM Électricien</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Connecté en tant que {user?.username}</span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Leads générés</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLeads}</p>
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

          {/* Top villes */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 5 des villes</h3>
            <div className="space-y-3">
              {stats.topCities.map((city, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <span className="font-medium text-gray-900">{city.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-600">{city.visits} visites</span>
                    <span className="text-green-600 font-medium">{city.leads} leads</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gestion des villes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <h2 className="text-xl font-semibold text-gray-900">Gestion des pages villes</h2>
                <button
                  onClick={handleCreateCity}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nouvelle ville</span>
                </button>
              </div>
              
              {/* Filtres et recherche */}
              <div className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une ville..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="draft">Brouillon</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
            </div>

            {/* Tableau des villes */}
            <div className="overflow-x-auto">
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
                      Distance / Prix
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
                  {paginatedCities.map((city) => {
                    const zoneInfo = getZoneInfo(city.distanceFromBase || 0);
                    return (
                      <tr key={city.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{city.name}</div>
                            <div className="text-sm text-gray-500">{city.content.localInfo.codePostal}</div>
                          </div>
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className={`text-sm font-medium ${zoneInfo.color}`}>
                              Zone {zoneInfo.zone}
                            </div>
                            <div className="text-sm text-gray-500">
                              {city.distanceFromBase}km - {city.depannagePrice}€ HT
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">{city.visits} visites</div>
                            <div className="text-sm text-green-600 font-medium">{city.leads} leads</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditCity(city)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCity(city.id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredCities.length)} sur {filteredCities.length} villes
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Précédent
                    </button>
                    <span className="text-sm text-gray-700">
                      Page {currentPage} sur {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;