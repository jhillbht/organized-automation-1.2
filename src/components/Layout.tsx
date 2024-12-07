import React from 'react';
import { LucideIcon, Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  navigation: {
    name: string;
    icon: LucideIcon;
    view: string;
  }[];
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Layout({ children, navigation, currentView, onNavigate }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-dark-100 text-white">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-dark-200 border-b border-dark-300">
        <div className="flex items-center space-x-2">
          <Logo className="w-8 h-8" />
          <span className="text-xl font-bold text-primary-400">Organized Automation</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex h-[calc(100vh-64px)] lg:h-screen">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:flex flex-col w-64 bg-dark-200 border-r border-dark-300 p-4">
          <div className="flex items-center space-x-2 mb-8">
            <Logo className="w-10 h-10" />
            <span className="text-2xl font-bold text-primary-400">Organized Automation</span>
          </div>
          <nav className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.view)}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === item.view
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-gray-400 hover:bg-dark-300 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute inset-x-0 top-16 bg-dark-200 border-b border-dark-300 z-50">
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentView === item.view
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-gray-400 hover:bg-dark-300 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}