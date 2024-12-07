import React from 'react';
import { X, ArrowRight, CheckCircle2, XCircle, Shield, Server, Globe } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComparisonModal({ isOpen, onClose }: ComparisonModalProps) {
  if (!isOpen) return null;

  // Demo data
  const comparisonData = {
    eventCoverage: {
      systemA: {
        total: 45,
        matched: 38,
        missing: 7,
        events: [
          { name: 'page_view', count: 15000, matchStatus: 'matched' },
          { name: 'scroll', count: 8500, matchStatus: 'matched' },
          { name: 'click', count: 6200, matchStatus: 'mismatched' },
          { name: 'form_submit', count: 450, matchStatus: 'matched' },
          { name: 'video_start', count: 2800, matchStatus: 'missing' },
        ]
      },
      systemB: {
        total: 42,
        matched: 38,
        missing: 4,
        events: [
          { name: 'page_view', count: 14850, matchStatus: 'matched' },
          { name: 'scroll', count: 8480, matchStatus: 'matched' },
          { name: 'click', count: 5100, matchStatus: 'mismatched' },
          { name: 'form_submit', count: 448, matchStatus: 'matched' },
        ]
      }
    },
    gtmComparison: {
      systemA: {
        clientSide: {
          tags: [
            { name: 'GA4 Page View', type: 'GA4 Event', status: 'active' },
            { name: 'Facebook Pixel', type: 'Marketing', status: 'active' },
            { name: 'Custom Event', type: 'Custom HTML', status: 'paused' }
          ],
          triggers: [
            { name: 'All Pages', type: 'Page View', count: 15000 },
            { name: 'Scroll Depth', type: 'Scroll', count: 8500 },
            { name: 'Form Submit', type: 'Form', count: 450 }
          ],
          variables: [
            { name: 'Page URL', type: 'URL', usage: 12 },
            { name: 'User ID', type: 'Data Layer', usage: 8 },
            { name: 'ecommerce.total', type: 'Data Layer', usage: 5 }
          ]
        },
        serverSide: {
          tags: [
            { name: 'GA4 Server', type: 'GA4', status: 'active' },
            { name: 'Facebook Conversions API', type: 'Marketing', status: 'active' }
          ],
          triggers: [
            { name: 'Purchase Event', type: 'Custom Event', count: 1200 },
            { name: 'Lead Submit', type: 'Custom Event', count: 350 }
          ],
          variables: [
            { name: 'Client ID', type: 'Server', usage: 15 },
            { name: 'Transaction ID', type: 'Server', usage: 10 }
          ]
        },
        privacy: {
          consentRate: 85,
          firstPartyData: true,
          cookieUsage: 3,
          dataRetentionDays: 60,
          gdprCompliant: true,
          ccpaCompliant: true
        }
      },
      systemB: {
        clientSide: {
          tags: [
            { name: 'GA4 Page View', type: 'GA4 Event', status: 'active' },
            { name: 'Google Ads', type: 'Marketing', status: 'active' }
          ],
          triggers: [
            { name: 'All Pages', type: 'Page View', count: 14850 },
            { name: 'Scroll Depth', type: 'Scroll', count: 8480 }
          ],
          variables: [
            { name: 'Page Path', type: 'URL', usage: 10 },
            { name: 'ecommerce.total', type: 'Data Layer', usage: 4 }
          ]
        },
        serverSide: {
          tags: [
            { name: 'GA4 Server', type: 'GA4', status: 'active' }
          ],
          triggers: [
            { name: 'Purchase Event', type: 'Custom Event', count: 1150 }
          ],
          variables: [
            { name: 'Client ID', type: 'Server', usage: 12 }
          ]
        },
        privacy: {
          consentRate: 78,
          firstPartyData: false,
          cookieUsage: 5,
          dataRetentionDays: 90,
          gdprCompliant: true,
          ccpaCompliant: false
        }
      }
    },
    dataQuality: {
      systemA: {
        score: 92,
        issues: 3,
        duplicates: 45
      },
      systemB: {
        score: 88,
        issues: 5,
        duplicates: 62
      }
    },
    realtimeMetrics: {
      systemA: {
        activeUsers: 256,
        eventsPerMinute: 1200,
        avgResponseTime: 180
      },
      systemB: {
        activeUsers: 251,
        eventsPerMinute: 1150,
        avgResponseTime: 195
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-200 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-dark-300 flex justify-between items-center">
          <h2 className="text-2xl font-bold">System Comparison</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-8">
          {/* GTM Implementation Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary-400">GTM Implementation</h3>
            <div className="grid grid-cols-2 gap-8">
              {/* System A */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium">System A</h4>
                
                {/* Client-side Section */}
                <div className="bg-dark-300 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Globe className="w-5 h-5 text-primary-400" />
                    <h5 className="font-medium">Client-side Tags</h5>
                  </div>
                  <div className="space-y-3">
                    {comparisonData.gtmComparison.systemA.clientSide.tags.map((tag, index) => (
                      <div key={index} className="flex items-center justify-between bg-dark-400 p-2 rounded">
                        <span>{tag.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tag.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {tag.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Server-side Section */}
                <div className="bg-dark-300 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Server className="w-5 h-5 text-primary-400" />
                    <h5 className="font-medium">Server-side Tags</h5>
                  </div>
                  <div className="space-y-3">
                    {comparisonData.gtmComparison.systemA.serverSide.tags.map((tag, index) => (
                      <div key={index} className="flex items-center justify-between bg-dark-400 p-2 rounded">
                        <span>{tag.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tag.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {tag.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Privacy Metrics */}
                <div className="bg-dark-300 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="w-5 h-5 text-primary-400" />
                    <h5 className="font-medium">Privacy Metrics</h5>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Consent Rate</span>
                      <span className="text-green-400">{comparisonData.gtmComparison.systemA.privacy.consentRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>First-party Data</span>
                      <CheckCircle2 className={`w-5 h-5 ${
                        comparisonData.gtmComparison.systemA.privacy.firstPartyData ? 'text-green-400' : 'text-red-400'
                      }`} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cookie Usage</span>
                      <span>{comparisonData.gtmComparison.systemA.privacy.cookieUsage} cookies</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Data Retention</span>
                      <span>{comparisonData.gtmComparison.systemA.privacy.dataRetentionDays} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>GDPR Compliant</span>
                      <CheckCircle2 className={`w-5 h-5 ${
                        comparisonData.gtmComparison.systemA.privacy.gdprCompliant ? 'text-green-400' : 'text-red-400'
                      }`} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>CCPA Compliant</span>
                      <CheckCircle2 className={`w-5 h-5 ${
                        comparisonData.gtmComparison.systemA.privacy.ccpaCompliant ? 'text-green-400' : 'text-red-400'
                      }`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* System B */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium">System B</h4>
                
                {/* Client-side Section */}
                <div className="bg-dark-300 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Globe className="w-5 h-5 text-primary-400" />
                    <h5 className="font-medium">Client-side Tags</h5>
                  </div>
                  <div className="space-y-3">
                    {comparisonData.gtmComparison.systemB.clientSide.tags.map((tag, index) => (
                      <div key={index} className="flex items-center justify-between bg-dark-400 p-2 rounded">
                        <span>{tag.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tag.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {tag.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Server-side Section */}
                <div className="bg-dark-300 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Server className="w-5 h-5 text-primary-400" />
                    <h5 className="font-medium">Server-side Tags</h5>
                  </div>
                  <div className="space-y-3">
                    {comparisonData.gtmComparison.systemB.serverSide.tags.map((tag, index) => (
                      <div key={index} className="flex items-center justify-between bg-dark-400 p-2 rounded">
                        <span>{tag.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tag.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {tag.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Privacy Metrics */}
                <div className="bg-dark-300 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="w-5 h-5 text-primary-400" />
                    <h5 className="font-medium">Privacy Metrics</h5>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Consent Rate</span>
                      <span className="text-yellow-400">{comparisonData.gtmComparison.systemB.privacy.consentRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>First-party Data</span>
                      <CheckCircle2 className={`w-5 h-5 ${
                        comparisonData.gtmComparison.systemB.privacy.firstPartyData ? 'text-green-400' : 'text-red-400'
                      }`} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cookie Usage</span>
                      <span>{comparisonData.gtmComparison.systemB.privacy.cookieUsage} cookies</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Data Retention</span>
                      <span>{comparisonData.gtmComparison.systemB.privacy.dataRetentionDays} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>GDPR Compliant</span>
                      <CheckCircle2 className={`w-5 h-5 ${
                        comparisonData.gtmComparison.systemB.privacy.gdprCompliant ? 'text-green-400' : 'text-red-400'
                      }`} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>CCPA Compliant</span>
                      <CheckCircle2 className={`w-5 h-5 ${
                        comparisonData.gtmComparison.systemB.privacy.ccpaCompliant ? 'text-green-400' : 'text-red-400'
                      }`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Coverage Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary-400">Event Coverage</h3>
            <div className="grid grid-cols-2 gap-8">
              {/* System A */}
              <div className="bg-dark-300 rounded-lg p-4">
                <h4 className="text-lg font-medium mb-4">System A</h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Total Events: {comparisonData.eventCoverage.systemA.total}</span>
                    <span>Matched: {comparisonData.eventCoverage.systemA.matched}</span>
                    <span>Missing: {comparisonData.eventCoverage.systemA.missing}</span>
                  </div>
                  <div className="space-y-2">
                    {comparisonData.eventCoverage.systemA.events.map((event, index) => (
                      <div key={index} className="flex items-center justify-between bg-dark-400 p-2 rounded">
                        <span>{event.name}</span>
                        <div className="flex items-center space-x-4">
                          <span>{event.count.toLocaleString()}</span>
                          {event.matchStatus === 'matched' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                          {event.matchStatus === 'mismatched' && <XCircle className="w-4 h-4 text-yellow-400" />}
                          {event.matchStatus === 'missing' && <XCircle className="w-4 h-4 text-red-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* System B */}
              <div className="bg-dark-300 rounded-lg p-4">
                <h4 className="text-lg font-medium mb-4">System B</h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Total Events: {comparisonData.eventCoverage.systemB.total}</span>
                    <span>Matched: {comparisonData.eventCoverage.systemB.matched}</span>
                    <span>Missing: {comparisonData.eventCoverage.systemB.missing}</span>
                  </div>
                  <div className="space-y-2">
                    {comparisonData.eventCoverage.systemB.events.map((event, index) => (
                      <div key={index} className="flex items-center justify-between bg-dark-400 p-2 rounded">
                        <span>{event.name}</span>
                        <div className="flex items-center space-x-4">
                          <span>{event.count.toLocaleString()}</span>
                          {event.matchStatus === 'matched' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                          {event.matchStatus === 'mismatched' && <XCircle className="w-4 h-4 text-yellow-400" />}
                          {event.matchStatus === 'missing' && <XCircle className="w-4 h-4 text-red-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Quality Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary-400">Data Quality</h3>
            <div className="grid grid-cols-2 gap-8">
              {/* System A */}
              <div className="bg-dark-300 rounded-lg p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Quality Score</span>
                    <span className="text-2xl font-bold text-green-400">{comparisonData.dataQuality.systemA.score}%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Data Issues</span>
                      <span>{comparisonData.dataQuality.systemA.issues}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duplicate Events</span>
                      <span>{comparisonData.dataQuality.systemA.duplicates}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System B */}
              <div className="bg-dark-300 rounded-lg p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Quality Score</span>
                    <span className="text-2xl font-bold text-yellow-400">{comparisonData.dataQuality.systemB.score}%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Data Issues</span>
                      <span>{comparisonData.dataQuality.systemB.issues}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duplicate Events</span>
                      <span>{comparisonData.dataQuality.systemB.duplicates}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Realtime Metrics */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary-400">Realtime Metrics</h3>
            <div className="grid grid-cols-2 gap-8">
              {/* System A */}
              <div className="bg-dark-300 rounded-lg p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-400 p-3 rounded">
                      <div className="text-sm text-gray-400">Active Users</div>
                      <div className="text-2xl font-bold">{comparisonData.realtimeMetrics.systemA.activeUsers}</div>
                    </div>
                    <div className="bg-dark-400 p-3 rounded">
                      <div className="text-sm text-gray-400">Events/min</div>
                      <div className="text-2xl font-bold">{comparisonData.realtimeMetrics.systemA.eventsPerMinute}</div>
                    </div>
                    <div className="bg-dark-400 p-3 rounded col-span-2">
                      <div className="text-sm text-gray-400">Avg Response Time</div>
                      <div className="text-2xl font-bold">{comparisonData.realtimeMetrics.systemA.avgResponseTime}ms</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* System B */}
              <div className="bg-dark-300 rounded-lg p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-400 p-3 rounded">
                      <div className="text-sm text-gray-400">Active Users</div>
                      <div className="text-2xl font-bold">{comparisonData.realtimeMetrics.systemB.activeUsers}</div>
                    </div>
                    <div className="bg-dark-400 p-3 rounded">
                      <div className="text-sm text-gray-400">Events/min</div>
                      <div className="text-2xl font-bold">{comparisonData.realtimeMetrics.systemB.eventsPerMinute}</div>
                    </div>
                    <div className="bg-dark-400 p-3 rounded col-span-2">
                      <div className="text-sm text-gray-400">Avg Response Time</div>
                      <div className="text-2xl font-bold">{comparisonData.realtimeMetrics.systemB.avgResponseTime}ms</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}