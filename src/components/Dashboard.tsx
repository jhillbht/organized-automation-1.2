import React, { useState } from 'react';
import { Plus, LineChart, Tag, Box, Search, GitCompare, Database } from 'lucide-react';
import { Card } from './Card';
import { AuditModal } from './AuditModal';
import { ComparisonModal } from './ComparisonModal';
import { NewAccountModal } from './NewAccountModal';
import { PropertyDetails } from './PropertyDetails';
import { DataConnectorModal } from './DataConnectorModal';

interface Account {
  id: string;
  name: string;
  type: 'ga4' | 'gtm';
  properties: number;
}

interface Property {
  id: string;
  name: string;
  type: 'ga4' | 'gtm';
  containerType?: 'client' | 'server';
  configured: boolean;
  accountId: string;
}

export function Dashboard() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isDataConnectorModalOpen, setIsDataConnectorModalOpen] = useState(false);
  const [auditResults, setAuditResults] = useState<null | {
    ga4: {
      events: any[];
      keyEvents: any[];
      audiences: any[];
      grade: {
        score: 'A' | 'B' | 'C' | 'D' | 'F';
        reasons: string[];
      };
    };
    gtm: {
      tags: any[];
      triggers: any[];
      variables: any[];
      coverage: {
        total: number;
        tested: number;
        percentage: number;
      };
      grade: {
        score: 'A' | 'B' | 'C' | 'D' | 'F';
        reasons: string[];
      };
    };
  }>(null);

  const handleCreateAccount = (type: 'ga4' | 'gtm', containerType?: 'client' | 'server') => {
    const accountId = Date.now().toString();
    const propertyId = (Date.now() + 1).toString();
    
    const newAccount: Account = {
      id: accountId,
      name: 'Organized Automation',
      type,
      properties: 1
    };
    
    const newProperty: Property = {
      id: propertyId,
      name: type === 'ga4' ? 'Web Data Stream' : 
            containerType === 'server' ? 'Server-Side Container' : 'Client-Side Container',
      type,
      containerType,
      configured: false,
      accountId
    };
    
    setAccounts([...accounts, newAccount]);
    setProperties([...properties, newProperty]);
    setIsNewAccountModalOpen(false);
  };

  const handlePropertyConfigured = (property: Property) => {
    setProperties(currentProperties =>
      currentProperties.map(p =>
        p.id === property.id ? { ...p, configured: true } : p
      )
    );
    setSelectedProperty(null);
  };

  const handleAudit = async () => {
    // Mock data - replace with actual API calls
    const mockAuditResults = {
      ga4: {
        events: [
          { name: 'page_view', count: 1500 },
          { name: 'scroll', count: 800 },
        ],
        keyEvents: [
          { name: 'purchase', count: 150 },
          { name: 'add_to_cart', count: 300 },
        ],
        audiences: [
          { name: 'High Value Customers', size: '2.5k' },
          { name: 'Abandoned Cart', size: '1.2k' },
        ],
        grade: {
          score: 'C',
          reasons: [
            'Missing recommended ecommerce events (view_item, begin_checkout)',
            'User properties not configured for enhanced user analysis',
            'Custom dimensions for user segmentation not set up',
            'Conversion tracking implemented but missing value tracking',
            'Basic events present but lacking enhanced measurement features'
          ]
        }
      },
      gtm: {
        tags: [
          { name: 'GA4 Configuration', type: 'GA4 Configuration', status: 'active' },
          { name: 'Purchase Event', type: 'GA4 Event', status: 'active' },
        ],
        triggers: [
          { name: 'All Pages', type: 'Page View' },
          { name: 'Purchase Complete', type: 'Custom Event' },
        ],
        variables: [
          { name: 'GA4 Measurement ID', type: 'Constant' },
          { name: 'ecommerce.total', type: 'Data Layer Variable' },
        ],
        coverage: {
          total: 10,
          tested: 8,
          percentage: 80,
        },
        grade: {
          score: 'B',
          reasons: [
            'Container versioning and environments properly configured',
            'Basic tag firing rules and triggers implemented',
            'Missing some recommended security configurations',
            'Preview mode used but lacking comprehensive testing',
            'Workspace management could be improved'
          ]
        }
      },
    };

    setAuditResults(mockAuditResults);
    setIsAuditModalOpen(true);
  };

  const getTotalProperties = () => {
    return properties.length;
  };

  const getGTMContainers = () => {
    return properties.filter(property => property.type === 'gtm').length;
  };

  const getGA4Properties = () => {
    return properties.filter(property => property.type === 'ga4').length;
  };

  if (selectedProperty) {
    return (
      <PropertyDetails
        property={selectedProperty}
        onBack={() => setSelectedProperty(null)}
        onConfigured={() => handlePropertyConfigured(selectedProperty)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsDataConnectorModalOpen(true)}
            className="flex-1 lg:flex-none flex items-center justify-center space-x-2 bg-dark-300 hover:bg-dark-400 text-white px-4 py-2 rounded-lg transition-colors border border-dark-400"
          >
            <Database className="w-5 h-5" />
            <span>Data Connector</span>
          </button>
          <button
            onClick={() => setIsComparisonModalOpen(true)}
            className="flex-1 lg:flex-none flex items-center justify-center space-x-2 bg-dark-300 hover:bg-dark-400 text-white px-4 py-2 rounded-lg transition-colors border border-dark-400"
          >
            <GitCompare className="w-5 h-5" />
            <span>Compare</span>
          </button>
          <button
            onClick={handleAudit}
            className="flex-1 lg:flex-none flex items-center justify-center space-x-2 bg-dark-300 hover:bg-dark-400 text-white px-4 py-2 rounded-lg transition-colors border border-dark-400"
          >
            <Search className="w-5 h-5" />
            <span>Audit</span>
          </button>
          <button 
            onClick={() => setIsNewAccountModalOpen(true)}
            className="flex-1 lg:flex-none flex items-center justify-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>{accounts.length === 0 ? 'New Account' : 'New Property'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="GTM Containers"
          icon={Box}
          value={getGTMContainers().toString()}
          description="Active containers"
        />
        <Card
          title="GA4 Properties"
          icon={LineChart}
          value={getGA4Properties().toString()}
          description="Active properties"
        />
        <Card
          title="Total Properties"
          icon={Tag}
          value={getTotalProperties().toString()}
          description="Total properties"
        />
      </div>

      <div className="bg-dark-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Properties</h2>
        {properties.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No properties configured yet.</p>
            <p className="text-sm text-gray-500">Create your first property to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {properties.map(property => (
              <button
                key={property.id}
                onClick={() => setSelectedProperty(property)}
                className="w-full flex items-center justify-between bg-dark-300 p-4 rounded-lg hover:bg-dark-400 transition-colors text-left"
              >
                <div>
                  <h3 className="font-semibold">{property.name}</h3>
                  <p className="text-sm text-gray-400">
                    {property.type === 'ga4' ? 'Google Analytics 4' : 
                     property.containerType === 'server' ? 'GTM Server-Side Container' : 'GTM Client-Side Container'}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {property.configured ? (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      Configured
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                      Not Configured
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        auditResults={auditResults}
      />
      
      <ComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
      />

      <NewAccountModal
        isOpen={isNewAccountModalOpen}
        onClose={() => setIsNewAccountModalOpen(false)}
        isFirstAccount={accounts.length === 0}
        onCreateAccount={handleCreateAccount}
      />

      <DataConnectorModal
        isOpen={isDataConnectorModalOpen}
        onClose={() => setIsDataConnectorModalOpen(false)}
      />
    </div>
  );
}