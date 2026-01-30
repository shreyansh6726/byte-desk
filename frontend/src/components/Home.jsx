import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [currentStatus, setCurrentStatus] = useState({ label: 'Online', color: '#10b981' });
  
  const [showTour, setShowTour] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user')) || "Guest";

  // Dynamic Theme Colors
  const theme = {
    bg: darkMode ? '#0f172a' : '#f8fafc',
    card: darkMode ? '#1e293b' : '#ffffff',
    text: darkMode ? '#f1f5f9' : '#1a1a1a',
    subText: darkMode ? '#94a3b8' : '#64748b',
    border: darkMode ? '#334155' : '#e2e8f0',
    sidebar: darkMode ? '#111827' : '#ffffff',
    hover: darkMode ? '#1e293b' : '#f1f5f9',
    notif: '#ef4444'
  };

  const notifications = [
    { id: 1, text: "Sarah mentioned you in Project Alpha", time: "2m ago", unread: true },
    { id: 2, text: "New comment on Whiteboard", time: "1h ago", unread: false },
    { id: 3, text: "Meeting starting in 5 minutes", time: "5m ago", unread: true },
  ];

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

  return (
    <div style={{ ...styles.container, backgroundColor: theme.bg, color: theme.text, transition: 'all 0.3s ease' }}>
      
      {/* --- TOP NAVBAR --- */}
      <nav style={{ ...styles.navbar, backgroundColor: theme.card, borderColor: theme.border }}>
        <div style={styles.logoSection}>
          <span style={{ ...styles.logoText, color: theme.text }}>ByteDesk</span>
        </div>
        
        <div style={styles.searchContainer}>
          <div style={{
            ...styles.searchWrapper, 
            backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
            borderColor: searchFocused ? theme.text : 'transparent'
          }}>
            <span style={styles.searchIcon}>🔍</span>
            <input 
              type="text" placeholder="Search anything..." 
              style={{ ...styles.searchInput, color: theme.text }}
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        <div style={styles.navLinksContainer}>
          {/* THEME TOGGLE */}
          <button onClick={() => setDarkMode(!darkMode)} style={{ ...styles.iconBtn, backgroundColor: theme.hover, color: theme.text }}>
            {darkMode ? '🌙' : '☀️'}
          </button>

          {/* NOTIFICATION BELL */}
          <div style={styles.notifWrapper}>
            <button 
              onClick={() => { setShowNotifMenu(!showNotifMenu); setShowStatusMenu(false); }} 
              style={{ ...styles.iconBtn, backgroundColor: theme.hover, color: theme.text }}
            >
              🔔
              <div style={styles.notifBadge} />
            </button>
            <AnimatePresence>
              {showNotifMenu && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} 
                  style={{ ...styles.dropdown, backgroundColor: theme.card, borderColor: theme.border }}>
                  <p style={styles.dropdownTitle}>Notifications</p>
                  {notifications.map(n => (
                    <div key={n.id} style={{ ...styles.notifItem, borderBottom: `1px solid ${theme.border}` }}>
                      <p style={{ ...styles.notifText, color: theme.text }}>{n.text}</p>
                      <span style={{ color: theme.subText, fontSize: '11px' }}>{n.time}</span>
                      {n.unread && <div style={styles.unreadDot} />}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* PROFILE */}
          <div style={styles.profileWrapper}>
            <div style={styles.avatar} onClick={() => { setShowStatusMenu(!showStatusMenu); setShowNotifMenu(false); }}>
              {user.charAt(0).toUpperCase()}
              <div style={{ ...styles.statusIndicator, backgroundColor: currentStatus.color }} />
            </div>
            <AnimatePresence>
              {showStatusMenu && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                  style={{ ...styles.dropdown, backgroundColor: theme.card, borderColor: theme.border }}>
                  <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <div style={styles.mainLayout}>
        <motion.aside animate={{ width: isCollapsed ? '80px' : '260px' }} style={{ ...styles.sidebar, backgroundColor: theme.sidebar, borderColor: theme.border }}>
          <div style={styles.sidebarHeader}>
            <button onClick={() => setIsCollapsed(!isCollapsed)} style={{ ...styles.collapseBtn, backgroundColor: theme.hover, color: theme.subText }}>
              {isCollapsed ? '→' : '←'}
            </button>
          </div>
          <div style={styles.menuList}>
            {menuItems.map((item) => (
              <div key={item.id} style={{ ...styles.menuItem, backgroundColor: hoveredItem === item.id ? theme.hover : 'transparent' }}
                onMouseEnter={() => setHoveredItem(item.id)} onMouseLeave={() => setHoveredItem(null)}>
                <span style={styles.menuIcon}>{item.icon}</span>
                {!isCollapsed && <span style={{ ...styles.menuText, color: theme.text }}>{item.name}</span>}
              </div>
            ))}
          </div>
        </motion.aside>

        <main style={styles.content}>
          <h1 style={{ ...styles.welcomeText, color: theme.text }}>Workspace Dashboard</h1>
          <div style={styles.grid}>
            <div style={{ ...styles.card, backgroundColor: theme.card, borderColor: theme.border }}>
              <h3 style={{ ...styles.cardTitle, color: theme.text }}>Active Tasks</h3>
              <p style={{ color: theme.subText }}>3 tasks pending completion</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  navbar: { height: '70px', borderBottom: '1px solid', display: 'flex', alignItems: 'center', padding: '0 24px', zIndex: 100 },
  logoSection: { flex: '0 0 200px' },
  logoText: { fontSize: '22px', fontWeight: '800' },
  searchContainer: { flex: 1, display: 'flex', justifyContent: 'center', padding: '0 40px' },
  searchWrapper: { width: '100%', maxWidth: '500px', display: 'flex', alignItems: 'center', padding: '8px 16px', borderRadius: '12px', border: '1px solid', transition: 'all 0.2s' },
  searchIcon: { marginRight: '10px' },
  searchInput: { width: '100%', background: 'none', border: 'none', outline: 'none' },
  navLinksContainer: { display: 'flex', alignItems: 'center', gap: '15px' },
  iconBtn: { position: 'relative', border: 'none', width: '40px', height: '40px', borderRadius: '12px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  notifBadge: { position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid #fff' },
  
  notifWrapper: { position: 'relative' },
  dropdown: { position: 'absolute', top: '55px', right: '0', width: '280px', borderRadius: '16px', border: '1px solid', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '16px', zIndex: 1000 },
  dropdownTitle: { fontSize: '14px', fontWeight: '700', marginBottom: '12px' },
  notifItem: { padding: '12px 0', position: 'relative' },
  notifText: { fontSize: '13px', margin: '0 0 4px 0', lineHeight: '1.4' },
  unreadDot: { position: 'absolute', right: '0', top: '15px', width: '6px', height: '6px', backgroundColor: '#3b82f6', borderRadius: '50%' },

  profileWrapper: { position: 'relative' },
  avatar: { width: '36px', height: '36px', backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', fontWeight: '700' },
  statusIndicator: { position: 'absolute', bottom: '0', right: '0', width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #fff' },
  logoutBtn: { width: '100%', background: 'none', border: 'none', color: '#ef4444', fontWeight: '600', cursor: 'pointer', textAlign: 'left' },

  mainLayout: { display: 'flex', flex: 1, overflow: 'hidden' },
  sidebar: { borderRight: '1px solid', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { padding: '20px', display: 'flex', justifyContent: 'center' },
  collapseBtn: { border: 'none', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer' },
  menuList: { padding: '0 10px' },
  menuItem: { display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '10px', marginBottom: '4px', cursor: 'pointer', transition: '0.2s' },
  menuIcon: { fontSize: '18px', width: '24px' },
  menuText: { marginLeft: '12px', fontSize: '14px', fontWeight: '500' },

  content: { flex: 1, padding: '40px', overflowY: 'auto' },
  welcomeText: { fontSize: '28px', fontWeight: '800', marginBottom: '30px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' },
  card: { padding: '24px', borderRadius: '20px', border: '1px solid' },
  cardTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '8px' }
};

export default Home;