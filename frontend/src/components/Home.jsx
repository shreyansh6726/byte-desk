import React from 'react';

const Home = () => {
  return (
    <div style={styles.grid}>
      <div style={styles.card}>Recent Projects</div>
      <div style={styles.card}>Shared with Me</div>
      <div style={styles.card}>Templates</div>
      <div style={styles.card}>Drafts</div>
    </div>
  );
};

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' },
  card: { 
    backgroundColor: '#ffffff', height: '220px', borderRadius: '24px', border: '1px solid #e2e8f0', 
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#475569',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', transition: 'transform 0.2s'
  }
};

export default Home;