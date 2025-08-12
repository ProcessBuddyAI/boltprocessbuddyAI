import React, { useState } from 'react';
import { LayoutDashboard, FileText, Users, UsersIcon, BarChart3, Settings, TrendingUp, Award, Clock, Zap } from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'processes', name: 'Processes', icon: FileText },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'teams', name: 'Teams', icon: UsersIcon },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const quickStats = [
    { 
      label: 'Total Users', 
      value: '247', 
      icon: Users, 
      color: 'from-blue-500 to-cyan-500',
      trend: '+12%'
    },
    { 
      label: 'Active Processes', 
      value: '18', 
      icon: FileText, 
      color: 'from-purple-500 to-pink-500',
      trend: '+3'
    },
    { 
      label: 'Avg. Completion', 
      value: '78%', 
      icon: TrendingUp, 
      color: 'from-green-500 to-emerald-500',
      trend: '+5%'
    },
    { 
      label: 'XP Earned', 
      value: '45.2K', 
      icon: Zap, 
      color: 'from-amber-500 to-orange-500',
      trend: '+18%'
    }
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Navigation */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Admin Panel
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

      {/* Quick Stats */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
          Quick Stats
        </h4>
        
        <div className="space-y-4">
          {quickStats.map((stat, index) => (
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

        {/* Activity Feed */}
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
            Recent Activity
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Sarah Chen</span> completed "Leave Policy"
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  New process uploaded: "Expense Approval"
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">15 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Mike Johnson</span> promoted to Sub-Admin
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;