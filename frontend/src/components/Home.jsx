import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Track focus
  const navigate = useNavigate();
  
  const user = JSON.parse(sessionStorage.getItem('user')) || "Creative Mind";

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

  const navLinks = ["Home", "Options", "Tools", "About Us", "T&C", "Profile"];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div style={styles.container}>
      {/* --- TOP NAVBAR --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={styles.navbar}
      >
        <div style={styles.logoSection}>
          <img src="/logo.png" alt="Logo" style={styles.logoImage} />
          <span style={styles.logoText}>ByteDesk</span>
        </div>
        
        <div style={styles.centerGroup}>
          <div style={styles.searchContainer}>
            <svg style={styles.searchIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <motion.input 
              type="text" 
              placeholder="Search files, tools, or teams..." 
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
              // Dynamic width based on focus
              animate={{ 
                width: isSearchFocused ? '550px' : '400px',
                boxShadow: isSearchFocused ? '0 0 0 3px rgba(59, 130, 246, 0.2)' : '0 0 0 0px rgba(59, 130, 246, 0)'
              }}
              style={{
                ...styles.searchInput,
                borderColor: isSearchFocused ? '#3b82f6' : '#e2e8f0',
                backgroundColor: isSearchFocused ? '#ffffff' : '#f1f5f9'
              }}
            />
          </div>
          <div style={styles.navLinksContainer}>
            {navLinks.map((link) => (
              <motion.span 
                key={link} 
                whileHover={{ color: '#0f172a', scale: 1.05 }}
                style={styles.navLink}
              >
                {link}
              </motion.span>
            ))}
          </div>
        </div>

        <div style={styles.profileSection}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout} 
            style={styles.logoutBtn}
          >
            Logout
          </motion.button>
        </div>
      </motion.nav>

      <div style={styles.mainLayout}>
        {/* --- COLLAPSIBLE SIDEBAR --- */}
        <motion.aside 
          initial={{ x: -300 }}
          animate={{ x: 0, width: isCollapsed ? '80px' : '260px' }}
          style={styles.sidebar}
        >
          <div style={styles.sidebarHeader}>
            <motion.button 
              whileHover={{ backgroundColor: '#e2e8f0' }}
              onClick={() => setIsCollapsed(!isCollapsed)} 
              style={styles.collapseBtn}
            >
              {isCollapsed ? '→' : '←'}
            </motion.button>
          </div>

          <div style={styles.menuList}>
            {menuItems.map((item) => (
              <motion.div 
                key={item.name} 
                whileHover={{ backgroundColor: '#f1f5f9', x: 5 }}
                style={styles.menuItem}
              >
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
              </motion.div>
            ))}
          </div>
        </motion.aside>

        {/* --- MAIN CONTENT AREA --- */}
        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={styles.content}
        >
          <motion.header variants={itemVariants} style={styles.contentHeader}>
            <h1 style={styles.welcomeText}>
              {greeting}, {user}
            </h1>
            <p style={styles.subText}>Welcome to your ByteDesk Pro workspace. Let's make something incredible today.</p>
          </motion.header>

          <motion.section variants={containerVariants} style={styles.grid}>
            {['Recent Projects', 'Shared with Me', 'Templates'].map((title, idx) => (
              <motion.div 
                key={title}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                style={styles.card}
              >
                <span style={styles.cardIcon}>{['📁', '👥', '🧩'][idx]}</span>
                {title}
              </motion.div>
            ))}
          </motion.section>
        </motion.main>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", sans-serif', backgroundColor: '#f8fafc' },
  navbar: { height: '100px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', zIndex: 100, position: 'relative' },
  logoSection: { display: 'flex', alignItems: 'center', gap: '14px' },
  logoImage: { width: '32px', height: '32px', objectFit: 'contain' },
  logoText: { fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
  centerGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' },
  searchContainer: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIconSvg: { position: 'absolute', left: '16px', width: '18px', height: '18px', color: '#94a3b8', zIndex: 5 },
  searchInput: { 
    padding: '12px 20px 12px 48px', 
    borderRadius: '14px', 
    border: '1px solid #e2e8f0', 
    fontSize: '14px', 
    color: '#1e293b',
    outline: 'none', 
    transition: 'border-color 0.3s ease, background-color 0.3s ease',
  },
  navLinksContainer: { display: 'flex', gap: '28px' },
  navLink: { fontSize: '11px', fontWeight: '700', color: '#64748b', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1.2px' },
  logoutBtn: { backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
  mainLayout: { display: 'flex', flex: 1, overflow: 'hidden' },
  sidebar: { backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', position: 'relative' },
  sidebarHeader: { padding: '24px', display: 'flex', justifyContent: 'center' },
  collapseBtn: { background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '10px', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' },
  menuList: { padding: '0 16px' },
  menuItem: { display: 'flex', alignItems: 'center', padding: '14px 20px', borderRadius: '14px', marginBottom: '10px', cursor: 'pointer', color: '#475569' },
  menuIcon: { fontSize: '22px', minWidth: '28px' },
  menuText: { marginLeft: '16px', fontSize: '15px', fontWeight: '500', whiteSpace: 'nowrap' },
  content: { flex: 1, padding: '50px 60px', overflowY: 'auto' },
  contentHeader: { marginBottom: '50px' },
  welcomeText: { fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: 0 },
  subText: { color: '#64748b', marginTop: '12px', fontSize: '18px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' },
  card: { backgroundColor: '#ffffff', height: '240px', borderRadius: '28px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: '700', cursor: 'pointer' },
  cardIcon: { fontSize: '48px', marginBottom: '20px', opacity: 0.9 }
};

export default Home;