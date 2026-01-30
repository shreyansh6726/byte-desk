import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({ username: '', user_id: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://byte-desk.onrender.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Account created! Please login.");
        navigate('/login');
      } else {
        const result = await response.json();
        setError(result.message);
      }
    } 
    
    catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input type="text" name="username" onChange={handleChange} required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>User ID</label>
            <input type="text" name="user_id" onChange={handleChange} required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" name="password" onChange={handleChange} required style={styles.input} />
          </div>
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.footerText}>
          Already have an account? <span onClick={() => navigate('/login')} style={styles.link}>Login</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  background: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', fontFamily: '"Inter", sans-serif' },
  card: { backgroundColor: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '360px', textAlign: 'center' },
  title: { margin: '0 0 32px 0', fontSize: '24px', fontWeight: '600', color: '#1a1a1a' },
  error: { color: '#dc3545', fontSize: '13px', marginBottom: '15px', backgroundColor: '#f8d7da', padding: '8px', borderRadius: '4px' },
  inputGroup: { marginBottom: '20px', textAlign: 'left' },
  label: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#888', marginBottom: '8px' },
  passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  input: { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#f9f9f9', outline: 'none' },
  toggleButton: { position: 'absolute', right: '12px', background: 'none', border: 'none', color: '#007bff', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
  button: { width: '100%', padding: '14px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' },
  footerText: { marginTop: '24px', fontSize: '13px', color: '#888' },
  link: { color: '#007bff', cursor: 'pointer', fontWeight: '500' }
};
export default SignupForm;