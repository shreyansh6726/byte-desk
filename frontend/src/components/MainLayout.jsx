import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = ({ children, activeTab, setActiveTab, onLogoutTrigger }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mobile specific state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false); // Close mobile menu on click
  };

  return (
    <div style={styles.container}>
      {/* MOBILE ONLY HEADER */}
      <div className="mobile-only-header" style={styles.mobileHeader}>
        <div style={styles.logoSectionMobile}>
          <img src="/logo.png" alt="Logo" style={{width: '35px', height: '35px'}} />
          <span style={{fontSize: '20px', fontWeight: '800', color: '#0f172a'}}>ByteDesk</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={styles.threeDotBtn}>⋮</button>
        
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              style={styles.mobileDialogue}
            >
              {navLinks.map((link) => (
                <div key={link} onClick={() => handleNavClick(link)} style={styles.mobileNavListItem}>
                  {link}
                </div>
              ))}
              <div onClick={onLogoutTrigger} style={{...styles.mobileNavListItem, color: '#ef4444', borderBottom: 'none'}}>
                Logout
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DESKTOP NAVBAR - UNCHANGED LOGIC/STYLING */}
      <motion.nav 
        className="desktop-only-nav"
        initial={{ y: -140 }} 
        animate={{ y: 0 }} 
        style={styles.navbar}
      >
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
            onClick={onLogoutTrigger} 
            style={styles.logoutBtn}
          >
            Logout
          </motion.button>
        </div>
      </motion.nav>

      <div style={styles.mainLayout}>
        {/* DESKTOP SIDEBAR - UNCHANGED */}
        <motion.aside 
          className="desktop-only-sidebar"
          animate={{ width: isCollapsed ? '90px' : '280px' }} 
          style={styles.sidebar}
        >
          <div style={styles.sidebarHeader}>
            <button onClick={() => setIsCollapsed(!isCollapsed)} style={styles.collapseBtn}>
              {isCollapsed ? '→' : '←'}
            </button>
          </div>
          <div style={styles.menuList}>
            {menuItems.map((item) => (
              <motion.div 
                key={item.name} 
                onClick={() => setActiveTab(item.name)} 
                whileHover={{ 
                  x: 5, 
                  backgroundColor: activeTab === item.name ? '#f1f5f9' : '#f8fafc',
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  ...styles.menuItem, 
                  backgroundColor: activeTab === item.name ? '#f1f5f9' : 'transparent',
                }}
              >
                <motion.span style={styles.menuIcon} whileHover={{ scale: 1.2 }}>{item.icon}</motion.span>
                {!isCollapsed && <span style={styles.menuText}>{item.name}</span>}
              </motion.div>
            ))}
          </div>
        </motion.aside>

        <main className="main-content-scroll" style={styles.content}>
            <div style={{ height: activeTab === 'Whiteboard' ? '100%' : 'auto' }}>
              {children}
            </div>
        </main>
      </div>

      {/* MOBILE ONLY BOTTOM MENU */}
      <div className="mobile-only-bottom-nav" style={styles.mobileBottomNav}>
        {menuItems.map((item) => (
          <div 
            key={item.name} 
            onClick={() => setActiveTab(item.name)} 
            style={{
              ...styles.mobileBottomItem,
              color: activeTab === item.name ? '#0f172a' : '#94a3b8'
            }}
          >
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', fontWeight: '700' }}>{item.name}</span>
            {activeTab === item.name && <motion.div layoutId="bubble" style={styles.activeIndicator} />}
          </div>
        ))}
      </div>

      {/* CSS GUARDRAILS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-only-nav, .desktop-only-sidebar { display: none !important; }
          .main-content-scroll { padding: 30px 20px 100px 20px !important; }
        }
        @media (min-width: 769px) {
          .mobile-only-header, .mobile-only-bottom-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", sans-serif', backgroundColor: '#f8fafc', overflow: 'hidden' },
  // Desktop Styles (Original)
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
  menuItem: { display: 'flex', alignItems: 'center', padding: '16px 22px', borderRadius: '16px', marginBottom: '12px', cursor: 'pointer' },
  menuIcon: { fontSize: '24px', minWidth: '32px' },
  menuText: { marginLeft: '18px', fontSize: '16px', color: '#0f172a', fontWeight: '500' },
  content: { flex: 1, padding: '60px 80px', overflowY: 'auto', position: 'relative' },

  // Mobile Styles
  mobileHeader: { height: '70px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', position: 'relative', zIndex: 1001 },
  logoSectionMobile: { display: 'flex', alignItems: 'center', gap: '10px' },
  threeDotBtn: { background: 'none', border: 'none', fontSize: '30px', color: '#0f172a', cursor: 'pointer' },
  mobileDialogue: { position: 'absolute', top: '75px', right: '15px', backgroundColor: '#fff', borderRadius: '18px', boxShadow: '0 15px 35px rgba(0,0,0,0.15)', width: '220px', padding: '10px', border: '1px solid #e2e8f0', zIndex: 2000 },
  mobileNavListItem: { padding: '15px', borderBottom: '1px solid #f1f5f9', fontWeight: '600', fontSize: '15px', color: '#475569' },
  mobileBottomNav: { height: '80px', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'fixed', bottom: 0, width: '100%', zIndex: 1001, paddingBottom: 'env(safe-area-inset-bottom)' },
  mobileBottomItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', position: 'relative' },
  activeIndicator: { position: 'absolute', top: '-10px', width: '30px', height: '3px', backgroundColor: '#0f172a', borderRadius: '10px' }
};

export default MainLayout;