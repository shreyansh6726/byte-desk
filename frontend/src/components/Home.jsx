import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Ensuring the import path is exact
import Whiteboard from './Whiteboard.jsx'; 

const Home = () => {
  const [activeBoard, setActiveBoard] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  
  const stats = [
    { label: 'Collaborators', value: '12 Active' },
    { label: 'Storage', value: '85%' },
    { label: 'Uptime', value: '99.9%' }
  ];

  return (
    <div style={{ 
      ...styles.container, 
      backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
      color: darkMode ? '#f1f5f9' : '#1e293b'
    }}>
      <header style={{ ...styles.header, borderBottom: `1px solid ${darkMode ? '#1e293b' : '#e2e8f0'}` }}>
        <div style={styles.brand}>
          <div style={styles.logo}>B</div>
          <h1 style={styles.title}>ByteDesk <span style={styles.badge}>PRO</span></h1>
        </div>

        <div style={styles.controls}>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            style={{ ...styles.themeToggle, backgroundColor: darkMode ? '#1e293b' : '#fff' }}
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
          <button style={styles.avatar}>JD</button>
        </div>
      </header>

      <main style={styles.main}>
        {activeBoard ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            style={styles.boardWrapper}
          >
            <Whiteboard darkMode={darkMode} />
            <button onClick={() => setActiveBoard(false)} style={styles.closeBoard}>Close Board</button>
          </motion.div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.heroSection}>
              <h2 style={styles.heroTitle}>Welcome back, Designer</h2>
              <p style={styles.heroSub}>Your collaborative canvas is ready for the next big idea.</p>
              <button onClick={() => setActiveBoard(true)} style={styles.primaryBtn}>Create New Board</button>
            </div>

            <div style={styles.statsGrid}>
              {stats.map((stat, i) => (
                <div key={i} style={{ ...styles.statCard, backgroundColor: darkMode ? '#1e293b' : '#fff' }}>
                  <span style={styles.statLabel}>{stat.label}</span>
                  <span style={styles.statValue}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', zIndex: 10 },
  brand: { display: 'flex', alignItems: 'center', gap: '12px' },
  logo: { width: '32px', height: '32px', backgroundColor: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' },
  title: { fontSize: '18px', fontWeight: '700', margin: 0 },
  badge: { fontSize: '10px', backgroundColor: '#3b82f6', color: '#fff', padding: '2px 6px', borderRadius: '4px', verticalAlign: 'middle', marginLeft: '8px' },
  controls: { display: 'flex', alignItems: 'center', gap: '15px' },
  themeToggle: { border: '1px solid #334155', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  avatar: { width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#6366f1', color: '#fff', border: 'none', fontWeight: '600', cursor: 'pointer' },
  main: { flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' },
  boardWrapper: { flex: 1, position: 'relative' },
  closeBoard: { position: 'absolute', top: '20px', left: '20px', zIndex: 100, padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#ef4444', color: '#fff', fontWeight: '600', cursor: 'pointer' },
  emptyState: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' },
  heroSection: { textAlign: 'center', marginBottom: '40px' },
  heroTitle: { fontSize: '48px', fontWeight: '800', marginBottom: '16px' },
  heroSub: { fontSize: '18px', opacity: 0.7, marginBottom: '32px' },
  primaryBtn: { padding: '14px 32px', borderRadius: '12px', border: 'none', backgroundColor: '#3b82f6', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer' },
  statsGrid: { display: 'flex', gap: '20px' },
  statCard: { padding: '20px 40px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  statLabel: { fontSize: '12px', opacity: 0.6, marginBottom: '4px', textTransform: 'uppercase' },
  statValue: { fontSize: '20px', fontWeight: '700' }
};

export default Home;