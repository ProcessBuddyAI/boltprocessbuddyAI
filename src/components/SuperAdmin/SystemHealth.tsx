import React, { useState } from 'react';
import { Activity, Server, Clock, AlertTriangle, CheckCircle, Download, Search, Filter, RefreshCw } from 'lucide-react';

const SystemHealth: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterEndpoint, setFilterEndpoint] = useState('all');

  const healthMetrics = [
    {
      label: 'API Uptime',
      value: '99.97%',
      status: 'excellent',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      trend: '+0.02%'
    },
    {
      label: 'Error Rate',
      value: '0.03%',
      status: 'good',
      icon: AlertTriangle,
      color: 'from-yellow-500 to-amber-500',
      trend: '-0.01%'
    },
    {
      label: 'Avg Latency',
      value: '127ms',
      status: 'good',
      icon: Clock,
      color: 'from-blue-500 to-cyan-500',
      trend: '-5ms'
    },
    {
      label: 'Active Connections',
      value: '2,847',
      status: 'normal',
      icon: Activity,
      color: 'from-purple-500 to-pink-500',
      trend: '+156'
    }
  ];

  const systemLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:32:15',
      org: 'TechCorp Inc.',
      endpoint: '/api/chat/process',
      status: 200,
      latency: '145ms',
      traceId: 'trace-abc123',
      method: 'POST',
      userAgent: 'ProcessBuddyAI/1.0'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:32:10',
      org: 'StartupXYZ',
      endpoint: '/api/auth/login',
      status: 401,
      latency: '89ms',
      traceId: 'trace-def456',
      method: 'POST',
      userAgent: 'Mozilla/5.0'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:32:05',
      org: 'GlobalTech',
      endpoint: '/api/processes/upload',
      status: 500,
      latency: '2.3s',
      traceId: 'trace-ghi789',
      method: 'POST',
      userAgent: 'ProcessBuddyAI/1.0'
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:32:00',
      org: 'MegaCorp',
      endpoint: '/api/users/profile',
      status: 200,
      latency: '67ms',
      traceId: 'trace-jkl012',
      method: 'GET',
      userAgent: 'ProcessBuddyAI/1.0'
    },
    {
      id: 5,
      timestamp: '2024-01-15 14:31:55',
      org: 'InnovateLabs',
      endpoint: '/api/chat/process',
      status: 429,
      latency: '12ms',
      traceId: 'trace-mno345',
      method: 'POST',
      userAgent: 'ProcessBuddyAI/1.0'
    }
  ];

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    } else if (status >= 300 && status < 400) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    } else if (status >= 400 && status < 500) {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    } else {
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 dark:text-green-400';
      case 'good':
        return 'text-blue-600 dark:text-blue-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const filteredLogs = systemLogs.filter(log => {
    const matchesSearch = log.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.traceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'success' && log.status >= 200 && log.status < 300) ||
                         (filterStatus === 'error' && log.status >= 400);
    const matchesEndpoint = filterEndpoint === 'all' || log.endpoint.includes(filterEndpoint);
    return matchesSearch && matchesStatus && matchesEndpoint;
  });

  const exportLogs = () => {
    console.log('Exporting logs to CSV...');
    // Implement CSV export logic
  };

  const refreshData = () => {
    console.log('Refreshing system health data...');
    // Implement data refresh logic
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            System Health & Logs
          </h2>
          <p className="text-blue-200 dark:text-blue-300">
            Monitor platform performance, API health, and system logs
          </p>
        </div>
        <button 
          onClick={refreshData}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className={`w-4 h-4 ${getHealthStatusColor(metric.status)}`} />
                <span className={`text-xs font-semibold ${getHealthStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {metric.label}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 font-semibold">
              {metric.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Performance Charts Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Performance Overview
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Requests Over Time
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Chart showing API request volume trends
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Failures by Endpoint
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Chart showing error rates by API endpoint
            </p>
          </div>
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Search and Filter Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              System Logs ({filteredLogs.length})
            </h3>
            
            <div className="flex gap-4 items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success (2xx)</option>
                  <option value="error">Error (4xx/5xx)</option>
                </select>
              </div>

              {/* Export Button */}
              <button 
                onClick={exportLogs}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Endpoint
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Latency
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trace ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {log.org}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                        {log.method}
                      </span>
                      <span className="ml-2">{log.endpoint}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <span className={`font-mono ${
                      parseFloat(log.latency) > 1000 ? 'text-red-600 dark:text-red-400' : 
                      parseFloat(log.latency) > 500 ? 'text-yellow-600 dark:text-yellow-400' : 
                      'text-green-600 dark:text-green-400'
                    }`}>
                      {log.latency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-mono">
                      {log.traceId}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;