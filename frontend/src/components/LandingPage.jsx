import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  // Animation variant for the subtle "breathing" effect
  const blobVariants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* --- ANIMATED COLOR SPOTS --- */}
      
      {/* Blue Spot (Top Right) */}
      <motion.div 
        variants={blobVariants}
        animate="animate"
        style={styles.blueSpot}
      />

      {/* Greyish Spot (Bottom Left) */}
      <motion.div 
        variants={blobVariants}
        animate="animate"
        style={styles.greySpot}
      />

      {/* --- CONTENT LAYER --- */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>ByteDesk</div>
        <button onClick={() => navigate('/login')} style={styles.loginBtn}>Login</button>
      </nav>

      <main style={styles.hero}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.title}
        >
          Work smarter, <br /> 
          <span style={{ color: '#3b82f6' }}>not harder.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={styles.subtitle}
        >
          The all-in-one professional workspace for creative minds.
        </motion.p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/signup')}
          style={styles.cta}
        >
          Get Started for Free
        </motion.button>
      </main>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Inter", sans-serif'
  },
  // Blue Glow Style
  blueSpot: {
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(255, 255, 255, 0) 70%)',
    filter: 'blur(60px)',
    zIndex: 1
  },
  // Grey Glow Style
  greySpot: {
    position: 'absolute',
    bottom: '-10%',
    left: '-5%',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(148, 163, 184, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
    filter: 'blur(80px)',
    zIndex: 1
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px 60px',
    zIndex: 10
  },
  logo: {
    fontSize: '24px',
    fontWeight: '800',
    letterSpacing: '-1px'
  },
  loginBtn: {
    padding: '10px 24px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    background: 'white',
    cursor: 'pointer',
    fontWeight: '600'
  },
  hero: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    zIndex: 10,
    padding: '0 20px'
  },
  title: {
    fontSize: '72px',
    fontWeight: '900',
    color: '#0f172a',
    lineHeight: 1.1,
    marginBottom: '20px'
  },
  subtitle: {
    fontSize: '20px',
    color: '#64748b',
    maxWidth: '500px',
    marginBottom: '40px'
  },
  cta: {
    padding: '16px 32px',
    backgroundColor: '#0f172a',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  }
};

export default Landing;