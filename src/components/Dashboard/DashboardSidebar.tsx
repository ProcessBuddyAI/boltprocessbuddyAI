import React, { useState } from 'react';
import { FileText, Bookmark, History, CheckSquare, Trophy, Star, Lock, Users } from 'lucide-react';

interface DashboardSidebarProps {
  selectedProcess: string | null;
  onProcessSelect: (processId: string | null) => void;
  activeMode?: 'myProcesses' | 'myTeam';
  onModeChange?: (mode: 'myProcesses' | 'myTeam') => void;
  showTeamNavigation?: boolean;
  userProgress: {
    percentage: number;
    xp: number;
    nextBadgeXP: number;
    badges: Array<{
      id: string;
      name: string;
      icon: React.ComponentType<any>;
      unlocked: boolean;
    }>;
  };
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  selectedProcess, 
  onProcessSelect, 
  activeMode = 'myProcesses',
  onModeChange,
  showTeamNavigation = false,
  userProgress 
}) => {
  const [activeTab, setActiveTab] = useState(activeMode === 'myTeam' ? 'team' : 'processes');

  const navItems = [
    { id: 'processes', name: 'My Processes', icon: FileText, count: 0 },
    ...(showTeamNavigation ? [{ id: 'team', name: 'My Team', icon: Users, count: 4 }] : []),
    { id: 'bookmarked', name: 'Bookmarked Answers', icon: Bookmark, count: 0 },
    { id: 'history', name: 'History', icon: History, count: 0 },
    { id: 'checklists', name: 'Task Checklists', icon: CheckSquare, count: 0 }
  ];

  const CircularProgress: React.FC<{ percentage: number }> = ({ percentage }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  const XPBar: React.FC<{ current: number; next: number }> = ({ current, next }) => {
    const progress = (current / next) * 100;

    return (
      <div className="w-full">
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
          <span>{current} XP</span>
          <span>{next} XP</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Progress & Gamification Section */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Your Progress
        </h3>
        
        {/* Circular Progress */}
        <div className="flex justify-center mb-6">
          <CircularProgress percentage={userProgress.percentage} />
        </div>

        {/* XP Bar */}
        <div className="mb-6">
          <XPBar current={userProgress.xp} next={userProgress.nextBadgeXP} />
        </div>

        {/* Badge Shelf */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Badges</h4>
          <div className="flex justify-center space-x-3">
            {userProgress.badges.map((badge) => (
              <div
                key={badge.id}
                className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  badge.unlocked
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:scale-110 animate-pulse'
                    : 'bg-gray-200 dark:bg-gray-600 opacity-50'
                }`}
                title={badge.name}
              >
                {badge.unlocked ? (
                  <badge.icon className="w-6 h-6 text-white" />
                ) : (
                  <>
                    <badge.icon className="w-6 h-6 text-gray-400" />
                    <Lock className="absolute -bottom-1 -right-1 w-4 h-4 text-gray-500 bg-white dark:bg-gray-800 rounded-full p-0.5" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === 'team' && onModeChange) {
                  onModeChange('myTeam');
                } else if (item.id === 'processes' && onModeChange) {
                  onModeChange('myProcesses');
                }
              }}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeTab === item.id
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.name}</span>
              <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'processes' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">No processes yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Upload your first document to see it here!
            </p>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Team management</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Switch to team view to manage your team
            </p>
          </div>
        )}

        {activeTab === 'bookmarked' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">No bookmarked answers</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Bookmark helpful answers during your chats
            </p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">No chat history</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Your conversation history will appear here
            </p>
          </div>
        )}

        {activeTab === 'checklists' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">No task checklists</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Create checklists from your process conversations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;