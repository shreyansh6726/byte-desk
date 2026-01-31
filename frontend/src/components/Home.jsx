import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [greeting, setGreeting] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  
  const user = JSON.parse(sessionStorage.getItem('user')) || "Creative Mind";

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsCollapsed(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 20 || hour < 5) setGreeting('Hello');
    else if (hour >= 5 && hour < 12) setGreeting('Good morning');
    else if (hour >= 12 && hour < 15) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Documents', icon: '📄' },
    { name: 'Whiteboard', icon: '🎨' },
    { name: 'Chat', icon: '💬' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const navLinks = ["Home", "Options", "Tools"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div style={styles.container}>
      {/* --- TOP NAVBAR --- */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} style={styles.navbar}>
        <div style={styles.logoSection}>
          <img src="/logo.png" alt="L" style={styles.logoImage} />
          {!isMobile && <span style={styles.logoText}>ByteDesk</span>}
        </div>
        
        <div style={styles.centerGroup}>
          <div style={styles.searchContainer}>
            <svg style={styles.searchIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <motion.input 
              type="text" 
              placeholder={isMobile ? "Search..." : "Search files, tools..."}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              animate={{ 
                width: isMobile ? (isSearchFocused ? '140px' : '100px') : (isSearchFocused ? '400px' : '300px') 
              }}
              style={styles.searchInput}
            />
          </div>
          {!isMobile && (
            <div style={styles.navLinksContainer}>
              {navLinks.map((link) => (
                <span key={link} style={styles.navLink}>{link}</span>
              ))}
            </div>
          )}
        </div>

        <div style={styles.profileSection}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleLogout} style={styles.logoutBtn}>
            {isMobile ? 'Exit' : 'Logout'}
          </motion.button>
        </div>
      </motion.nav>

      <div style={styles.mainLayout}>
        {/* --- DESKTOP SIDEBAR --- */}
        {!isMobile && (
          <motion.aside animate={{ width: isCollapsed ? '80px' : '260px' }} style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <button onClick={() => setIsCollapsed(!isCollapsed)} style={styles.collapseBtn}>
                {isCollapsed ? '→' : '←'}
              </button>
            </div>
            <div style={styles.menuList}>
              {menuItems.map((item) => (
                <motion.div key={item.name} whileHover={{ x: 5, backgroundColor: '#f1f5f9' }} style={styles.menuItem}>
                  <span style={styles.menuIcon}>{item.icon}</span>
                  {!isCollapsed && <span style={styles.menuText}>{item.name}</span>}
                </motion.div>
              ))}
            </div>
          </motion.aside>
        )}

        {/* --- MAIN CONTENT --- */}
        <motion.main 
          variants={containerVariants} initial="hidden" animate="visible"
          style={{ ...styles.content, padding: isMobile ? '20px' : '40px 60px', paddingBottom: isMobile ? '100px' : '40px' }}
        >
          <motion.header variants={itemVariants} style={styles.contentHeader}>
            <h1 style={{ ...styles.welcomeText, fontSize: isMobile ? '24px' : '36px' }}>{greeting}, {user}</h1>
            <p style={styles.subText}>Let's make something incredible today.</p>
          </motion.header>

          <motion.section variants={containerVariants} style={styles.grid}>
            {['Recent Projects', 'Shared with Me', 'Templates'].map((title, idx) => (
              <motion.div 
                key={title} variants={itemVariants} whileHover={{ y: -5 }}
                style={{ ...styles.card, height: isMobile ? '160px' : '220px' }}
              >
                <span style={styles.cardIcon}>{['📁', '👥', '🧩'][idx]}</span>
                {title}
              </motion.div>
            ))}
          </motion.section>
        </motion.main>
      </div>

      {/* --- MOBILE UI ELEMENTS --- */}
      {isMobile && (
        <>
          <motion.button whileTap={{ scale: 0.8 }} style={styles.fab}>+</motion.button>
          <nav style={styles.bottomNav}>
            {menuItems.map((item) => (
              <div key={item.name} style={styles.bottomNavItem}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ fontSize: '10px', marginTop: '4px' }}>{item.name}</span>
              </div>
            ))}
          </nav>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", sans-serif', backgroundColor: '#f8fafc', overflow: 'hidden' },
  navbar: { height: '80px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 100, position: 'relative' },
  logoSection: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoImage: { width: '28px', height: '28px' },
  logoText: { fontSize: '20px', fontWeight: '800', color: '#0f172a' },
  centerGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' },
  searchContainer: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIconSvg: { position: 'absolute', left: '12px', width: '14px', height: '14px', color: '#94a3b8', zIndex: 5 },
  searchInput: { padding: '8px 12px 8px 36px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', fontSize: '14px', outline: 'none' },
  navLinksContainer: { display: 'flex', gap: '15px' },
  navLink: { fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' },
  logoutBtn: { backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' },
  mainLayout: { display: 'flex', flex: 1, overflow: 'hidden' },
  sidebar: { backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { padding: '20px', display: 'flex', justifyContent: 'center' },
  collapseBtn: { background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer' },
  menuList: { padding: '0 12px' },
  menuItem: { display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '12px', marginBottom: '5px', cursor: 'pointer', color: '#475569' },
  menuIcon: { fontSize: '20px', minWidth: '24px' },
  menuText: { marginLeft: '12px', fontSize: '14px', fontWeight: '500' },
  content: { flex: 1, overflowY: 'auto' },
  contentHeader: { marginBottom: '30px' },
  welcomeText: { fontWeight: '800', color: '#0f172a', margin: 0 },
  subText: { color: '#64748b', marginTop: '8px', fontSize: '16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: '700' },
  cardIcon: { fontSize: '40px', marginBottom: '16px' },
  bottomNav: { position: 'fixed', bottom: 0, left: 0, right: 0, height: '70px', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000 },
  bottomNavItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#64748b' },
  fab: { position: 'fixed', bottom: '85px', right: '20px', width: '56px', height: '56px', borderRadius: '28px', backgroundColor: '#0f172a', color: '#fff', fontSize: '24px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 1001 }
};

export default Home;