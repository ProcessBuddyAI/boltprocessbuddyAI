import React from 'react';
import { Building2, CreditCard, Users, Flag, Activity, FileText, Settings, TrendingUp, DollarSign, Shield, AlertTriangle } from 'lucide-react';

interface SuperAdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'organizations', name: 'Organizations', icon: Building2 },
    { id: 'billing', name: 'Plans & Billing', icon: CreditCard },
    { id: 'users', name: 'Platform Users', icon: Users },
    { id: 'features', name: 'Feature Flags', icon: Flag },
    { id: 'health', name: 'System Health', icon: Activity },
    { id: 'reports', name: 'Reports/Exports', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const platformStats = [
    { 
      label: 'Total Orgs', 
      value: '1,247', 
      icon: Building2, 
      color: 'from-blue-500 to-cyan-500',
      trend: '+23'
    },
    { 
      label: 'Active Users', 
      value: '15.2K', 
      icon: Users, 
      color: 'from-green-500 to-emerald-500',
      trend: '+156'
    },
    { 
      label: 'Monthly Revenue', 
      value: '$89.4K', 
      icon: DollarSign, 
      color: 'from-purple-500 to-pink-500',
      trend: '+12%'
    },
    { 
      label: 'System Health', 
      value: '99.9%', 
      icon: Shield, 
      color: 'from-green-500 to-teal-500',
      trend: 'Stable'
    }
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Navigation */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-red-500" />
          <span>Super Admin</span>
        </h3>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Platform Stats */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
          Platform Overview
        </h4>
        
        <div className="space-y-4">
          {platformStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-600"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {stat.value}
              </div>
              
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* System Alerts */}
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
            System Alerts
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <div className="flex-1">
                <p className="text-xs text-yellow-800 dark:text-yellow-200 font-medium">
                  High API usage detected
                </p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                  TechCorp Inc. - 2 min ago
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <div className="flex-1">
                <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">
                  New enterprise signup
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  GlobalTech Solutions - 15 min ago
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
              <div className="flex-1">
                <p className="text-xs text-green-800 dark:text-green-200 font-medium">
                  All systems operational
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Last check: 1 min ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;