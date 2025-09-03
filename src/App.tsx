import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import InstallationPage from './pages/services/InstallationPage';
import BorneRechargeIRVEPage from './pages/services/BorneRechargeIRVEPage';
import ConformitePage from './pages/services/ConformitePage';
import DepannagePage from './pages/services/DepannagePage';
import TableauElectriquePage from './pages/services/TableauElectriquePage';
import ContactPage from './pages/ContactPage';
import CityTemplate from './pages/cities/CityTemplate';
import MentionsLegalesPage from './pages/legal/MentionsLegalesPage';
import PolitiqueConfidentialitePage from './pages/legal/PolitiqueConfidentialitePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import TarifDepannagePage from './pages/TarifDepannagePage';

import { useLocation } from 'react-router-dom';

// Composant pour gérer le scroll global
const ScrollToTop: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

// SEO global et sécurité
const GlobalSEO: React.FC = () => {
  useEffect(() => {
    // Meta tags de sécurité
    const securityMetas = [
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'author', content: 'LS COM Électricien' },
      { name: 'geo.region', content: 'FR-78' },
      { name: 'geo.placename', content: 'Magny-les-Hameaux, Yvelines' },
      { name: 'geo.position', content: '48.7167;2.0833' },
      { name: 'ICBM', content: '48.7167, 2.0833' }
    ];
    
    securityMetas.forEach(meta => {
      let metaTag = document.querySelector(`meta[name="${meta.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', meta.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', meta.content);
    });
    
    // Données structurées globales
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "ElectricalContractor",
      "name": "LS COM",
      "alternateName": "LS COM Électricien",
      "description": "Électricien professionnel en Île-de-France. Installation, dépannage, mise en conformité électrique et bornes IRVE.",
      "url": "https://lscom-electricien.fr",
      "logo": "https://lscom-electricien.fr/logo.png",
      "telephone": "+33622523902",
      "email": "contact@lscom.fr",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "24 Avenue de Chevincourt",
        "addressLocality": "Magny-les-Hameaux",
        "postalCode": "78114",
        "addressRegion": "Yvelines",
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "48.7167",
        "longitude": "2.0833"
      },
      "areaServed": [
        {
          "@type": "State",
          "name": "Île-de-France"
        }
      ],
      "serviceType": [
        "Installation électrique",
        "Dépannage électrique",
        "Mise en conformité électrique",
        "Installation bornes IRVE"
      ],
      "priceRange": "110€-150€",
      "openingHours": [
        "Mo-Fr 08:00-18:00",
        "Sa 08:00-12:00"
      ],
      "hasCredential": "Certification QUALIFELEC IRVE",
      "foundingDate": "2010",
      "slogan": "Votre électricien de confiance en Île-de-France"
    };
    
    let orgSchema = document.querySelector('#organization-schema');
    if (!orgSchema) {
      orgSchema = document.createElement('script');
      orgSchema.setAttribute('type', 'application/ld+json');
      orgSchema.setAttribute('id', 'organization-schema');
      document.head.appendChild(orgSchema);
    }
    orgSchema.textContent = JSON.stringify(organizationSchema);
    
  }, []);
  
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <GlobalSEO />
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services/borne-recharge-irve" element={<BorneRechargeIRVEPage />} />
              <Route path="/services/installation-electrique" element={<InstallationPage />} />
              <Route path="/services/mise-en-conformite" element={<ConformitePage />} />
              <Route path="/services/depannage" element={<DepannagePage />} />
              <Route path="/services/depannage-urgence" element={<DepannagePage />} />
              <Route path="/services/tableau-electrique" element={<TableauElectriquePage />} />
              <Route path="/tarifs-depannage" element={<TarifDepannagePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/electricien/*" element={<CityTemplate />} />
              <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;