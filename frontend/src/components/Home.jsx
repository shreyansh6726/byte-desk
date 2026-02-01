import React, { useState, useEffect } from 'react';

const Home = () => {
  const [greeting, setGreeting] = useState('');
  const user = JSON.parse(localStorage.getItem('user')) || "Creative Mind";

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 20 || hour < 5) setGreeting('Hello');
    else if (hour >= 5 && hour < 12) setGreeting('Good morning');
    else if (hour >= 12 && hour < 15) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="home-content">
      <header className="home-header" style={styles.contentHeader}>
        <h1 style={styles.welcomeText}>{greeting}, {user}</h1>
        <p style={styles.subText}>Welcome to your ByteDesk Pro workspace.</p>
      </header>

      <div className="home-grid" style={styles.grid}>
        <div style={styles.card}>Recent Projects</div>
        <div style={styles.card}>Shared with Me</div>
        <div style={styles.card}>Templates</div>
        <div style={styles.card}>Drafts</div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .home-grid { grid-template-columns: 1fr !important; gap: 15px !important; }
          .home-header { margin-bottom: 30px !important; }
          .home-header h1 { font-size: 30px !important; line-height: 1.2; }
          .home-header p { font-size: 16px !important; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  contentHeader: { marginBottom: '60px' },
  welcomeText: { fontSize: '42px', fontWeight: '800', color: '#0f172a', margin: 0 },
  subText: { color: '#64748b', fontSize: '20px', marginTop: '8px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' },
  card: { 
    backgroundColor: '#ffffff', height: '220px', borderRadius: '24px', border: '1px solid #e2e8f0', 
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#475569',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', transition: 'transform 0.2s'
  }
};

export default Home;