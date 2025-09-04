export const cityData = [
  {
    id: 'city-marly-le-roi',
    name: 'Marly-le-Roi',
    slug: 'marly-le-roi',
    title: 'Électricien Marly-le-Roi - LS COM | Installation, Dépannage, Conformité',
    metaDescription: 'LS COM, électricien professionnel à Marly-le-Roi (78160). Installation électrique, dépannage 150€ HT, mise en conformité, bornes IRVE. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Marly-le-Roi',
      heroSubtitle: 'Votre électricien professionnel de confiance à Marly-le-Roi',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [
        {
          name: 'Client - Marly-le-Roi',
          text: 'Service professionnel à Marly-le-Roi. Je recommande LS COM.',
          service: 'Installation électrique',
          rating: 5,
          date: 'Il y a 1 mois'
        }
      ],
      localInfo: {
        population: '17 059',
        codePostal: '78160',
        departement: 'Yvelines'
      }
    },
    visits: Math.floor(Math.random() * 5000) + 1000,
    leads: Math.floor(Math.random() * 200) + 50,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    distanceFromBase: 15,
    depannagePrice: 150
  },
  {
    id: 'city-versailles',
    name: 'Versailles',
    slug: 'versailles',
    title: 'Électricien Versailles - LS COM | Installation, Dépannage, Conformité',
    metaDescription: 'LS COM, électricien professionnel à Versailles (78000). Installation électrique, dépannage 130€ HT, mise en conformité, bornes IRVE. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Versailles',
      heroSubtitle: 'Votre électricien professionnel de confiance à Versailles',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [
        {
          name: 'Client - Versailles',
          text: 'Service professionnel à Versailles. Je recommande LS COM.',
          service: 'Installation électrique',
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
    visits: Math.floor(Math.random() * 5000) + 1000,
    leads: Math.floor(Math.random() * 200) + 50,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    distanceFromBase: 10,
    depannagePrice: 130
  },
  {
    id: 'city-magny-les-hameaux',
    name: 'Magny-les-Hameaux',
    slug: 'magny-les-hameaux',
    title: 'Électricien Magny-les-Hameaux - LS COM | Installation, Dépannage, Conformité',
    metaDescription: 'LS COM, électricien professionnel à Magny-les-Hameaux (78114). Installation électrique, dépannage 110€ HT, mise en conformité, bornes IRVE. Devis gratuit.',
    content: {
      heroTitle: 'Électricien à Magny-les-Hameaux',
      heroSubtitle: 'Votre électricien professionnel de confiance à Magny-les-Hameaux',
      services: ['Installation électrique', 'Dépannage électrique', 'Mise en conformité', 'Bornes IRVE'],
      testimonials: [
        {
          name: 'Client - Magny-les-Hameaux',
          text: 'Service professionnel à Magny-les-Hameaux. Je recommande LS COM.',
          service: 'Installation électrique',
          rating: 5,
          date: 'Il y a 1 mois'
        }
      ],
      localInfo: {
        population: '9 500',
        codePostal: '78114',
        departement: 'Yvelines'
      }
    },
    visits: Math.floor(Math.random() * 5000) + 1000,
    leads: Math.floor(Math.random() * 200) + 50,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    distanceFromBase: 0,
    depannagePrice: 110
  }
];