import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import SubAdminDashboard from './components/SubAdmin/SubAdminDashboard';
import SuperAdminDashboard from './components/SuperAdmin/SuperAdminDashboard';
import AuthPage from './components/Auth/AuthPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/subadmin" element={<SubAdminDashboard />} />
          <Route path="/superadmin" element={<SuperAdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;