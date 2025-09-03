import React from 'react';
import { CheckCircle, Award, Shield, Settings } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface ServiceFeaturesProps {
  features: Feature[];
}

const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({ features }) => {
  const getIcon = (iconName: string) => {
    const icons = {
      design: CheckCircle,
      quality: Award,
      compliance: Shield,
      warranty: Settings,
      default: CheckCircle
    };
    return icons[iconName as keyof typeof icons] || icons.default;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nos garanties qualité
          </h2>
          <p className="text-xl text-gray-600">
            L'expertise LS COM au service de vos projets électriques
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = getIcon(feature.icon);
            
            return (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;