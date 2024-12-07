import React, { useState } from 'react';
import { X, AlertCircle, Award, ChevronRight, CheckCircle2, ArrowLeft, ChevronDown } from 'lucide-react';

interface Improvement {
  id: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  options?: {
    value: string;
    label: string;
  }[];
  selectedOption?: string;
}

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditResults: {
    ga4: {
      events: any[];
      keyEvents: any[];
      audiences: any[];
      grade?: {
        score: 'A' | 'B' | 'C' | 'D' | 'F';
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
      grade?: {
        score: 'A' | 'B' | 'C' | 'D' | 'F';
      };
    };
  } | null;
}

export function AuditModal({ isOpen, onClose, auditResults }: AuditModalProps) {
  const [selectedGrade, setSelectedGrade] = useState<'ga4' | 'gtm' | null>(null);
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);
  const [isReconfiguring, setIsReconfiguring] = useState(false);
  const [improvements, setImprovements] = useState<Record<'ga4' | 'gtm', Improvement[]>>({
    ga4: [
      {
        id: 'ga4-ecommerce',
        description: 'Configure ecommerce events',
        impact: 'high',
        category: 'Ecommerce',
        options: [
          { value: 'basic', label: 'Basic (view_item, add_to_cart)' },
          { value: 'enhanced', label: 'Enhanced (includes checkout steps)' },
          { value: 'full', label: 'Full (all ecommerce events)' }
        ]
      },
      {
        id: 'ga4-user-props',
        description: 'Set up user properties',
        impact: 'medium',
        category: 'User Analysis',
        options: [
          { value: 'basic', label: 'Basic (user type, login status)' },
          { value: 'advanced', label: 'Advanced (lifetime value, preferences)' }
        ]
      },
      {
        id: 'ga4-dimensions',
        description: 'Configure custom dimensions',
        impact: 'medium',
        category: 'Configuration',
        options: [
          { value: 'product', label: 'Product-based' },
          { value: 'user', label: 'User-based' },
          { value: 'both', label: 'Both product and user' }
        ]
      }
    ],
    gtm: [
      {
        id: 'gtm-security',
        description: 'Security configurations',
        impact: 'high',
        category: 'Security',
        options: [
          { value: 'basic', label: 'Basic security measures' },
          { value: 'advanced', label: 'Advanced security (with CSP)' },
          { value: 'enterprise', label: 'Enterprise-grade security' }
        ]
      },
      {
        id: 'gtm-consent',
        description: 'Consent management',
        impact: 'high',
        category: 'Privacy',
        options: [
          { value: 'basic', label: 'Basic consent (cookie notice)' },
          { value: 'tcf', label: 'TCF 2.0 integration' },
          { value: 'custom', label: 'Custom consent framework' }
        ]
      },
      {
        id: 'gtm-triggers',
        description: 'Trigger configuration',
        impact: 'medium',
        category: 'Configuration',
        options: [
          { value: 'basic', label: 'Basic triggers' },
          { value: 'advanced', label: 'Advanced triggers' },
          { value: 'custom', label: 'Custom trigger conditions' }
        ]
      }
    ]
  });

  if (!isOpen || !auditResults) return null;

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'border-red-500/20 text-red-400';
      case 'medium':
        return 'border-yellow-500/20 text-yellow-400';
      case 'low':
        return 'border-blue-500/20 text-blue-400';
    }
  };

  const toggleImprovement = (id: string) => {
    setSelectedImprovements(current =>
      current.includes(id)
        ? current.filter(i => i !== id)
        : [...current, id]
    );
  };

  const handleOptionChange = (improvementId: string, value: string) => {
    setImprovements(current => ({
      ...current,
      [selectedGrade!]: current[selectedGrade!].map(imp =>
        imp.id === improvementId ? { ...imp, selectedOption: value } : imp
      )
    }));
  };

  const calculateNewGrade = (type: 'ga4' | 'gtm', selectedOptions: Record<string, string>): 'A' | 'B' | 'C' | 'D' | 'F' => {
    const weights = {
      high: 3,
      medium: 2,
      low: 1
    };

    const maxScore = improvements[type].reduce((acc, imp) => acc + weights[imp.impact], 0) * 3;
    let score = 0;

    improvements[type].forEach(imp => {
      if (selectedOptions[imp.id]) {
        const optionValue = selectedOptions[imp.id];
        const optionScore = optionValue === 'advanced' || optionValue === 'enterprise' || optionValue === 'full' ? 3 
          : optionValue === 'multi' || optionValue === 'tcf' || optionValue === 'custom' ? 2 
          : 1;
        score += weights[imp.impact] * optionScore;
      }
    });

    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const handleReconfigure = async () => {
    setIsReconfiguring(true);
    
    const selectedOptions = improvements[selectedGrade!].reduce((acc, imp) => ({
      ...acc,
      [imp.id]: imp.selectedOption
    }), {});

    const newGrade = calculateNewGrade(selectedGrade!, selectedOptions);

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (auditResults[selectedGrade!].grade) {
      auditResults[selectedGrade!].grade.score = newGrade;
    } else {
      auditResults[selectedGrade!].grade = { score: newGrade };
    }
    
    setIsReconfiguring(false);
    setSelectedGrade(null);
    setSelectedImprovements([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-200 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-dark-300 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Configuration Audit Results</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {selectedGrade ? (
            <>
              <button
                onClick={() => setSelectedGrade(null)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Overview</span>
              </button>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    {selectedGrade.toUpperCase()} Improvements
                  </h3>
                  {selectedImprovements.length > 0 && (
                    <button
                      onClick={handleReconfigure}
                      disabled={isReconfiguring}
                      className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isReconfiguring ? 'Applying Changes...' : 'Apply Selected Changes'}
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {improvements[selectedGrade].map((imp) => (
                    <div key={imp.id} className="flex items-start space-x-4 bg-dark-300 p-4 rounded-lg">
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          id={imp.id}
                          checked={selectedImprovements.includes(imp.id)}
                          onChange={() => toggleImprovement(imp.id)}
                          className="rounded border-dark-400 text-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <label
                            htmlFor={imp.id}
                            className="font-medium cursor-pointer"
                          >
                            {imp.description}
                          </label>
                          <span className={`text-sm px-2 py-0.5 border rounded-full ${getImpactColor(imp.impact)}`}>
                            {imp.impact} impact
                          </span>
                        </div>
                        {imp.options && selectedImprovements.includes(imp.id) && (
                          <div className="mt-2">
                            <select
                              value={imp.selectedOption || ''}
                              onChange={(e) => handleOptionChange(imp.id, e.target.value)}
                              className="w-full bg-dark-400 border border-dark-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                              <option value="">Select an option</option>
                              {imp.options.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        <span className="text-sm text-gray-400">
                          Category: {imp.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setSelectedGrade('ga4')}
                className="bg-dark-300 hover:bg-dark-400 p-6 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">GA4 Configuration</h3>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-8 h-8 text-primary-400" />
                  <span className="text-2xl font-bold">
                    {auditResults.ga4.grade?.score || 'C'}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setSelectedGrade('gtm')}
                className="bg-dark-300 hover:bg-dark-400 p-6 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">GTM Configuration</h3>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-8 h-8 text-primary-400" />
                  <span className="text-2xl font-bold">
                    {auditResults.gtm.grade?.score || 'C'}
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}