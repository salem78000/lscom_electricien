import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Clock, Shield, Star, CheckCircle, Phone, Award, Zap, Users } from 'lucide-react';
import SecurePhone from '../../components/SecurePhone';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import { cityData } from '../../data/cities';

// Liste des villes supportées avec informations détaillées
const supportedCities = {
  'magny-les-hameaux': {
    name: 'Magny-les-Hameaux',
    codePostal: '78114',
    population: '9 500',
    departement: 'Yvelines',
    description: 'commune résidentielle des Yvelines, proche de Saint-Quentin-en-Yvelines'
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
    description: 'ville historique et préfecture des Yvelines'
  },
  'guyancourt': {
    name: 'Guyancourt',
    codePostal: '78280',
    population: '29 000',
    departement: 'Yvelines',
    description: 'commune moderne de Saint-Quentin-en-Yvelines'
  },
  'montigny-le-bretonneux': {
    name: 'Montigny-le-Bretonneux',
    codePostal: '78180',
    population: '34 000',
    departement: 'Yvelines',
    description: 'ville nouvelle active de Saint-Quentin-en-Yvelines'
  },
  'trappes': {
    name: 'Trappes',
    codePostal: '78190',
    population: '31 000',
    departement: 'Yvelines',
    description: 'commune urbaine des Yvelines'
  },
  'elancourt': {
    name: 'Élancourt',
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
    description: 'charmante commune de la vallée de Chevreuse'
  },
  'buc': {
    name: 'Buc',
    codePostal: '78530',
    population: '6 000',
    departement: 'Yvelines',
    description: 'commune résidentielle proche de Versailles'
  },
  'gif-sur-yvette': {
    name: 'Gif-sur-Yvette',
    codePostal: '91190',
    population: '21 000',
    departement: 'Essonne',
    description: 'ville universitaire de la vallée de Chevreuse'
  },
  'orsay': {
    name: 'Orsay',
    codePostal: '91400',
    population: '16 000',
    departement: 'Essonne',
    description: 'ville universitaire et scientifique'
  },
  'saclay': {
    name: 'Saclay',
    codePostal: '91400',
    population: '17 059',
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
    population: '17 500',
    departement: 'Yvelines',
    description: 'commune résidentielle des Yvelines'
  },
  'maurepas': {
    name: 'Maurepas',
    codePostal: '78310',
    population: '19 500',
    departement: 'Yvelines',
    description: 'ville nouvelle de Saint-Quentin-en-Yvelines'
  },
  'coignieres': {
    name: 'Coignières',
    codePostal: '78310',
    population: '4 500',
    departement: 'Yvelines',
    description: 'commune des Yvelines'
  },
  'viroflay': {
    name: 'Viroflay',
    codePostal: '78220',
    population: '15 500',
    departement: 'Yvelines',
    description: 'commune limitrophe de Versailles'
  },
  'le-chesnay': {
    name: 'Le Chesnay-Rocquencourt',
    codePostal: '78150',
    population: '29 000',
    departement: 'Yvelines',
    description: 'commune proche du château de Versailles'
  },
  'st-cyr-l-ecole': {
    name: 'Saint-Cyr-l\'École',
    codePostal: '78210',
    population: '17 000',
    departement: 'Yvelines',
    description: 'ville militaire historique des Yvelines'
  },
  'bois-d-arcy': {
    name: 'Bois-d\'Arcy',
    codePostal: '78390',
    population: '13 500',
    departement: 'Yvelines',
    description: 'commune résidentielle des Yvelines'
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
    population: '8 100',
    departement: 'Yvelines',
    description: 'commune historique de la vallée de Bièvre'
  },
  'levis-saint-nom': {
    name: 'Lévis St nom',
    codePostal: '78320',
    population: '1 100',
    departement: 'Yvelines',
    description: 'commune des Yvelines'
  },
  'chaveney': {
    name: 'Chaveney',
    codePostal: '78450',
    population: '1 800',
    departement: 'Yvelines',
    description: 'commune des Yvelines'
  },
  'la-celle-les-bordes': {
    name: 'La celle les bordes',
    codePostal: '78720',
    population: '600',
    departement: 'Yvelines',
    description: 'commune des Yvelines'
  },
  'saint-forget': {
    name: 'St forget',
    codePostal: '78720',
    population: '450',
    departement: 'Yvelines',
    description: 'commune des Yvelines'
  },
  'senlisse': {
    name: 'Senlisse',
    codePostal: '78720',
    population: '800',
    departement: 'Yvelines',
    description: 'commune des Yvelines'
  },
  'bonnelles': {
    name: 'Bonnelles',
    codePostal: '78830',
    population: '1 800',
    departement: 'Yvelines',
    description: 'commune des Yvelines'
  },
  'bullion': {
    name: 'Bullion',
    codePostal: '78830',
    population: '2 100',
    departement: 'Yvelines',
    description: 'commune des Yvelines'
  },
  'mareil-sur-mauldre': {
    name: 'Mareil sur mauldre',
    codePostal: '78430',
    population: '2 800',
    departement: 'Yvelines',
    description: 'commune des Yvelines'
  },
  'marly-le-roi': {
    name: 'Marly-le-Roi',
    codePostal: '78160',
    population: '17 059',
    departement: 'Yvelines',
    description: 'ville historique des Yvelines'
  },
  'saint-jean-de-beauregard': {
    name: 'St jean de beauregard',
    codePostal: '91940',
    population: '1 100',
    departement: 'Essonne',
    description: 'commune de l\'Essonne'
  },
  'gometz-le-chatel': {
    name: 'Gometz le chatel',
    codePostal: '91940',
    population: '2 400',
    departement: 'Essonne',
    description: 'commune de l\'Essonne'
  },
  'les-ulis': {
    name: 'Les ulis',
    codePostal: '91940',
    population: '25 000',
    departement: 'Essonne',
    description: 'ville nouvelle de l\'Essonne'
  },
  'les-essarts-le-roi': {
    name: 'Les essarts le roi',
    codePostal: '78690',
    population: '7 000',
    departement: 'Yvelines',
    description: 'commune des Yvelines'
  },
  'pecqueuse': {
    name: 'Pecqueuse',
    codePostal: '91470',
    population: '600',
    departement: 'Essonne',
    description: 'commune de l\'Essonne'
  }
};

const CityTemplate: React.FC = () => {
  const location = useLocation();
  // Extraire le nom de la ville depuis l'URL /electricien/ville-name
  const pathParts = location.pathname.split('/');
  const city = pathParts[pathParts.length - 1]; // Dernier segment de l'URL
  
  // Récupérer les pages ville depuis le localStorage avec gestion d'erreur
  const [cityPages, setCityPages] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    try {
      console.log('Loading city data for:', city);
      const stored = localStorage.getItem('admin_cities');
      const parsedData = stored ? JSON.parse(stored) : [];
      const pages = Array.isArray(parsedData) ? parsedData : [];
      // Combiner les données du localStorage avec les données statiques
      const staticData = Array.isArray(cityData) ? cityData : [];
      const combinedPages = [...pages, ...staticData];
      console.log('Combined pages:', combinedPages.length);
      setCityPages(combinedPages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading city pages:', error);
      setError('Erreur de chargement des données');
      setCityPages(Array.isArray(cityData) ? cityData : []);
      setIsLoading(false);
    }
  }, [city]);
  
  // Chercher d'abord dans les pages créées via le dashboard
  const dynamicCity = cityPages.find((c: any) => c.slug === city && c.status === 'active');
  
  // Puis dans la liste statique
  const staticCityData = supportedCities[city as keyof typeof supportedCities];
  
  // Déterminer les données à utiliser
  const currentCityData = dynamicCity || staticCityData;
  const cityName = dynamicCity ? dynamicCity.name : staticCityData?.name;
  
  // Récupérer le tarif de dépannage selon la zone
  const depannagePrice = dynamicCity?.depannagePrice || 110;

  // Construire les informations de la ville
  const cityInfo = dynamicCity ? {
    name: dynamicCity.name,
    codePostal: dynamicCity.content?.localInfo?.codePostal || '',
    population: dynamicCity.content?.localInfo?.population || '',
    departement: dynamicCity.content?.localInfo?.departement || 'Yvelines',
    description: `${dynamicCity.name.toLowerCase()}, votre ville de confiance`
  } : staticCityData;

  const pageTitle = dynamicCity?.title || `Électricien à ${cityName} - LS COM | Installation, Dépannage, Conformité`;
  const metaDescription = dynamicCity?.metaDescription || `LS COM, électricien professionnel à ${cityName} (${cityInfo?.codePostal}). Installation électrique, dépannage 110€ HT, mise en conformité, bornes IRVE. Devis gratuit.`;

  // SEO local optimisé - HOOK DÉPLACÉ AVANT LES RETOURS CONDITIONNELS
  React.useEffect(() => {
    if (!cityName || !cityInfo) return;
    
    // Mise à jour dynamique des meta tags pour le SEO local
    document.title = pageTitle;
    
    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', metaDescription);
    
    // Keywords locaux
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    const keywords = `électricien ${cityName}, installation électrique ${cityName}, dépannage électrique ${cityName}, ${cityInfo.codePostal}, ${cityInfo.departement}, LS COM`;
    metaKeywords.setAttribute('content', keywords);
    
    // Données structurées JSON-LD pour le SEO local
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `LS COM - Électricien à ${cityName}`,
      "description": metaDescription,
      "url": window.location.href,
      "telephone": "+33622523902",
      "email": "contact@lscom.fr",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "24 Avenue de Chevincourt",
        "addressLocality": "Magny-les-Hameaux",
        "postalCode": "78114",
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "48.7167",
        "longitude": "2.0833"
      },
      "areaServed": {
        "@type": "City",
        "name": cityName,
        "addressRegion": cityInfo.departement
      },
      "serviceType": ["Installation électrique", "Dépannage électrique", "Mise en conformité", "Bornes IRVE"],
      "priceRange": "110€-150€",
      "openingHours": "Mo-Fr 08:00-18:00, Sa 08:00-12:00",
      "sameAs": [
        "https://www.google.com/search?q=LS+COM+électricien"
      ]
    };
    
    // Injection du JSON-LD
    let jsonLd = document.querySelector('#local-business-schema');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.setAttribute('type', 'application/ld+json');
      jsonLd.setAttribute('id', 'local-business-schema');
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);
    
  }, [cityName, pageTitle, metaDescription, cityInfo]);

  // Affichage de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Chargement...</h1>
          <p className="text-gray-600">Chargement de la page pour {city}</p>
        </div>
      </div>
    );
  }

  // Affichage d'erreur
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  // Si aucune donnée trouvée, afficher une erreur
  if (!cityName || !currentCityData) {
    console.log('City not found:', city);
    console.log('Available cities:', Object.keys(supportedCities));
    console.log('Dynamic cities:', cityPages.map(c => c.slug));
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Ville non trouvée</h1>
          <p className="text-gray-600 mb-4">
            La page pour "{city}" n'existe pas ou n'est pas encore active.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Villes disponibles : {Object.keys(supportedCities).slice(0, 10).join(', ')}...
          </p>
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }
  
  // Contenu SEO optimisé pour chaque ville
  const services = [
    {
      title: `Installation électrique complète à ${cityName}`,
      description: `LS COM réalise vos installations électriques neuves et en rénovation à ${cityName}. Création de circuits, pose de prises, interrupteurs et éclairages selon les normes NF C 15-100.`,
      icon: Zap,
      details: [
        'Création et extension de circuits électriques',
        'Installation de prises et interrupteurs',
        'Mise en place d\'éclairages intérieurs et extérieurs',
        'Installation de tableaux électriques aux normes'
      ]
    },
    {
      title: `Mise en conformité électrique à ${cityName}`,
      description: `Modernisation et mise aux normes de vos installations électriques à ${cityName}. Diagnostic complet et travaux de conformité selon la norme NF C 15-100.`,
      icon: Shield,
      details: [
        'Diagnostic électrique complet',
        'Mise aux normes tableau électrique',
        'Installation de dispositifs de sécurité',
        'Certification Consuel'
      ]
    },
    {
      title: `Dépannage électrique à ${cityName}`,
      description: `Service de dépannage électrique ${depannagePrice}€ HT à ${cityName}. Intervention rapide pour tous vos problèmes électriques.`,
      icon: Clock,
      details: [
        `${depannagePrice}€ HT pour 1h`,
        'Diagnostic et réparation inclus',
        `Déplacement à ${cityName}`,
        'Devis gratuit pour travaux complémentaires'
      ]
    },
    {
      title: `Bornes de recharge IRVE à ${cityName}`,
      description: `Installation de bornes de recharge pour véhicules électriques à ${cityName}. Installateur certifié QUALIFELEC IRVE, éligible aux aides financières.`,
      icon: Award,
      details: [
        'Certification QUALIFELEC IRVE',
        'Bornes 7kW et 22kW',
        'Prises Green\'UP sécurisées',
        'Éligibilité aux aides (crédit d\'impôt, ADVENIR)'
      ]
    }
  ];

  const testimonials = dynamicCity?.content?.testimonials || [
    {
      name: `Marie L. - ${cityName}`,
      text: `Excellent électricien à ${cityName} ! Installation électrique complète de ma maison, travail soigné et dans les délais. Je recommande LS COM.`,
      service: 'Installation électrique',
      rating: 5,
      date: 'Il y a 2 mois'
    },
    {
      name: `Pierre D. - ${cityName}`,
      text: `Dépannage électrique rapide à ${cityName}. Panne résolue en 1h avec le forfait 110€. Électricien professionnel et compétent.`,
      service: 'Dépannage électrique',
      rating: 5,
      date: 'Il y a 1 mois'
    },
    {
      name: `Sophie M. - ${cityName}`,
      text: `Mise en conformité de mon tableau électrique à ${cityName}. Travail de qualité, explications claires. Très satisfaite du service LS COM.`,
      service: 'Mise en conformité',
      rating: 5,
      date: 'Il y a 3 semaines'
    }
  ];

  const localInfo = {
    departement: cityInfo.departement,
    description: cityInfo.description
  };

  const heroTitle = dynamicCity?.content?.heroTitle || `Électricien à ${cityName}`;
  const heroSubtitle = dynamicCity?.content?.heroSubtitle || `Votre électricien professionnel de confiance à ${cityName}`;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  {heroTitle}
                  <span className="block text-[#b32a29]">LS COM</span>
                </h1>
                <p className="text-xl text-blue-100">
                  {heroSubtitle}
                </p>
                <div className="bg-blue-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-blue-600" itemScope itemType="https://schema.org/PostalAddress">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-300" />
                      <span itemProp="postalCode">{cityInfo.codePostal}</span>
                      <span itemProp="addressLocality">{cityName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-300">•</span>
                      <span itemProp="addressRegion">{cityInfo.departement}</span>
                    </div>
                    {cityInfo.population && (
                      <>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-300">•</span>
                          <span>{cityInfo.population} habitants</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-blue-100">15+ ans d'expérience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-green-400" />
                  <span className="text-blue-100">Électriciens certifiés</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-green-400" />
                  <span className="text-blue-100">Dépannage {depannagePrice}€ HT</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-green-400" />
                  <span className="text-blue-100">Certifié IRVE</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/contact" 
                  className="bg-[#b32a29] hover:bg-[#9a2426] text-white px-2 sm:px-3 lg:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm lg:text-base transition-colors text-center shadow-lg"
                >
                  Devis gratuit à {cityName}
                </Link>
                <SecurePhone 
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 text-white px-2 sm:px-3 lg:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm lg:text-base transition-all flex items-center justify-center space-x-1 whitespace-nowrap min-w-0"
                  variant="button"
                  showIcon={true}
                >
                  06 22 52 39 02
                </SecurePhone>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/8092/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800" 
                alt={`Électricien professionnel LS COM à ${cityName} - Installation et dépannage électrique`}
                className="rounded-2xl shadow-2xl w-full h-96 lg:h-[400px] object-cover"
                loading="eager"
                width="800"
                height="400"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{cityName}</p>
                    <p className="text-sm text-gray-600">Zone d'intervention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos services électriques à {cityName}
            </h2>
            <p className="text-xl text-gray-600">
              LS COM intervient pour tous vos besoins électriques à {cityName} ({cityInfo.codePostal}) et ses environs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8" itemScope itemType="https://schema.org/Service">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <article key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow" itemScope itemType="https://schema.org/Service">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900" itemProp="name">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600" itemProp="description">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      {service.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center text-blue-600 font-medium pt-4 border-t border-gray-200">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>Service disponible à {cityName}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Avis Google Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Avis clients Google à {cityName}
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les avis authentiques de nos clients de {cityName} sur Google
            </p>
          </div>


          {/* Trust Indicators localisés */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="bg-green-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-green-600 fill-current" />
                </div>
                <p className="text-2xl font-bold text-gray-900">5/5</p>
                <p className="text-gray-600">Note moyenne à {cityName}</p>
              </div>
              <div>
                <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-gray-600">Clients satisfaits en Île-de-France</p>
              </div>
              <div>
                <div className="bg-orange-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-orange-600">15+</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">Années</p>
                <p className="text-gray-600">D'expérience à {cityName}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avis clients slider */}
      <TestimonialsSection />

      {/* Informations locales */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  Pourquoi choisir LS COM à {cityName} ?
                </h2>
                <p className="text-xl text-gray-600">
                  Électricien local de confiance à {cityName}, nous connaissons parfaitement votre secteur et ses spécificités.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Connaissance locale</h3>
                    <p className="text-gray-600">
                      Plus de 15 ans d'expérience à {cityName} et dans le {cityInfo.departement}. 
                      Nous connaissons les spécificités des installations électriques locales.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Intervention rapide</h3>
                    <p className="text-gray-600">
                      Dépannage électrique à {cityName} {depannagePrice}€ HT. 
                      Déplacement rapide dans tout le secteur {cityInfo.codePostal}.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Certifications professionnelles</h3>
                    <p className="text-gray-600">
                      Électriciens certifiés et installateur QUALIFELEC IRVE. 
                      Travaux garantis et conformes aux normes en vigueur.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informations sur {cityName}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Code postal</span>
                  <span className="text-gray-900">{cityInfo.codePostal}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Département</span>
                  <span className="text-gray-900">{cityInfo.departement}</span>
                </div>
                {cityInfo.population && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Population</span>
                    <span className="text-gray-900">{cityInfo.population} habitants</span>
                  </div>
                )}
                <div className="pt-4">
                  <p className="text-sm text-gray-600 mb-4">
                    {cityName}, {cityInfo.description}, bénéficie de l'expertise LS COM 
                    pour tous ses besoins en électricité.
                  </p>
                  <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
                    <p className="font-medium mb-2">Besoin d'un électricien à {cityName} ?</p>
                    <SecurePhone 
                      className="text-white hover:text-blue-200 font-bold"
                      variant="link"
                      showIcon={true}
                    >
                      06 22 52 39 02
                    </SecurePhone>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">
                Votre électricien à {cityName}
              </h2>
              <p className="text-xl text-gray-300">
                LS COM, votre partenaire électricité de confiance à {cityName} ({cityInfo.codePostal})
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <Phone className="h-8 w-8 text-blue-400 mx-auto" />
                  <h3 className="font-semibold">Dépannage {depannagePrice}€ HT</h3>
                  <p className="text-gray-300 text-sm">Selon zone - 1h à {cityName}</p>
                </div>
                <div className="space-y-2">
                  <Shield className="h-8 w-8 text-blue-400 mx-auto" />
                  <h3 className="font-semibold">Travaux garantis</h3>
                  <p className="text-gray-300 text-sm">Qualité certifiée à {cityName}</p>
                </div>
                <div className="space-y-2">
                  <Star className="h-8 w-8 text-blue-400 mx-auto" />
                  <h3 className="font-semibold">Service 5 étoiles</h3>
                  <p className="text-gray-300 text-sm">Clients satisfaits à {cityName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Link 
                to="/contact" 
                className="inline-block bg-[#b32a29] hover:bg-[#9a2426] text-white px-2 sm:px-3 lg:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm lg:text-base transition-colors shadow-lg"
              >
                Demander un devis à {cityName}
              </Link>
              <div className="flex justify-center">
                <SecurePhone 
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base lg:text-lg transition-all flex items-center justify-center space-x-2"
                  variant="button"
                  showIcon={true}
                >
                  06 22 52 39 02
                </SecurePhone>
              </div>
              <p className="text-gray-400 text-sm text-center">
                Réponse sous 24h • Devis gratuit • Électricien certifié
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CityTemplate;