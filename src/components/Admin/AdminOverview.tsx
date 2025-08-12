import React from 'react';
import { FileText, Users, TrendingUp, Award, ArrowUp, ArrowDown } from 'lucide-react';

const AdminOverview: React.FC = () => {
  const overviewCards = [
    {
      title: 'Total Processes',
      value: '18',
      change: '+3',
      changeType: 'increase',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      description: 'Active process documents'
    },
    {
      title: 'Total Users',
      value: '247',
      change: '+12',
      changeType: 'increase',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      description: 'Registered employees'
    },
    {
      title: 'Overall Completion',
      value: '78%',
      change: '+5%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      description: 'Average completion rate'
    },
    {
      title: 'Badge Unlocks',
      value: '1,234',
      change: '-2%',
      changeType: 'decrease',
      icon: Award,
      color: 'from-amber-500 to-orange-500',
      description: 'Total badges earned'
    }
  ];

  const CircularProgress: React.FC<{ percentage: number; size?: number }> = ({ 
    percentage, 
    size = 120 
  }) => {
    const radius = (size - 16) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg 
          className="transform -rotate-90" 
          width={size} 
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {percentage}%
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Complete
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Admin Dashboard Overview
        </h2>
        <p className="text-blue-200 dark:text-blue-300">
          Monitor your organization's process management and user engagement
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            {/* Icon and Change Indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${
                card.changeType === 'increase' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {card.changeType === 'increase' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span>{card.change}</span>
              </div>
            </div>

            {/* Value and Title */}
            <div className="mb-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {card.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {card.title}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Completion Ring */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Overall Progress
          </h3>
          <div className="flex items-center justify-center">
            <CircularProgress percentage={78} size={160} />
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Organization-wide process completion rate
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Sarah Chen completed "Employee Leave Policy"
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  New process uploaded: "Expense Approval Workflow"
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">15 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Mike Johnson promoted to Sub-Admin
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Team "Marketing" achieved 90% completion rate
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Upload Process</span>
          </button>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Assign Users</span>
          </button>
          <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
            <Award className="w-5 h-5" />
            <span>View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;