import React, { useState } from 'react';
import { CreditCard, DollarSign, Users, Zap, Crown, Building2, TrendingUp, AlertCircle } from 'lucide-react';

const PlansAndBilling: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'personal',
      name: 'Personal',
      price: '$5',
      period: 'per user/month',
      features: [
        '1 Process document',
        'Basic AI conversations',
        'Email support',
        'Standard security'
      ],
      limits: {
        processes: 1,
        users: 1,
        storage: '1GB',
        support: 'Email'
      },
      color: 'from-gray-500 to-gray-600',
      subscribers: 234
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$15',
      period: 'per user/month',
      features: [
        '10 Process documents',
        'Advanced AI conversations',
        'Priority support',
        'Team collaboration',
        'Analytics dashboard',
        'Custom integrations'
      ],
      limits: {
        processes: 10,
        users: 'Unlimited',
        storage: '10GB',
        support: 'Priority'
      },
      color: 'from-blue-500 to-purple-500',
      subscribers: 892,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      features: [
        'Unlimited processes',
        'Advanced AI with custom training',
        'Dedicated support manager',
        'SSO & advanced security',
        'Custom workflows',
        'API access',
        'On-premise deployment'
      ],
      limits: {
        processes: 'Unlimited',
        users: 'Unlimited',
        storage: 'Unlimited',
        support: 'Dedicated'
      },
      color: 'from-purple-500 to-pink-500',
      subscribers: 121
    }
  ];

  const billingStats = [
    {
      label: 'Monthly Revenue',
      value: '$89,420',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Active Subscriptions',
      value: '1,247',
      change: '+23',
      icon: CreditCard,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Avg Revenue Per User',
      value: '$71.75',
      change: '+8.2%',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Churn Rate',
      value: '2.1%',
      change: '-0.3%',
      icon: AlertCircle,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      org: 'TechCorp Inc.',
      amount: '$2,450.00',
      plan: 'Enterprise',
      status: 'paid',
      date: '2024-01-15',
      invoice: 'INV-2024-001'
    },
    {
      id: 2,
      org: 'StartupXYZ',
      amount: '$375.00',
      plan: 'Pro',
      status: 'paid',
      date: '2024-01-14',
      invoice: 'INV-2024-002'
    },
    {
      id: 3,
      org: 'InnovateLabs',
      amount: '$225.00',
      plan: 'Pro',
      status: 'failed',
      date: '2024-01-13',
      invoice: 'INV-2024-003'
    },
    {
      id: 4,
      org: 'MegaCorp Industries',
      amount: '$5,000.00',
      plan: 'Enterprise',
      status: 'pending',
      date: '2024-01-12',
      invoice: 'INV-2024-004'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Plans & Billing
        </h2>
        <p className="text-blue-200 dark:text-blue-300">
          Manage subscription plans, billing, and revenue analytics
        </p>
      </div>

      {/* Billing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {billingStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                stat.change.startsWith('+') 
                  ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                  : stat.change.startsWith('-') && stat.label === 'Churn Rate'
                  ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                  : 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Plan Cards */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Subscription Plans
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl mb-4`}>
                  {plan.id === 'personal' && <Users className="w-8 h-8 text-white" />}
                  {plan.id === 'pro' && <Zap className="w-8 h-8 text-white" />}
                  {plan.id === 'enterprise' && <Crown className="w-8 h-8 text-white" />}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{plan.name}</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 dark:text-gray-300 ml-2">/{plan.period}</span>
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {plan.subscribers} active subscribers
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Processes:</span>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{plan.limits.processes}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Users:</span>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{plan.limits.users}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Storage:</span>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{plan.limits.storage}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Support:</span>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{plan.limits.support}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Recent Transactions
            </h3>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Export All
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building2 className="w-5 h-5 text-gray-400 mr-3" />
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {transaction.org}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {transaction.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {transaction.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                      {transaction.invoice}
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

export default PlansAndBilling;