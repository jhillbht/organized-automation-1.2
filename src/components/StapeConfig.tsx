import React from 'react';
import { ArrowLeft, Server, Shield, Zap } from 'lucide-react';

interface StapeConfigProps {
  onBack: () => void;
  onConfigure: (useStape: boolean) => void;
}

export function StapeConfig({ onBack, onConfigure }: StapeConfigProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-200 rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b border-dark-300 flex items-center">
          <button
            onClick={onBack}
            className="mr-4 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Server-side Container Setup</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Server className="w-6 h-6 text-primary-400" />
            <h3 className="text-xl font-semibold">Choose Your Infrastructure</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-dark-300 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6 text-primary-400" />
                <h4 className="text-lg font-medium">Standard Setup</h4>
              </div>
              <ul className="space-y-3 text-gray-400 mb-6">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  <span>Google Cloud Platform</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  <span>Manual infrastructure setup</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  <span>Standard configuration</span>
                </li>
              </ul>
              <button
                onClick={() => onConfigure(false)}
                className="w-full bg-dark-400 hover:bg-dark-500 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Use Standard Setup
              </button>
            </div>

            <div className="bg-dark-300 p-6 rounded-lg border-2 border-primary-500">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-6 h-6 text-primary-400" />
                <h4 className="text-lg font-medium">Stape.io Integration</h4>
              </div>
              <ul className="space-y-3 text-gray-400 mb-6">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  <span>Managed infrastructure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  <span>One-click deployment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  <span>Pre-configured templates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  <span>Advanced monitoring</span>
                </li>
              </ul>
              <button
                onClick={() => onConfigure(true)}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Use Stape.io
              </button>
            </div>
          </div>

          <div className="bg-dark-400 p-4 rounded-lg">
            <p className="text-sm text-gray-400">
              Server-side containers help improve data quality, reduce client-side code, and enhance privacy compliance. 
              Choose Stape.io for a managed solution or standard setup for custom infrastructure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}