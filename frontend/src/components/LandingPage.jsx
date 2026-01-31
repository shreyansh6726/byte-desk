import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './logo.png'; 

const LandingPage = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || (e.ctrlKey && e.keyCode === 85)) {
        e.preventDefault();
      }
    };
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/login');
    }, 1200); 
  };

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div 
      style={styles.container}
      initial="hidden"
      animate="visible"
      variants={containerVars}
    >
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
          }
          * { cursor: default; -webkit-touch-callout: none; box-sizing: border-box; }
          button, span[onClick] { cursor: pointer !important; }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <AnimatePresence>
        {isExiting && (
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={styles.transitionOverlay}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={styles.loaderContainer}
            >
              <div style={styles.spinner} />
              <p style={styles.loadingText}>Setting up your Workspace .....</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={styles.bgWrapper}>
        {/* Animated Blue Blob - Top Right */}
        <motion.div 
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -40, 0],
            scale: [1, 2.0, 1], // Doubled expansion area (from 1.5 to 2.0)
            opacity: [0.4, 0.5, 0.4] 
          }}
          transition={{ 
            duration: 6, // Doubled speed (from 12s to 6s)
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{ ...styles.blob, ...styles.blob1 }}
        />
        
        {/* Animated Grey Blob - Bottom Left (Increased Intensity) */}
        <motion.div 
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 50, 0],
            scale: [1, 2.0, 1],
            opacity: [0.6, 0.85, 0.6] // Increased opacity for higher intensity
          }}
          transition={{ 
            duration: 7.5, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 1 
          }}
          style={{ 
            ...styles.blob, 
            ...styles.blob2, 
            background: '#8993a3', // Deeper, more intense grey
            opacity: 0.7 // Higher base opacity
          }}
        />
        <div style={styles.gridOverlay} />
      </div>

      <header style={styles.header}>
        <motion.div variants={itemVars} style={styles.logoContainer}>
          <img src={logo} alt="ByteDesk Logo" style={styles.logoImage} onDragStart={(e) => e.preventDefault()} />
          <span style={styles.logoText}>ByteDesk</span>
        </motion.div>
      </header>

      <main style={styles.main}>
        <motion.h1 variants={itemVars} style={styles.heroTitle}>
          Empower Your <span style={styles.accentText}>Digital Workflow</span>
        </motion.h1>
        
        <motion.p variants={itemVars} style={styles.heroSubtitle}>
          A seamless, secure, and smart ecosystem designed for modern corporate efficiency. 
          Manage your bytes, master your desk.
        </motion.p>
      </main>

      <motion.div variants={itemVars} style={styles.footerAction} whileHover={{ x: 5 }}>
        <motion.button 
          onClick={handleStart}
          style={styles.ctaButton}
          whileHover={{ scale: 1.05, backgroundColor: '#0056b3' }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started <span style={{ marginLeft: '10px' }}>→</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    backgroundColor: '#f8f9fa',
    color: '#1a1a1a',
    fontFamily: '"Inter", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    padding: '0 8%',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    boxSizing: 'border-box'
  },
  transitionOverlay: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: '#1a1a1a', zIndex: 10, transformOrigin: 'bottom',
    display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  loaderContainer: { textAlign: 'center' },
  spinner: {
    width: '30px', height: '30px', border: '3px solid rgba(255,255,255,0.1)',
    borderTopColor: '#fff', borderRadius: '50%',
    animation: 'spin 0.8s linear infinite', margin: '0 auto 15px'
  },
  loadingText: { color: '#fff', fontSize: '14px', fontWeight: '500', letterSpacing: '1px' },
  bgWrapper: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' },
  gridOverlay: {
    position: 'absolute', width: '100%', height: '100%',
    backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
    backgroundSize: '100px 100px', opacity: 0.2, maskImage: 'radial-gradient(circle, black, transparent 80%)'
  },
  blob: { position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4 },
  blob1: { width: '400px', height: '400px', background: '#007bff', top: '-100px', right: '-50px' },
  blob2: { width: '350px', height: '350px', background: '#6c757d', bottom: '50px', left: '-50px' },
  header: { height: '100px', display: 'flex', alignItems: 'center', zIndex: 1 },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoImage: { height: '40px', width: 'auto', objectFit: 'contain', pointerEvents: 'none' },
  logoText: { fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' },
  main: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '800px', zIndex: 1 },
  heroTitle: { fontSize: 'clamp(32px, 8vw, 64px)', fontWeight: '800', lineHeight: '1.1', margin: '0 0 24px 0', letterSpacing: '-2px' },
  accentText: { color: '#007bff' },
  heroSubtitle: { fontSize: '1.2rem', color: '#555', lineHeight: '1.6', maxWidth: '550px', margin: 0 },
  footerAction: { position: 'absolute', bottom: '60px', left: '8%', zIndex: 1 },
  ctaButton: { 
    padding: '18px 36px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', 
    borderRadius: '12px', fontSize: '16px', fontWeight: '600', display: 'flex', 
    alignItems: 'center', transition: 'background-color 0.3s ease', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' 
  }
};

export default LandingPage;