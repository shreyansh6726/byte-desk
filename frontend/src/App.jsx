import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Whiteboard from './components/Whiteboard';
import TermsAndConditions from './components/TermsAndConditions';
import LoginPage from './components/LoginForm'; // Updated file name
import Landing from './components/LandingPage'; 

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const location = useLocation();
  
  // PERSISTENT STATE: Check localStorage instead of sessionStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sync user state if localStorage changes (e.g., after login/logout)
  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    setUser(loggedUser ? JSON.parse(loggedUser) : null);
  }, [location]);

  // If no user, show only Public Pages
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // If user is logged in, show the Dashboard Frame
  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
        {activeTab === 'Dashboard' && <Home key="dashboard" />}
        {activeTab === 'Whiteboard' && <Whiteboard key="whiteboard" />}
        {activeTab === 'T&C' && <TermsAndConditions key="terms" />}
        {/* Placeholder for future pages */}
        {activeTab === 'Profile' && <div key="profile">Profile Settings coming soon...</div>}
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;