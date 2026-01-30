import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [darkMode, setDarkMode] = useState(true);
  
  const stats = [
    { label: 'Total Projects', value: '12' },
    { label: 'Active Sessions', value: '3' },
    { label: 'Storage Used', value: '1.2 GB' }
  ];

  const theme = {
    bg: darkMode ? '#0f172a' : '#f8fafc',
    text: darkMode ? '#f1f5f9' : '#1e293b',
    border: darkMode ? '#1e293b' : '#e2e8f0',
    card: darkMode ? '#1e293b' : '#ffffff',
    accent: '#3b82f6'
  };

  return (
    <div style={{ 
      ...styles.container, 
      backgroundColor: theme.bg, 
      color: theme.text,
      transition: 'background-color 0.3s ease'
    }}>
      {/* --- DASHBOARD HEADER --- */}
      <header style={{ ...styles.header, borderBottom: `1px solid ${theme.border}` }}>
        <div style={styles.brand}>
          <div style={styles.logo}>B</div>
          <h1 style={styles.title}>ByteDesk <span style={styles.badge}>PRO</span></h1>
        </div>

        <div style={styles.controls}>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            style={{ 
              ...styles.themeToggle, 
              backgroundColor: theme.card, 
              color: theme.text,
              border: `1px solid ${theme.border}`
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <div style={styles.avatar}>JD</div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main style={styles.main}>
        <div style={styles.welcomeSection}>
          <motion.h2 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            style={styles.heroTitle}
          >
            Welcome back, Designer
          </motion.h2>
          <p style={styles.heroSub}>Your workspace is synced and ready.</p>
        </div>

        {/* --- STATS GRID --- */}
        <div style={styles.statsGrid}>
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{ ...styles.statCard, backgroundColor: theme.card, border: `1px solid ${theme.border}` }}
            >
              <span style={styles.statLabel}>{stat.label}</span>
              <span style={styles.statValue}>{stat.value}</span>
            </motion.div>
          ))}
        </div>

        {/* --- RECENT ACTIVITY PLACEHOLDER --- */}
        <div style={{ ...styles.activityBox, backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Recent Activity</h3>
          <div style={{ opacity: 0.5, fontSize: '14px' }}>No recent boards found. Click "New Project" to start.</div>
        </div>

        <button style={styles.primaryBtn}>+ New Project</button>
      </main>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px' },
  brand: { display: 'flex', alignItems: 'center', gap: '12px' },
  logo: { width: '32px', height: '32px', backgroundColor: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' },
  title: { fontSize: '20px', fontWeight: '700', margin: 0, letterSpacing: '-0.5px' },
  badge: { fontSize: '10px', backgroundColor: '#3b82f6', color: '#fff', padding: '2px 6px', borderRadius: '4px', marginLeft: '4px' },
  controls: { display: 'flex', alignItems: 'center', gap: '16px' },
  themeToggle: { width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' },
  avatar: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' },
  main: { flex: 1, padding: '48px 32px', maxWidth: '1000px', margin: '0 auto', width: '100%' },
  welcomeSection: { marginBottom: '40px' },
  heroTitle: { fontSize: '36px', fontWeight: '800', margin: '0 0 8px 0' },
  heroSub: { fontSize: '18px', opacity: 0.6, margin: 0 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' },
  statCard: { padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '4px' },
  statLabel: { fontSize: '12px', opacity: 0.5, textTransform: 'uppercase', fontWeight: '600' },
  statValue: { fontSize: '24px', fontWeight: '700' },
  activityBox: { padding: '32px', borderRadius: '24px', textAlign: 'center', marginBottom: '32px' },
  primaryBtn: { padding: '16px 32px', borderRadius: '14px', border: 'none', backgroundColor: '#3b82f6', color: '#fff', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)' }
};

export default Home;