export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface AdminSettings {
  siteName: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  emailNotifications: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
}

export interface CityPage {
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
  distanceFromBase?: number;
  depannagePrice?: number;
}

export interface DistancePricing {
  id: string;
  name: string;
  minDistance: number;
  maxDistance: number;
  price: number;
  description: string;
}

export interface AdminStats {
  totalVisits: number;
  totalLeads: number;
  activeCities: number;
  conversionRate: number;
  topCities: {
    name: string;
    visits: number;
    leads: number;
  }[];
}

export interface AdminAction {
  id: string;
  type: 'create' | 'update' | 'delete' | 'login';
  resource: string;
  userId: string;
  timestamp: string;
  details?: Record<string, any>;
}