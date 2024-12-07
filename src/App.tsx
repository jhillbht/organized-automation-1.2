import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';
import { LineChart, Tag, Settings2 } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'settings'>('dashboard');

  const navigation = [
    { name: 'Dashboard', icon: LineChart, view: 'dashboard' },
    { name: 'Settings', icon: Settings2, view: 'settings' },
  ];

  return (
    <Layout 
      navigation={navigation}
      currentView={currentView}
      onNavigate={(view) => setCurrentView(view as 'dashboard' | 'settings')}
    >
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'settings' && <Settings />}
    </Layout>
  );
}

export default App;