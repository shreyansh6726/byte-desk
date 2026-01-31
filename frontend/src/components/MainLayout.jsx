import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MainLayout = ({ children, activeTab, setActiveTab, onLogoutTrigger }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Persistent user display from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || "Creative Mind";

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 20 || hour < 5) setGreeting('Hello');
    else if (hour >= 5 && hour < 12) setGreeting('Good morning');
    else if (hour >= 12 && hour < 15) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleLogoutClick = () => {
    onLogoutTrigger();
  };

  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Documents', icon: '📄' },
    { name: 'Whiteboard', icon: '🎨' },
    { name: 'Team Chat', icon: '💬' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const navLinks = ["Home", "Options", "Tools", "About Us", "T&C", "Profile"];

  const handleNavClick = (link) => {
    if (link === "Home") setActiveTab('Dashboard');
    else if (link === "T&C") setActiveTab('T&C');
    else setActiveTab(link);
  };

  return (
    <div style={styles.container}>
      <motion.nav initial={{ y: -140 }} animate={{ y: 0 }} style={styles.navbar}>
        <div style={styles.logoSection}>
          <img src="/logo.png" alt="Logo" style={styles.logoImage} />
          <span style={styles.logoText}>ByteDesk</span>
        </div>
        
        <div style={styles.centerGroup}>
          <div 
            style={styles.searchContainer} 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          >
            <svg style={styles.searchIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <motion.input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
              animate={{ width: (isSearchFocused || isHovered) ? '600px' : '450px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.navLinksContainer}>
            {navLinks.map((link) => (
              <motion.span 
                key={link} 
                whileHover={{ color: '#0f172a', y: -2 }} 
                style={{
                  ...styles.navLink, 
                  color: activeTab === (link === 'Home' ? 'Dashboard' : link) ? '#0f172a' : '#64748b',
                  borderBottom: activeTab === (link === 'Home' ? 'Dashboard' : link) ? '2px solid #0f172a' : 'none'
                }} 
                onClick={() => handleNavClick(link)}
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
            onClick={handleLogoutClick} 
            style={styles.logoutBtn}
          >
            Logout
          </motion.button>
        </div>
      </motion.nav>

      <div style={styles.mainLayout}>
        <motion.aside animate={{ width: isCollapsed ? '90px' : '280px' }} style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <button onClick={() => setIsCollapsed(!isCollapsed)} style={styles.collapseBtn}>
              {isCollapsed ? '→' : '←'}
            </button>
          </div>
          <div style={styles.menuList}>
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                onClick={() => setActiveTab(item.name)} 
                style={{
                  ...styles.menuItem, 
                  backgroundColor: activeTab === item.name ? '#f1f5f9' : 'transparent',
                }}
              >
                <span style={styles.menuIcon}>{item.icon}</span>
                {!isCollapsed && <span style={styles.menuText}>{item.name}</span>}
              </div>
            ))}
          </div>
        </motion.aside>

        <main style={styles.content}>
            {activeTab === 'Dashboard' && (
                <header style={styles.contentHeader}>
                    <h1 style={styles.welcomeText}>{greeting}, {user}</h1>
                    <p style={styles.subText}>Welcome to your ByteDesk Pro workspace.</p>
                </header>
            )}
            <div style={{ height: activeTab === 'Whiteboard' ? '100%' : 'auto' }}>
              {children}
            </div>
        </main>
      </div>
    </div>
  );
};

// Styles remain the same...
const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", sans-serif', backgroundColor: '#f8fafc', overflow: 'hidden' },
  navbar: { height: '140px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px', zIndex: 100, position: 'relative' },
  logoSection: { display: 'flex', alignItems: 'center', gap: '20px' },
  logoImage: { width: '60px', height: '60px', objectFit: 'contain' },
  logoText: { fontSize: '30px', fontWeight: '800', color: '#0f172a' },
  centerGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' },
  searchContainer: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIconSvg: { position: 'absolute', left: '18px', width: '20px', height: '20px', color: '#94a3b8' },
  searchInput: { padding: '14px 24px 14px 52px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none', backgroundColor: '#fcfcfc' },
  navLinksContainer: { display: 'flex', gap: '32px' },
  navLink: { fontSize: '12px', fontWeight: '700', color: '#64748b', cursor: 'pointer', textTransform: 'uppercase', paddingBottom: '4px' },
  logoutBtn: { backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '14px', cursor: 'pointer', fontWeight: '600' },
  mainLayout: { display: 'flex', flex: 1, overflow: 'hidden' },
  sidebar: { backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { padding: '30px 24px', display: 'flex', justifyContent: 'center' },
  collapseBtn: { background: '#f1f5f9', border: 'none', borderRadius: '12px', width: '42px', height: '42px', cursor: 'pointer' },
  menuList: { padding: '0 20px' },
  menuItem: { display: 'flex', alignItems: 'center', padding: '16px 22px', borderRadius: '16px', marginBottom: '12px', cursor: 'pointer', transition: 'background-color 0.2s' },
  menuIcon: { fontSize: '24px', minWidth: '32px' },
  menuText: { marginLeft: '18px', fontSize: '16px', color: '#0f172a', fontWeight: '500' },
  content: { flex: 1, padding: '60px 80px', overflowY: 'auto', position: 'relative' },
  contentHeader: { marginBottom: '60px' },
  welcomeText: { fontSize: '42px', fontWeight: '800', color: '#0f172a' },
  subText: { color: '#64748b', fontSize: '20px' },
};

export default MainLayout;