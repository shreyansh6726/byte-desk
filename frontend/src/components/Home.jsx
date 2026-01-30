import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const user = JSON.parse(sessionStorage.getItem('user')) || "Creative Mind";

  useEffect(() => {
    const hour = new Date().getHours();
    
    // 8 PM (20) to 4:59 AM
    if (hour >= 20 || hour < 5) {
      setGreeting('Hello');
    } 
    // 5 AM to 11:59 AM
    else if (hour >= 5 && hour < 12) {
      setGreeting('Good morning');
    } 
    // 12 PM to 2:59 PM (14:59)
    else if (hour >= 12 && hour < 15) {
      setGreeting('Good afternoon');
    } 
    // 3 PM (15) to 7:59 PM (19:59)
    else {
      setGreeting('Good evening');
    }
  }, []);

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
        
        {/* --- CENTRAL SEARCH & NAV --- */}
        <div style={styles.centerGroup}>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>🔍</span>
            <input 
              type="text" 
              placeholder="Search files, tools, or teams..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <div style={styles.navLinksContainer}>
            {navLinks.map((link) => (
              <span key={link} style={styles.navLink}>{link}</span>
            ))}
          </div>
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
              {greeting}, {user}
            </motion.h1>
            <p style={styles.subText}>Welcome to your ByteDesk Pro workspace. Let's make something incredible today.</p>
          </header>

          <section style={styles.grid}>
            <motion.div whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} style={styles.card}>
              <span style={styles.cardIcon}>📁</span>
              Recent Projects
            </motion.div>
            <motion.div whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} style={styles.card}>
              <span style={styles.cardIcon}>👥</span>
              Shared with Me
            </motion.div>
            <motion.div whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} style={styles.card}>
              <span style={styles.cardIcon}>🧩</span>
              Templates
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", sans-serif', backgroundColor: '#f8fafc' },
  navbar: { height: '75px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', zIndex: 100 },
  logoText: { fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
  
  // Center alignment logic
  centerGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' },
  searchWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIcon: { position: 'absolute', left: '12px', fontSize: '14px', color: '#94a3b8' },
  searchInput: { width: '350px', padding: '8px 12px 8px 35px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', fontSize: '14px', outline: 'none', transition: '0.2s', ':focus': { borderColor: '#3b82f6', backgroundColor: '#fff' } },
  navLinksContainer: { display: 'flex', gap: '20px' },
  navLink: { fontSize: '12px', fontWeight: '600', color: '#64748b', cursor: 'pointer', transition: '0.2s', textTransform: 'uppercase', letterSpacing: '0.5px' },

  logoutBtn: { backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },
  mainLayout: { display: 'flex', flex: 1, overflow: 'hidden' },
  sidebar: { backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' },
  sidebarHeader: { padding: '20px', display: 'flex', justifyContent: 'center' },
  collapseBtn: { background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' },
  menuList: { padding: '12px' },
  menuItem: { display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '12px', marginBottom: '8px', cursor: 'pointer', transition: '0.2s', color: '#475569' },
  menuIcon: { fontSize: '20px', minWidth: '24px' },
  menuText: { marginLeft: '16px', fontSize: '15px', fontWeight: '500', whiteSpace: 'nowrap' },
  content: { flex: 1, padding: '40px', overflowY: 'auto' },
  contentHeader: { marginBottom: '40px' },
  welcomeText: { fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: 0 },
  subText: { color: '#64748b', marginTop: '8px', fontSize: '16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' },
  card: { backgroundColor: '#ffffff', height: '220px', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: '600', transition: 'all 0.3s', cursor: 'pointer' },
  cardIcon: { fontSize: '40px', marginBottom: '15px', opacity: 0.8 }
};

export default Home;