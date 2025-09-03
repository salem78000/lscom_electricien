export type CityPage = {
  id: string;
  name: string;
  slug: string;
  title: string;
  metaDescription: string;
  content: {
    heroTitle: string;
    heroSubtitle: string;
    services: string[];
    testimonials: {
      name: string;
      text: string;
      service: string;
      rating: number;
      date: string;
    }[];
    localInfo: {
      population: string;
      codePostal: string;
      departement: string;
    };
  };
  visits: number;
  leads: number;
  status: 'active' | 'draft' | 'inactive';
  createdAt: string;
  updatedAt: string;
  // Nouveau: système de tarification par distance
  distanceFromBase?: number; // Distance en km depuis Magny-les-Hameaux
  depannagePrice?: number; // Prix de dépannage personnalisé
};

export type DistancePricing = {
  id: string;
  name: string;
  minDistance: number; // km
  maxDistance: number; // km
  price: number; // euros HT
  description: string;
};

// Liste des villes supportees avec informations detaillees
const supportedCities = {
  'magny-les-hameaux': {
    name: 'Magny-les-Hameaux',
    codePostal: '78114',
    population: '9 500',
    departement: 'Yvelines',
    description: 'commune residentielle des Yvelines, proche de Saint-Quentin-en-Yvelines'
  },
  'voisins-le-bretonneux': {
    name: 'Voisins-le-Bretonneux',
    codePostal: '78960',
    population: '13 500',
    departement: 'Yvelines',
    description: 'ville nouvelle dynamique de Saint-Quentin-en-Yvelines'
  },
  'versailles': {
    name: 'Versailles',
    codePostal: '78000',
    population: '85 000',
    departement: 'Yvelines',
    description: 'ville historique et prefecture des Yvelines'
  },
  'guyancourt': {
    name: 'Guyancourt',
    codePostal: '78280',
    population: '30 000',
    departement: 'Yvelines',
    description: 'commune moderne de Saint-Quentin-en-Yvelines'
  },
  'montigny-le-bretonneux': {
    name: 'Montigny-le-Bretonneux',
    codePostal: '78180',
    population: '35 000',
    departement: 'Yvelines',
    description: 'ville nouvelle active de Saint-Quentin-en-Yvelines'
  },
  'trappes': {
    name: 'Trappes',
    codePostal: '78190',
    population: '30 000',
    departement: 'Yvelines',
    description: 'commune urbaine des Yvelines'
  },
  'elancourt': {
    name: 'Elancourt',
    codePostal: '78990',
    population: '26 000',
    departement: 'Yvelines',
    description: 'ville de Saint-Quentin-en-Yvelines'
  },
  'chevreuse': {
    name: 'Chevreuse',
    codePostal: '78460',
    population: '5 500',
    departement: 'Yvelines',
    description: 'charmante commune de la vallee de Chevreuse'
  },
  'buc': {
    name: 'Buc',
    codePostal: '78530',
    population: '6 000',
    departement: 'Yvelines',
    description: 'commune residentielle proche de Versailles'
  },
  'gif-sur-yvette': {
    name: 'Gif-sur-Yvette',
    codePostal: '91190',
    population: '21 000',
    departement: 'Essonne',
    description: 'ville universitaire de la vallee de Chevreuse'
  },
  'orsay': {
    name: 'Orsay',
    codePostal: '91400',
    population: '17 000',
    departement: 'Essonne',
    description: 'ville universitaire et scientifique'
  },
  'saclay': {
    name: 'Saclay',
    codePostal: '91400',
    population: '4 000',
    departement: 'Essonne',
    description: 'commune du plateau de Saclay'
  },
  'plaisir': {
    name: 'Plaisir',
    codePostal: '78370',
    population: '31 000',
    departement: 'Yvelines',
    description: 'ville dynamique des Yvelines'
  },
  'les-clayes-sous-bois': {
    name: 'Les Clayes-sous-Bois',
    codePostal: '78340',
    population: '18 000',
    departement: 'Yvelines',
    description: 'commune residentielle des Yvelines'
  },
  'maurepas': {
    name: 'Maurepas',
    codePostal: '78310',
    population: '20 000',
    departement: 'Yvelines',
    description: 'ville nouvelle de Saint-Quentin-en-Yvelines'
  },
  'coignieres': {
    name: 'Coignieres',
    codePostal: '78310',
    population: '4 500',
    departement: 'Yvelines',
    description: 'commune des Yvelines'
  },
  'viroflay': {
    name: 'Viroflay',
    codePostal: '78220',
    population: '16 000',
    departement: 'Yvelines',
    description: 'commune limitrophe de Versailles'
  },
  'le-chesnay': {
    name: 'Le Chesnay-Rocquencourt',
    codePostal: '78150',
    population: '30 000',
    departement: 'Yvelines',
    description: 'commune proche du chateau de Versailles'
  },
  'st-cyr-l-ecole': {
    name: 'Saint-Cyr-l-Ecole',
    codePostal: '78210',
    population: '17 000',
    departement: 'Yvelines',
    description: 'ville militaire historique des Yvelines'
  },
  'bois-d-arcy': {
    name: 'Bois-d-Arcy',
    codePostal: '78390',
    population: '14 000',
    departement: 'Yvelines',
    description: 'commune residentielle des Yvelines'
  },
  'fontenay-le-fleury': {
    name: 'Fontenay-le-Fleury',
    codePostal: '78330',
    population: '12 000',
    departement: 'Yvelines',
    description: 'commune des Yvelines'
  },
  'jouy-en-josas': {
    name: 'Jouy-en-Josas',
    codePostal: '78350',
    population: '8 000',
    departement: 'Yvelines',
    description: 'commune historique de la vallee de Bievre'
  }
};