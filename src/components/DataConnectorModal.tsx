import React from 'react';
import { X, Database, Users, Server, CloudCog } from 'lucide-react';

interface DataConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DataConnectorModal({ isOpen, onClose }: DataConnectorModalProps) {
  if (!isOpen) return null;

  const connectors = [
    {
      id: 'offline',
      name: 'Offline Conversions',
      description: 'Import offline sales and conversion data',
      icon: Database,
      comingSoon: false
    },
    {
      id: 'crm',
      name: 'CRM Data',
      description: 'Connect your CRM system for customer insights',
      icon: Users,
      comingSoon: false
    },
    {
      id: 'hyros',
      name: 'HYROS',
      description: 'Advanced tracking and attribution for ads',
      icon: Server,
      comingSoon: false
    },
    {
      id: 'bigquery',
      name: 'BigQuery',
      description: 'Connect to Google BigQuery for advanced analytics',
      icon: CloudCog,
      comingSoon: false
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-200 rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b border-dark-300 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Data Connectors</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                className="flex items-start p-4 bg-dark-300 hover:bg-dark-400 rounded-lg transition-colors text-left group"
              >
                <div className="p-2 bg-primary-500/20 rounded-lg mr-4">
                  <connector.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{connector.name}</h3>
                    {connector.comingSoon && (
                      <span className="px-2 py-0.5 bg-primary-500/20 text-primary-400 rounded-full text-xs">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{connector.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-dark-300 rounded-lg">
            <p className="text-sm text-gray-400">
              Connect your data sources to enhance your analytics and create more comprehensive audience segments.
              All data is processed securely and in compliance with privacy regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}