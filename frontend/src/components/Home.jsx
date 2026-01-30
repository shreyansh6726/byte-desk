import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  
  // Safe user check for build
  const user = JSON.parse(sessionStorage.getItem('user')) || "User";

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Documents', icon: '📄' },
    { name: 'Whiteboard', icon: '🎨' },
    { name: 'Team Chat', icon: '💬' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const navLinks = ["Home", "Options", "Tools", "About Us", "T&C", "Profile"];

  return (
    <div style={styles.container}>
      {/* --- TOP NAVBAR --- */}
      <nav style={styles.navbar}>
        <div style={styles.logoSection}>
          <span style={styles.logoText}>ByteDesk</span>
        </div>
        
        <div style={styles.navLinksContainer}>
          {navLinks.map((link) => (
            <span key={link} style={styles.navLink}>{link}</span>
          ))}
        </div>

        <div style={styles.profileSection}>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <div style={styles.mainLayout}>
        {/* --- COLLAPSIBLE SIDEBAR --- */}
        <motion.aside 
          animate={{ width: isCollapsed ? '80px' : '260px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={styles.sidebar}
        >
          <div style={styles.sidebarHeader}>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)} 
              style={styles.collapseBtn}
            >
              {isCollapsed ? '→' : '←'}
            </button>
          </div>

          <div style={styles.menuList}>
            {menuItems.map((item) => (
              <div key={item.name} style={styles.menuItem}>
                <span style={styles.menuIcon}>{item.icon}</span>
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -10 }}
                      style={styles.menuText}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main style={styles.content}>
          <header style={styles.contentHeader}>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={styles.welcomeText}
            >
              Good Morning, {user}
            </motion.h1>
            <p style={styles.subText}>What would you like to create today?</p>
          </header>

          <section style={styles.grid}>
            <motion.div whileHover={{ y: -5 }} style={styles.card}>Recent Projects</motion.div>
            <motion.div whileHover={{ y: -5 }} style={styles.card}>Shared with Me</motion.div>
            <motion.div whileHover={{ y: -5 }} style={styles.card}>Templates</motion.div>
          </section>
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Inter", sans-serif',
    backgroundColor: '#f8fafc', // Slightly softer grey-blue
  },
  navbar: {
    height: '70px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 30px',
    zIndex: 100,
  },
  logoText: { fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
  navLinksContainer: { 
    display: 'flex', 
    gap: '30px', 
    position: 'absolute', 
    left: '50%', 
    transform: 'translateX(-50%)' 
  },
  navLink: { fontSize: '14px', fontWeight: '600', color: '#64748b', cursor: 'pointer', transition: '0.2s' },
  logoutBtn: { backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },
  
  mainLayout: { display: 'flex', flex: 1, overflow: 'hidden' },
  
  sidebar: {
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  sidebarHeader: { padding: '20px', display: 'flex', justifyContent: 'center' },
  collapseBtn: { 
    background: '#f1f5f9', 
    border: '1px solid #e2e8f0', 
    borderRadius: '8px', 
    width: '32px', 
    height: '32px', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontWeight: 'bold',
    color: '#64748b'
  },
  
  menuList: { padding: '12px' },
  menuItem: { 
    display: 'flex', 
    alignItems: 'center', 
    padding: '12px 16px', 
    borderRadius: '12px', 
    marginBottom: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    color: '#475569',
  },
  menuIcon: { fontSize: '20px', minWidth: '24px' },
  menuText: { marginLeft: '16px', fontSize: '15px', fontWeight: '500', whiteSpace: 'nowrap' },

  content: { flex: 1, padding: '40px', overflowY: 'auto' },
  contentHeader: { marginBottom: '40px' },
  welcomeText: { fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: 0 },
  subText: { color: '#64748b', marginTop: '8px', fontSize: '16px' },
  
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' },
  card: { 
    backgroundColor: '#ffffff', 
    height: '220px', 
    borderRadius: '24px', 
    border: '1px solid #e2e8f0', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    color: '#94a3b8', 
    fontWeight: '600', 
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer'
  }
};

export default Home;