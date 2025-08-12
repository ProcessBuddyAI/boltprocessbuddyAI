import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AdminNavigation from './AdminNavigation';
import AdminSidebar from './AdminSidebar';
import AdminOverview from './AdminOverview';
import ProcessManagement from './ProcessManagement';
import UserManagement from './UserManagement';

const AdminDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading admin dashboard...</p>
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
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Admin',
    avatar: user.user_metadata?.avatar_url
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminOverview />;
      case 'processes':
        return <ProcessManagement />;
      case 'users':
        return <UserManagement />;
      case 'teams':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Team Management
              </h2>
              <p className="text-blue-200 dark:text-blue-300">
                Organize users into teams and assign sub-admins
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400">Team management features coming soon...</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Analytics & Reports
              </h2>
              <p className="text-blue-200 dark:text-blue-300">
                Detailed insights into user progress and process effectiveness
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400">Analytics dashboard coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Admin Settings
              </h2>
              <p className="text-blue-200 dark:text-blue-300">
                Configure system settings and preferences
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <AdminOverview />;
    }
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
      <AdminNavigation currentUser={currentUser} />

      {/* Main Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <AdminSidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content Area */}
        <div className="flex-1 ml-80 pt-16">
          <div className="p-8">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;