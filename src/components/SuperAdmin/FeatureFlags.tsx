import React, { useState } from 'react';
import { Flag, Globe, Building2, Save, RotateCcw, AlertCircle } from 'lucide-react';

const FeatureFlags: React.FC = () => {
  const [selectedScope, setSelectedScope] = useState<'global' | 'per-org'>('global');
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  const organizations = [
    { id: 'techcorp', name: 'TechCorp Inc.' },
    { id: 'startupxyz', name: 'StartupXYZ' },
    { id: 'globaltech', name: 'GlobalTech Solutions' },
    { id: 'innovatelabs', name: 'InnovateLabs' },
    { id: 'megacorp', name: 'MegaCorp Industries' }
  ];

  const [featureFlags, setFeatureFlags] = useState([
    {
      id: 'gamification',
      name: 'Gamification System',
      description: 'Enable XP, badges, and progress tracking for users',
      category: 'User Experience',
      globalEnabled: true,
      orgSettings: {
        techcorp: true,
        startupxyz: false,
        globaltech: true,
        innovatelabs: true,
        megacorp: true
      },
      impact: 'high',
      rolloutPercentage: 85
    },
    {
      id: 'demo_mode',
      name: 'Demo Mode',
      description: 'Allow users to try the platform without signing up',
      category: 'Access Control',
      globalEnabled: false,
      orgSettings: {
        techcorp: false,
        startupxyz: true,
        globaltech: false,
        innovatelabs: false,
        megacorp: false
      },
      impact: 'medium',
      rolloutPercentage: 25
    },
    {
      id: 'advanced_chat',
      name: 'Advanced Chat Features',
      description: 'Enable file uploads, voice messages, and advanced AI responses',
      category: 'AI & Chat',
      globalEnabled: true,
      orgSettings: {
        techcorp: true,
        startupxyz: false,
        globaltech: true,
        innovatelabs: false,
        megacorp: true
      },
      impact: 'high',
      rolloutPercentage: 60
    },
    {
      id: 'analytics_dashboard',
      name: 'Analytics Dashboard',
      description: 'Detailed usage analytics and reporting for admins',
      category: 'Analytics',
      globalEnabled: false,
      orgSettings: {
        techcorp: true,
        startupxyz: false,
        globaltech: false,
        innovatelabs: false,
        megacorp: true
      },
      impact: 'medium',
      rolloutPercentage: 40
    },
    {
      id: 'api_access',
      name: 'API Access',
      description: 'Enable REST API access for integrations',
      category: 'Integrations',
      globalEnabled: false,
      orgSettings: {
        techcorp: true,
        startupxyz: false,
        globaltech: false,
        innovatelabs: false,
        megacorp: true
      },
      impact: 'high',
      rolloutPercentage: 15
    },
    {
      id: 'dark_mode',
      name: 'Dark Mode',
      description: 'Enable dark theme across the platform',
      category: 'User Experience',
      globalEnabled: true,
      orgSettings: {
        techcorp: true,
        startupxyz: true,
        globaltech: true,
        innovatelabs: true,
        megacorp: true
      },
      impact: 'low',
      rolloutPercentage: 95
    }
  ]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'User Experience':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'AI & Chat':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Analytics':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Integrations':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Access Control':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const toggleFeature = (featureId: string, scope: 'global' | 'org', orgId?: string) => {
    setFeatureFlags(prev => prev.map(feature => {
      if (feature.id === featureId) {
        if (scope === 'global') {
          return { ...feature, globalEnabled: !feature.globalEnabled };
        } else if (scope === 'org' && orgId) {
          return {
            ...feature,
            orgSettings: {
              ...feature.orgSettings,
              [orgId]: !feature.orgSettings[orgId]
            }
          };
        }
      }
      return feature;
    }));
  };

  const handleNotesChange = (featureId: string, value: string) => {
    setNotes(prev => ({ ...prev, [featureId]: value }));
  };

  const saveChanges = () => {
    console.log('Saving feature flag changes...');
    // Implement save logic
  };

  const resetChanges = () => {
    console.log('Resetting feature flag changes...');
    // Implement reset logic
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Feature Flags
          </h2>
          <p className="text-blue-200 dark:text-blue-300">
            Control feature rollouts globally or per organization
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={resetChanges}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button 
            onClick={saveChanges}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Scope Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Configuration Scope
        </h3>
        
        <div className="flex items-center space-x-6 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="scope"
              value="global"
              checked={selectedScope === 'global'}
              onChange={(e) => setSelectedScope(e.target.value as 'global' | 'per-org')}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="text-gray-900 dark:text-gray-100 font-medium">Global Settings</span>
            </div>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="scope"
              value="per-org"
              checked={selectedScope === 'per-org'}
              onChange={(e) => setSelectedScope(e.target.value as 'global' | 'per-org')}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              <span className="text-gray-900 dark:text-gray-100 font-medium">Per Organization</span>
            </div>
          </label>
        </div>

        {selectedScope === 'per-org' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Organization
            </label>
            <select
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Select an organization...</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Feature Flags */}
      <div className="space-y-6">
        {featureFlags.map((feature) => (
          <div
            key={feature.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Flag className="w-5 h-5 text-blue-600" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {feature.name}
                  </h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(feature.category)}`}>
                    {feature.category}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(feature.impact)}`}>
                    {feature.impact} impact
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {feature.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>Rollout: {feature.rolloutPercentage}%</span>
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${feature.rolloutPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="ml-6">
                {selectedScope === 'global' ? (
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={feature.globalEnabled}
                      onChange={() => toggleFeature(feature.id, 'global')}
                      className="sr-only"
                    />
                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      feature.globalEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        feature.globalEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </label>
                ) : selectedOrg ? (
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={feature.orgSettings[selectedOrg] || false}
                      onChange={() => toggleFeature(feature.id, 'org', selectedOrg)}
                      className="sr-only"
                    />
                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      feature.orgSettings[selectedOrg] ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        feature.orgSettings[selectedOrg] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </label>
                ) : (
                  <div className="flex items-center text-gray-400">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm">Select org</span>
                  </div>
                )}
              </div>
            </div>

            {/* Organization Status (when in per-org mode) */}
            {selectedScope === 'per-org' && selectedOrg && (
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Organization Status Overview
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {organizations.map(org => (
                    <div key={org.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{org.name}</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        feature.orgSettings[org.id] 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {feature.orgSettings[org.id] ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Field */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Change Notes
              </label>
              <textarea
                value={notes[feature.id] || ''}
                onChange={(e) => handleNotesChange(feature.id, e.target.value)}
                placeholder="Add notes about this change..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureFlags;