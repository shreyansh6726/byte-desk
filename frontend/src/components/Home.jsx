import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [greeting, setGreeting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  
  const user = JSON.parse(sessionStorage.getItem('user')) || "User";

  // Handle Window Resize
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
    { name: 'Team Chat', icon: '💬' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const navLinks = ["Home", "Options", "Tools"]; // Shortened for mobile clarity

  return (
    <div style={styles.container}>
      {/* --- TOP NAVBAR --- */}
      <nav style={styles.navbar}>
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
                width: isMobile ? (isSearchFocused ? '160px' : '120px') : (isSearchFocused ? '400px' : '300px') 
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
          <button onClick={handleLogout} style={styles.logoutBtn}>{isMobile ? 'Logout' : 'Sign Out'}</button>
        </div>
      </nav>

      <div style={styles.mainLayout}>
        {/* --- SIDEBAR --- */}
        <motion.aside 
          initial={false}
          animate={{ 
            width: isCollapsed ? (isMobile ? '0px' : '80px') : '260px',
            opacity: isMobile && isCollapsed ? 0 : 1
          }}
          style={styles.sidebar}
        >
          <div style={styles.sidebarHeader}>
            <button onClick={() => setIsCollapsed(!isCollapsed)} style={styles.collapseBtn}>
              {isCollapsed ? '→' : '←'}
            </button>
          </div>

          <div style={styles.menuList}>
            {menuItems.map((item) => (
              <div key={item.name} style={styles.menuItem}>
                <span style={styles.menuIcon}>{item.icon}</span>
                {!isCollapsed && <span style={styles.menuText}>{item.name}</span>}
              </div>
            ))}
          </div>
        </motion.aside>

        {/* --- CONTENT --- */}
        <main style={{ ...styles.content, padding: isMobile ? '20px' : '50px' }}>
          <header style={styles.contentHeader}>
            <h1 style={{ ...styles.welcomeText, fontSize: isMobile ? '24px' : '36px' }}>
              {greeting}, {user}
            </h1>
            <p style={styles.subText}>Ready to build today?</p>
          </header>

          <section style={styles.grid}>
            {['Recent Projects', 'Shared', 'Templates'].map((title, idx) => (
              <motion.div 
                key={title}
                whileHover={{ y: -5 }}
                style={{ ...styles.card, height: isMobile ? '160px' : '220px' }}
              >
                <span style={styles.cardIcon}>{['📁', '👥', '🧩'][idx]}</span>
                {title}
              </motion.div>
            ))}
          </section>
        </main>
      </div>

      {/* MOBILE FLOATING MENU TOGGLE */}
      {isMobile && isCollapsed && (
        <button 
          onClick={() => setIsCollapsed(false)} 
          style={styles.floatingToggle}
        >
          ☰
        </button>
      )}
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", sans-serif', backgroundColor: '#f8fafc', overflow: 'hidden' },
  navbar: { height: '80px', minHeight: '80px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 100 },
  
  logoSection: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoImage: { width: '28px', height: '28px' },
  logoText: { fontSize: '18px', fontWeight: '800', color: '#0f172a' },
  
  centerGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' },
  searchContainer: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIconSvg: { position: 'absolute', left: '12px', width: '14px', height: '14px', color: '#94a3b8' },
  searchInput: { padding: '8px 12px 8px 36px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', fontSize: '14px', outline: 'none' },
  
  navLinksContainer: { display: 'flex', gap: '15px' },
  navLink: { fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' },

  logoutBtn: { backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  
  mainLayout: { display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' },
  sidebar: { backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 90 },
  sidebarHeader: { padding: '20px', display: 'flex', justifyContent: 'center' },
  collapseBtn: { background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer' },
  
  menuList: { padding: '0 10px' },
  menuItem: { display: 'flex', alignItems: 'center', padding: '12px 15px', borderRadius: '10px', marginBottom: '5px', cursor: 'pointer', color: '#475569' },
  menuIcon: { fontSize: '20px', minWidth: '25px' },
  menuText: { marginLeft: '12px', fontSize: '14px', whiteSpace: 'nowrap' },

  content: { flex: 1, overflowY: 'auto' },
  contentHeader: { marginBottom: '30px' },
  welcomeText: { fontWeight: '800', color: '#0f172a', margin: 0 },
  subText: { color: '#64748b', fontSize: '14px' },
  
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: '700' },
  cardIcon: { fontSize: '32px', marginBottom: '10px' },

  floatingToggle: { position: 'absolute', bottom: '20px', left: '20px', width: '50px', height: '50px', borderRadius: '25px', backgroundColor: '#0f172a', color: '#fff', fontSize: '20px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 110 }
};

export default Home;