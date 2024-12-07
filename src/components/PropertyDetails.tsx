import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2, Settings2, Share2, AlertCircle } from 'lucide-react';
import { GA4Selection } from './GA4Selection';
import { GTMCodeModal } from './GTMCodeModal';

interface PropertyDetailsProps {
  property: {
    id: string;
    name: string;
    type: 'ga4' | 'gtm';
    configured: boolean;
  };
  onBack: () => void;
  onConfigured: () => void;
}

interface GTMConfig {
  containerId: string;
  containerType: 'web' | 'amp' | 'ios' | 'android';
  serverDomain?: string;
}

export function PropertyDetails({ property, onBack, onConfigured }: PropertyDetailsProps) {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [configurationStep, setConfigurationStep] = useState(0);
  const [isConfigured, setIsConfigured] = useState(property.configured);
  const [showAudienceConfig, setShowAudienceConfig] = useState(false);
  const [showGA4Selection, setShowGA4Selection] = useState(false);
  const [selectedGA4Id, setSelectedGA4Id] = useState<string | null>(null);
  const [showGTMCode, setShowGTMCode] = useState(false);
  const [gtmConfig, setGtmConfig] = useState<GTMConfig>({
    containerId: 'GTM-DEMO123',
    containerType: 'web',
    serverDomain: 'organizedautomation.com'
  });

  const configSteps = {
    ga4: [
      'Creating GA4 property...',
      'Configuring data streams...',
      'Setting up enhanced measurement...',
      'Configuring user properties...',
      'Setting up ecommerce tracking...',
      'Finalizing configuration...'
    ],
    gtm: [
      'Creating GTM container...',
      'Setting up workspace...',
      'Configuring built-in variables...',
      'Setting up consent configuration...',
      'Creating preview environment...',
      'Finalizing configuration...'
    ]
  };

  const handleGA4Selection = async (measurementId: string) => {
    setSelectedGA4Id(measurementId);
    setShowGA4Selection(false);
    startConfiguration();
  };

  const startConfiguration = async () => {
    setShowAudienceConfig(false);
    setIsConfiguring(true);
    
    for (let i = 0; i < configSteps[property.type].length; i++) {
      setConfigurationStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (property.type === 'gtm') {
      setShowGTMCode(true);
    }

    setIsConfigured(true);
    setIsConfiguring(false);
    onConfigured();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-dark-300 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">{property.name}</h1>
      </div>

      {!isConfigured && !isConfiguring && (
        <div className="bg-dark-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Configuration Required</h2>
              <p className="text-gray-400 mb-4">
                {property.type === 'ga4'
                  ? 'Your GA4 property needs to be configured with the recommended settings for optimal tracking.'
                  : 'Your GTM container needs to be configured with the recommended tags and triggers.'}
              </p>
              {property.type === 'ga4' ? (
                <button
                  onClick={() => setShowGA4Selection(true)}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Configure GA4 Property
                </button>
              ) : (
                <button
                  onClick={startConfiguration}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Configure GTM Container
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isConfiguring && (
        <div className="bg-dark-200 rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Loader2 className="w-6 h-6 text-primary-400 animate-spin" />
            <div>
              <h2 className="text-xl font-semibold">Configuring {property.type.toUpperCase()}</h2>
              <p className="text-gray-400">{configSteps[property.type][configurationStep]}</p>
            </div>
          </div>
          <div className="w-full bg-dark-300 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((configurationStep + 1) / configSteps[property.type].length) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {isConfigured && (
        <div className="bg-dark-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Configuration Complete</h2>
              <p className="text-gray-400 mb-4">
                {property.type === 'ga4'
                  ? 'Your GA4 property is configured and ready to collect data.'
                  : 'Your GTM container is configured and ready to be implemented.'}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => property.type === 'gtm' ? setShowGTMCode(true) : null}
                  className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span>{property.type === 'ga4' ? 'View Data Stream' : 'View Container Code'}</span>
                </button>
                <button className="flex items-center space-x-2 bg-dark-300 hover:bg-dark-400 text-white px-4 py-2 rounded-lg transition-colors">
                  <Settings2 className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showGA4Selection && (
        <GA4Selection
          onBack={() => setShowGA4Selection(false)}
          onSelect={handleGA4Selection}
        />
      )}

      {showGTMCode && (
        <GTMCodeModal
          isOpen={showGTMCode}
          onClose={() => setShowGTMCode(false)}
          containerId={gtmConfig.containerId}
          subdomain={gtmConfig.serverDomain || 'www.googletagmanager.com'}
        />
      )}
    </div>
  );
}