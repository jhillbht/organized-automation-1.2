import React from 'react';
import { ArrowLeft, CheckCircle2, Search } from 'lucide-react';

interface GA4SelectionProps {
  onBack: () => void;
  onSelect: (measurementId: string) => void;
}

interface GA4Property {
  id: string;
  name: string;
  measurementId: string;
  website: string;
  created: string;
}

export function GA4Selection({ onBack, onSelect }: GA4SelectionProps) {
  // Demo GA4 properties
  const demoProperties: GA4Property[] = [
    {
      id: '1',
      name: 'Main Website',
      measurementId: 'G-ABC123DEF4',
      website: 'www.example.com',
      created: '2024-01-15'
    },
    {
      id: '2',
      name: 'E-commerce Store',
      measurementId: 'G-XYZ789WVU2',
      website: 'shop.example.com',
      created: '2024-02-01'
    },
    {
      id: '3',
      name: 'Blog Platform',
      measurementId: 'G-JKL456MNO8',
      website: 'blog.example.com',
      created: '2024-02-15'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-dark-300 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Select GA4 Property</h1>
      </div>

      <div className="bg-dark-200 rounded-lg p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search GA4 properties..."
            className="w-full bg-dark-300 border border-dark-400 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="space-y-4">
          {demoProperties.map((property) => (
            <button
              key={property.id}
              onClick={() => onSelect(property.measurementId)}
              className="w-full flex items-center justify-between p-4 bg-dark-300 hover:bg-dark-400 rounded-lg transition-colors text-left"
            >
              <div>
                <h3 className="font-medium">{property.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{property.website}</p>
                <div className="flex items-center space-x-2">
                  <code className="text-xs bg-dark-400 px-2 py-1 rounded">
                    {property.measurementId}
                  </code>
                  <span className="text-xs text-gray-400">
                    Created {new Date(property.created).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-dark-300">
          <button
            onClick={() => onSelect('new')}
            className="w-full flex items-center justify-center space-x-2 bg-dark-300 hover:bg-dark-400 text-gray-400 hover:text-white px-4 py-3 rounded-lg transition-colors"
          >
            <span>Create new GA4 property instead</span>
          </button>
        </div>
      </div>
    </div>
  );
}