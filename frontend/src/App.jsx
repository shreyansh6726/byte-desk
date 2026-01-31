import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Whiteboard from './components/Whiteboard';
import TermsAndConditions from './components/TermsAndConditions';
import Login from './components/LoginForm'; // Assuming you have these
import Landing from './components/LandingPage'; 

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const location = useLocation();
  
  // Check if user is logged in via sessionStorage
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  // Sync user state if sessionStorage changes
  useEffect(() => {
    const loggedUser = sessionStorage.getItem('user');
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, [location]);

  // If there is no user, we only show Public Pages
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // If user IS logged in, we show the Dashboard Layout
  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
        {activeTab === 'Dashboard' && <Home key="dashboard" />}
        {activeTab === 'Whiteboard' && <Whiteboard key="whiteboard" />}
        {activeTab === 'T&C' && <TermsAndConditions key="terms" />}
        {/* Add more tabs here */}
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;