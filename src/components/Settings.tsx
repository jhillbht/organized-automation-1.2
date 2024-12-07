import React from 'react';
import { Key } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="bg-dark-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Google API Configuration</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Client ID
            </label>
            <input
              type="text"
              className="w-full bg-dark-300 border border-dark-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="Enter your Google API Client ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Client Secret
            </label>
            <input
              type="password"
              className="w-full bg-dark-300 border border-dark-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="Enter your Google API Client Secret"
            />
          </div>

          <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Key className="w-5 h-5" />
            <span>Save Credentials</span>
          </button>
        </div>
      </div>

      <div className="bg-dark-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account Permissions</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="gtm-permission"
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="gtm-permission">Google Tag Manager API access</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="ga4-permission"
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="ga4-permission">Google Analytics 4 API access</label>
          </div>
        </div>
      </div>
    </div>
  );
}