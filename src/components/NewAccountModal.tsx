import React, { useState } from 'react';
import { X, BarChart3, Box, ChevronRight, Server, Globe } from 'lucide-react';
import { StapeConfig } from './StapeConfig';

interface NewAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFirstAccount: boolean;
  onCreateAccount: (type: 'ga4' | 'gtm', containerType?: 'client' | 'server') => void;
}

export function NewAccountModal({ isOpen, onClose, isFirstAccount, onCreateAccount }: NewAccountModalProps) {
  const [showGTMOptions, setShowGTMOptions] = useState(false);
  const [showStapeConfig, setShowStapeConfig] = useState(false);

  if (!isOpen) return null;

  if (showStapeConfig) {
    return (
      <StapeConfig
        onBack={() => setShowStapeConfig(false)}
        onConfigure={(useStape) => {
          onCreateAccount('gtm', 'server');
          setShowStapeConfig(false);
          onClose();
        }}
      />
    );
  }

  if (showGTMOptions) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-dark-200 rounded-lg w-full max-w-md">
          <div className="p-6 border-b border-dark-300 flex items-center">
            <button
              onClick={() => setShowGTMOptions(false)}
              className="mr-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold">Select Container Type</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <button
              onClick={() => {
                onCreateAccount('gtm', 'client');
                onClose();
              }}
              className="w-full flex items-center justify-between p-4 bg-dark-300 hover:bg-dark-400 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <Globe className="w-6 h-6 text-primary-400" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Client-Side Container</h3>
                  <p className="text-sm text-gray-400">Traditional web container for client-side tracking</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={() => setShowStapeConfig(true)}
              className="w-full flex items-center justify-between p-4 bg-dark-300 hover:bg-dark-400 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <Server className="w-6 h-6 text-primary-400" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Server-Side Container</h3>
                  <p className="text-sm text-gray-400">Advanced container for server-side tracking</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-200 rounded-lg w-full max-w-md">
        <div className="p-6 border-b border-dark-300 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {isFirstAccount ? 'Create Account' : 'Add New Property'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <button
            onClick={() => {
              onCreateAccount('ga4');
              onClose();
            }}
            className="w-full flex items-center justify-between p-4 bg-dark-300 hover:bg-dark-400 rounded-lg transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-500/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Google Analytics 4</h3>
                <p className="text-sm text-gray-400">Create a new GA4 property</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>

          <button
            onClick={() => setShowGTMOptions(true)}
            className="w-full flex items-center justify-between p-4 bg-dark-300 hover:bg-dark-400 rounded-lg transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-500/20 rounded-lg">
                <Box className="w-6 h-6 text-primary-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Google Tag Manager</h3>
                <p className="text-sm text-gray-400">Create a new GTM container</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>

          {isFirstAccount && (
            <p className="text-sm text-gray-400 mt-4">
              This will create an "Organized Automation" account with your selected property type.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}