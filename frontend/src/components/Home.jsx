import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  
  // Cleanly parse the user from session storage
  const userData = sessionStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : "Guest";

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { id: 'dash', name: 'Dashboard', icon: '📊' },
    { id: 'docs', name: 'Documents', icon: '📄' },
    { id: 'wb', name: 'Whiteboard', icon: '🎨' },
    { id: 'chat', name: 'Team Chat', icon: '💬' },
    { id: 'set', name: 'Settings', icon: '⚙️' },
  ];

  const navLinks = ["Home", "Options", "Tools", "About Us", "T&C", "Profile"];

  return (
    <div style={styles.container}>
      {/* --- TOP NAVBAR --- */}
      <nav style={styles.navbar}>
        <div style={styles.logoSection}>
          <span style={styles.logoText}>ByteDesk</span>
        </div>
        
        {/* CENTERED SEARCH BAR */}
        <div style={styles.searchContainer}>
          <div style={{
            ...styles.searchWrapper,
            borderColor: searchFocused ? '#1a1a1a' : '#e0e0e0',
            boxShadow: searchFocused ? '0 0 0 2px rgba(26,26,26,0.1)' : 'none'
          }}>
            <span style={styles.searchIcon}>🔍</span>
            <input 
              type="text" 
              placeholder="Search documents, boards, or tools..." 
              style={styles.searchInput}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        <div style={styles.navLinksContainer}>
          {navLinks.map((link) => (
            <span key={link} style={styles.navLink}>{link}</span>
          ))}
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
              <div 
                key={item.id} 
                style={{
                  ...styles.menuItem,
                  backgroundColor: hoveredItem === item.id ? '#f5f7fa' : 'transparent'
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span style={styles.menuIcon}>{item.icon}</span>
                <AnimatePresence>
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
            <h1 style={styles.welcomeText}>Good Morning, {user}</h1>
            <p style={styles.subText}>Welcome back to your workspace. Here's what's happening.</p>
          </header>

          <section style={styles.grid}>
            <motion.div whileHover={{ y: -5 }} style={styles.card}>
              <span style={styles.cardTag}>New</span>
              <h3>Recent Projects</h3>
              <p>Continue where you left off</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} style={styles.card}>
              <h3>Shared with Me</h3>
              <p>Collaborate with your team</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} style={styles.card}>
              <h3>Templates</h3>
              <p>Start from a pre-set layout</p>
            </motion.div>
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
    backgroundColor: '#f8fafc',
  },
  navbar: {
    height: '70px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    zIndex: 100,
  },
  logoSection: { flex: '0 0 200px' },
  logoText: { fontSize: '22px', fontWeight: '800', color: '#1a1a1a', letterSpacing: '-0.8px' },
  
  searchContainer: { flex: 1, display: 'flex', justifyContent: 'center', padding: '0 40px' },
  searchWrapper: {
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: '8px 16px',
    borderRadius: '10px',
    border: '1px solid transparent',
    transition: 'all 0.2s ease',
  },
  searchIcon: { marginRight: '10px', color: '#94a3b8', fontSize: '14px' },
  searchInput: {
    width: '100%',
    background: 'none',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    color: '#1e293b',
  },

  navLinksContainer: { display: 'flex', alignItems: 'center', gap: '20px', flex: '0 0 auto' },
  navLink: { fontSize: '13px', fontWeight: '600', color: '#64748b', cursor: 'pointer', transition: '0.2s' },
  logoutBtn: { 
    backgroundColor: '#1a1a1a', 
    color: '#fff', 
    border: 'none', 
    padding: '8px 16px', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: '600',
    fontSize: '13px',
    marginLeft: '10px'
  },
  
  mainLayout: { display: 'flex', flex: 1, overflow: 'hidden' },
  
  sidebar: {
    backgroundColor: '#fff',
    borderRight: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  sidebarHeader: { padding: '20px', display: 'flex', justifyContent: 'center' },
  collapseBtn: { 
    background: '#f1f5f9', 
    border: 'none', 
    borderRadius: '8px', 
    width: '32px', 
    height: '32px', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    color: '#64748b' 
  },
  
  menuList: { padding: '0 12px' },
  menuItem: { 
    display: 'flex', 
    alignItems: 'center', 
    padding: '12px 16px', 
    borderRadius: '10px', 
    marginBottom: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  menuIcon: { fontSize: '18px', width: '24px', display: 'flex', justifyContent: 'center' },
  menuText: { marginLeft: '12px', fontSize: '14px', fontWeight: '500', color: '#334155', whiteSpace: 'nowrap' },

  content: { flex: 1, padding: '40px', overflowY: 'auto' },
  contentHeader: { marginBottom: '40px' },
  welcomeText: { fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' },
  subText: { color: '#64748b', marginTop: '8px', fontSize: '16px' },
  
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' },
  card: { 
    backgroundColor: '#fff', 
    padding: '24px',
    borderRadius: '16px', 
    border: '1px solid #e2e8f0', 
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    position: 'relative'
  },
  cardTag: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '700'
  }
};

export default Home;