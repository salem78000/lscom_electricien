import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ServiceProcessProps {
  process: ProcessStep[];
}

const ServiceProcess: React.FC<ServiceProcessProps> = ({ process }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Notre méthode de travail
          </h2>
          <p className="text-xl text-gray-600">
            Un processus rigoureux pour garantir la qualité de nos interventions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow h-full">
                <div className="space-y-4">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {index < process.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-blue-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;