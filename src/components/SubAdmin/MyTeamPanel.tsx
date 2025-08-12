import React, { useState } from 'react';
import { Search, Filter, Users, Send, Eye, TrendingUp, Award, Calendar, Bell } from 'lucide-react';

const MyTeamPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      assignedProcesses: 3,
      completionRate: 85,
      xp: 1250,
      badges: 3,
      lastActive: '2 hours ago',
      status: 'in-progress',
      processes: [
        { name: 'Employee Leave Policy', completion: 100, status: 'completed' },
        { name: 'Expense Approval', completion: 75, status: 'in-progress' },
        { name: 'IT Security Guidelines', completion: 0, status: 'not-started' }
      ]
    },
    {
      id: 2,
      name: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      assignedProcesses: 2,
      completionRate: 92,
      xp: 2100,
      badges: 5,
      lastActive: '30 minutes ago',
      status: 'completed',
      processes: [
        { name: 'Sales Process Documentation', completion: 100, status: 'completed' },
        { name: 'Customer Onboarding', completion: 85, status: 'in-progress' }
      ]
    },
    {
      id: 3,
      name: 'Emily Watson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      assignedProcesses: 4,
      completionRate: 60,
      xp: 980,
      badges: 2,
      lastActive: '1 day ago',
      status: 'in-progress',
      processes: [
        { name: 'Design Guidelines', completion: 100, status: 'completed' },
        { name: 'Brand Standards', completion: 50, status: 'in-progress' },
        { name: 'Creative Workflow', completion: 25, status: 'in-progress' },
        { name: 'Asset Management', completion: 0, status: 'not-started' }
      ]
    },
    {
      id: 4,
      name: 'David Rodriguez',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      assignedProcesses: 1,
      completionRate: 100,
      xp: 1500,
      badges: 4,
      lastActive: '5 minutes ago',
      status: 'completed',
      processes: [
        { name: 'Quality Assurance Process', completion: 100, status: 'completed' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'not-started':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSendReminder = (memberId: number) => {
    console.log(`Sending reminder to member ${memberId}`);
    // Implement reminder functionality
  };

  const handleViewProgress = (memberId: number) => {
    setSelectedMember(selectedMember === memberId ? null : memberId);
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">My Team</h2>
            <p className="text-blue-100">Manage and track your team's progress</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <div className="text-white text-sm">Team Size</div>
              <div className="text-white text-2xl font-bold">{teamMembers.length}</div>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <div className="text-white text-sm">Avg. Completion</div>
              <div className="text-white text-2xl font-bold">
                {Math.round(teamMembers.reduce((acc, member) => acc + member.completionRate, 0) / teamMembers.length)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Team Members ({filteredMembers.length})
          </h3>
          
          <div className="flex gap-4 items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredMembers.map((member) => (
            <div key={member.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              {/* Member Overview */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {member.name}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {member.assignedProcesses} processes
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {member.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  {/* Progress */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Progress</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${member.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {member.completionRate}%
                      </span>
                    </div>
                  </div>

                  {/* XP & Badges */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">XP & Badges</div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1 text-blue-500" />
                        <span className="text-sm text-gray-900 dark:text-gray-100">{member.xp}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1 text-amber-500" />
                        <span className="text-sm text-gray-900 dark:text-gray-100">{member.badges}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                      {member.status.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewProgress(member.id)}
                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                      title="View Progress"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleSendReminder(member.id)}
                      className="p-2 text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-all duration-200"
                      title="Send Reminder"
                    >
                      <Bell className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Detailed Progress View */}
              {selectedMember === member.id && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Process Details
                  </h5>
                  <div className="space-y-3">
                    {member.processes.map((process, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {process.name}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${process.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {process.completion}%
                            </span>
                          </div>
                        </div>
                        <span className={`ml-4 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(process.status)}`}>
                          {process.status.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTeamPanel;