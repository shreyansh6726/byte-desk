import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Whiteboard from './components/Whiteboard';
import TermsAndConditions from './components/TermsAndConditions';
import LoginPage from './components/LoginForm';
import Landing from './components/LandingPage'; 

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isReauthenticating, setIsReauthenticating] = useState(() => !!localStorage.getItem('user'));
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const sessionStarted = sessionStorage.getItem('session_active');

    if (user && isReauthenticating && !sessionStarted) {
      const timer = setTimeout(() => {
        setIsReauthenticating(false);
        sessionStorage.setItem('session_active', 'true');
      }, 2200);
      return () => clearTimeout(timer);
    } else {
      setIsReauthenticating(false);
      if (user) sessionStorage.setItem('session_active', 'true');
    }
  }, [user, isReauthenticating]);

  const initiateLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem('user');
      sessionStorage.removeItem('session_active');
      setUser(null);
      setIsLoggingOut(false);
    }, 2800);
  };

  if (!user && !isLoggingOut) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoggingOut && (
          <motion.div 
            key="logout-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={overlayStyles.logoutOverlay}
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              style={overlayStyles.successCard}
            >
              <div style={overlayStyles.lockCircle}>
                <span style={overlayStyles.lockIcon}>🔒</span>
              </div>
              <h2 style={overlayStyles.successTitle}>Signing Out...</h2>
              <p style={overlayStyles.successText}>Keeping your work safe and secure.</p>
              <div style={overlayStyles.progressContainer}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  style={overlayStyles.progressBar}
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {isReauthenticating && !isLoggingOut ? (
          <motion.div 
            key="reauth-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            style={overlayStyles.successOverlay}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: [1, 1.05, 1], opacity: 1 }} 
              transition={{ duration: 0.5 }}
              style={overlayStyles.successCard}
            >
              <div style={overlayStyles.checkmarkCircle}>
                <span style={overlayStyles.checkmark}>✓</span>
              </div>
              {/* Added responsive font size and white-space fix here */}
              <h2 style={overlayStyles.welcomeTitle}>Welcome Back, {user}!</h2>
              <p style={overlayStyles.successText}>Authenticating... Redirecting to your dashboard</p>
            </motion.div>
          </motion.div>
        ) : !isLoggingOut && (
          <motion.div 
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(15px)", scale: 0.95 }}
            transition={{ duration: 0.8 }}
            style={{ height: '100vh', width: '100%' }}
          >
            <MainLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogoutTrigger={initiateLogout}>
              <AnimatePresence mode="wait">
                {activeTab === 'Dashboard' && <Home key="dashboard" />}
                {activeTab === 'Whiteboard' && <Whiteboard key="whiteboard" />}
                {activeTab === 'T&C' && <TermsAndConditions key="terms" />}
              </AnimatePresence>
            </MainLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const overlayStyles = {
  successOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#ffffff', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px' },
  logoutOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  
  // Expanded maxWidth to accommodate longer names like "Shreyansh Srivastava"
  successCard: { textAlign: 'center', width: '100%', maxWidth: '600px' }, 
  
  lockCircle: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px', boxShadow: '0 10px 25px rgba(15,23,42,0.3)' },
  lockIcon: { fontSize: '35px' },
  checkmarkCircle: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#28a745', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px', boxShadow: '0 10px 25px rgba(40,167,69,0.3)' },
  checkmark: { color: 'white', fontSize: '40px', fontWeight: 'bold' },
  
  // New style specifically for the Welcome title to prevent wrapping
  welcomeTitle: { 
    fontSize: '28px', 
    color: '#1a1a1a', 
    fontWeight: '700', 
    fontFamily: '"Inter", sans-serif',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis' 
  },
  
  successTitle: { fontSize: '28px', color: '#1a1a1a', fontWeight: '700', fontFamily: '"Inter", sans-serif' },
  successText: { fontSize: '16px', color: '#666', fontFamily: '"Inter", sans-serif', marginBottom: '25px' },
  progressContainer: { width: '200px', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '10px', margin: '0 auto', overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#0f172a', borderRadius: '10px' }
};

export default App;