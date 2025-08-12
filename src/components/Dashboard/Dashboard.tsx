import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Trophy, Star, Award, Crown } from 'lucide-react';
import DashboardNavigation from './DashboardNavigation';
import DashboardSidebar from './DashboardSidebar';
import DashboardEmptyState from './DashboardEmptyState';
import ChatInterface from './ChatInterface';

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [userProgress] = useState({
    percentage: 25,
    xp: 150,
    nextBadgeXP: 500,
    badges: [
      { id: 'first-upload', name: 'First Upload', icon: Trophy, unlocked: true },
      { id: 'chat-master', name: 'Chat Master', icon: Star, unlocked: false },
      { id: 'process-expert', name: 'Process Expert', icon: Award, unlocked: false },
      { id: 'power-user', name: 'Power User', icon: Crown, unlocked: false }
    ]
  });

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Get user data
  const currentUser = {
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
    avatar: user.user_metadata?.avatar_url
  };

  const handleFileUpload = (files: FileList) => {
    // Handle file upload logic here
    console.log('Files uploaded:', files);
    
    // For demo purposes, simulate selecting the first uploaded process
    const fileName = files[0]?.name || 'New Process';
    setSelectedProcess(fileName);
  };

  const handleProcessSelect = (processId: string | null) => {
    setSelectedProcess(processId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Animated Background Nodes */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-float-delayed-2"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-white rounded-full animate-float-delayed"></div>
        
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full">
          <line x1="25%" y1="25%" x2="33%" y2="33%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="animate-pulse" />
          <line x1="75%" y1="33%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="animate-pulse" style={{animationDelay: '1s'}} />
          <line x1="33%" y1="75%" x2="50%" y2="67%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="animate-pulse" style={{animationDelay: '2s'}} />
        </svg>
      </div>

      {/* Navigation */}
      <DashboardNavigation currentUser={currentUser} />

      {/* Main Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <DashboardSidebar 
          selectedProcess={selectedProcess}
          onProcessSelect={handleProcessSelect}
          userProgress={userProgress}
        />

        {/* Main Content Area */}
        <div className="flex-1 ml-80 pt-16">
          <div className="p-8">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {currentUser.name}! 👋
              </h1>
              <p className="text-blue-200 dark:text-blue-300">
                {selectedProcess 
                  ? `Currently working with: ${selectedProcess}`
                  : 'Ready to transform your processes into conversations'
                }
              </p>
            </div>

            {/* Main Workspace */}
            <div className="min-h-[600px]">
              {selectedProcess ? (
                <ChatInterface 
                  processTitle={selectedProcess}
                  processId={selectedProcess}
                />
              ) : (
                <DashboardEmptyState onFileUpload={handleFileUpload} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;