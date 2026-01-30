import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.3, delayChildren: 0.2 } 
    }
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
      {/* Subtle Animated Background Decor */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={styles.bgCircle}
      />

      {/* Header Section */}
      <header style={styles.header}>
        <motion.div variants={itemVars} style={styles.logoContainer}>
          <div style={styles.logoPlaceholder}>BD</div>
          <span style={styles.logoText}>ByteDesk</span>
        </motion.div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <motion.h1 variants={itemVars} style={styles.heroTitle}>
          Empower Your <span style={styles.accentText}>Digital Workflow</span>
        </motion.h1>
        
        <motion.p variants={itemVars} style={styles.heroSubtitle}>
          A seamless, secure, and smart ecosystem designed for modern corporate efficiency. 
          Manage your bytes, master your desk.
        </motion.p>
      </main>

      {/* Lower Left Call to Action */}
      <motion.div 
        variants={itemVars} 
        style={styles.footerAction}
        whileHover={{ x: 5 }}
      >
        <motion.button 
          onClick={() => navigate('/login')}
          style={styles.ctaButton}
          whileHover={{ scale: 1.05, backgroundColor: '#0056b3' }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started 
          <span style={{ marginLeft: '10px' }}>→</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: '"Inter", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    padding: '0 8%'
  },
  bgCircle: {
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,123,255,0.08) 0%, rgba(255,255,255,0) 70%)',
    zIndex: 0
  },
  header: {
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoPlaceholder: {
    width: '40px',
    height: '40px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  logoText: {
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '-0.5px'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '800px',
    zIndex: 1
  },
  heroTitle: {
    fontSize: '64px',
    fontWeight: '800',
    lineHeight: '1.1',
    margin: '0 0 24px 0',
    letterSpacing: '-2px'
  },
  accentText: {
    color: '#007bff' // Corporate Blue
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#555',
    lineHeight: '1.6',
    maxWidth: '550px',
    margin: 0
  },
  footerAction: {
    position: 'absolute',
    bottom: '60px',
    left: '8%',
    zIndex: 1
  },
  ctaButton: {
    padding: '18px 36px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  }
};

export default LandingPage;