import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ user_id: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('https://byte-desk.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(result.username));
        navigate('/home'); 
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Server connection failed');
    }
  };

  return (
    <div style={styles.background}>
      <style>
        {`
          input::-ms-reveal, input::-ms-clear { display: none; }
          input::-webkit-contacts-auto-fill-button, 
          input::-webkit-credentials-auto-fill-button { display: none !important; }
        `}
      </style>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.inputGroup}>
            <label style={styles.label}>User ID</label>
            <input 
              type="text" 
              name="user_id" 
              value={formData.user_id} 
              onChange={handleChange} 
              required 
              style={styles.input} 
              placeholder="Enter your ID"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                style={styles.passwordInput} 
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                style={styles.toggleButton}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" style={styles.button}>Sign In</button>
        </form>
        <p style={styles.footerText}>
          Don't have an account? <span onClick={() => navigate('/signup')} style={styles.link}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  background: { 
    display: 'flex', justifyContent: 'center', alignItems: 'center', 
    height: '100vh', width: '100%', 
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
    fontFamily: '"Inter", sans-serif' 
  },
  card: { 
    backgroundColor: '#fff', 
    padding: '50px 40px', // Increased vertical padding
    borderRadius: '24px', // More rounded corners for a premium feel
    boxShadow: '0 20px 40px rgba(0,0,0,0.08)', 
    width: '95%', 
    maxWidth: '440px', // Increased from 360px
    textAlign: 'center' 
  },
  title: { 
    margin: '0 0 40px 0', 
    fontSize: '32px', // Larger title
    fontWeight: '700', 
    color: '#1a1a1a',
    letterSpacing: '-1px'
  },
  error: { 
    color: '#dc3545', 
    fontSize: '14px', 
    marginBottom: '20px', 
    backgroundColor: '#f8d7da', 
    padding: '12px', 
    borderRadius: '8px' 
  },
  inputGroup: { marginBottom: '25px', textAlign: 'left' },
  label: { 
    display: 'block', 
    fontSize: '13px', 
    fontWeight: '600', 
    color: '#666', 
    marginBottom: '10px',
    marginLeft: '4px'
  },
  passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  input: { 
    width: '100%', 
    padding: '16px 20px', // Larger touch area
    borderRadius: '12px', 
    border: '1px solid #e0e0e0', 
    fontSize: '16px', // Larger text for easier reading
    boxSizing: 'border-box', 
    backgroundColor: '#fcfcfc', 
    outline: 'none',
    transition: 'border-color 0.2s ease'
  },
  passwordInput: { 
    width: '100%', 
    padding: '16px 60px 16px 20px', 
    borderRadius: '12px', 
    border: '1px solid #e0e0e0', 
    fontSize: '16px', 
    boxSizing: 'border-box', 
    backgroundColor: '#fcfcfc', 
    outline: 'none' 
  },
  toggleButton: { 
    position: 'absolute', 
    right: '16px', 
    background: 'none', 
    border: 'none', 
    color: '#007bff', 
    fontSize: '13px', 
    fontWeight: '700', 
    cursor: 'pointer' 
  },
  button: { 
    width: '100%', 
    padding: '16px', 
    backgroundColor: '#1a1a1a', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '12px', 
    fontSize: '16px', 
    fontWeight: '600', 
    cursor: 'pointer', 
    marginTop: '15px',
    transition: 'transform 0.1s ease, background-color 0.2s ease'
  },
  footerText: { marginTop: '30px', fontSize: '14px', color: '#666' },
  link: { color: '#007bff', cursor: 'pointer', fontWeight: '600' }
};

export default LoginForm;