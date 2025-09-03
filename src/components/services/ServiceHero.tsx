import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SecurePhone from '../SecurePhone';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ title, subtitle, description, image }) => {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {title}
              </h1>
              <p className="text-xl text-blue-100">
                {subtitle}
              </p>
            </div>

            <p className="text-lg text-blue-100 leading-relaxed">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/contact" 
                className="bg-[#b32a29] hover:bg-[#9a2426] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Devis gratuit</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <SecurePhone 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center space-x-2"
                variant="button"
                showIcon={true}
              >
                06 22 52 39 02
              </SecurePhone>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img 
              src={image} 
              alt={title}
              className="rounded-2xl shadow-2xl w-full h-96 lg:h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;