import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ZoneInterventionSection from '../components/home/ZoneInterventionSection';
import ContactSection from '../components/home/ContactSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <ZoneInterventionSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;