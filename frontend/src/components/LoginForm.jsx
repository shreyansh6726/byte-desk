import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LoginForm = ({ setUser }) => {
  const [formData, setFormData] = useState({ user_id: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const API_BASE_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : 'https://byte-desk.onrender.com';

      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        const loggedUser = result.username || formData.user_id;
        
        // 1. Persist User
        localStorage.setItem('user', JSON.stringify(loggedUser));
        
        // 2. Mark session as active so App.jsx doesn't repeat the animation
        sessionStorage.setItem('session_active', 'true');
        
        setUserName(loggedUser);
        setIsSuccess(true);

        // 3. Navigate away after the Green Tick finishes
        setTimeout(() => {
          setUser(loggedUser); // Update App state
          navigate('/');       // Move to Dashboard
        }, 2200);
      } else {
        setError(result.message || "Invalid User ID or Password");
      }
    } catch (err) {
      setError("Connection failed. Please try again later.");
    }
  };

  return (
    <div style={styles.background}>
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={styles.successOverlay}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: [1, 1.05, 1], opacity: 1 }} 
              transition={{ duration: 0.5 }}
              style={styles.successCard}
            >
              <div style={styles.checkmarkCircle}>
                <span style={styles.checkmark}>✓</span>
              </div>
              <h2 style={styles.successTitle}>Logging in, {userName}!</h2>
              <p style={styles.successText}>Authenticating... Preparing your desk.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Card UI */}
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.inputGroup}>
            <label style={styles.label}>User ID</label>
            <input 
              type="text" 
              name="user_id" 
              placeholder="Enter your ID" 
              value={formData.user_id}
              onChange={(e) => setFormData({...formData, user_id: e.target.value})} 
              required style={styles.input} 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required style={styles.passwordInput} 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.toggleButton}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" style={styles.button}>Sign In</button>
        </form>
        <p style={styles.footerText}>
          Don't have an account? <span onClick={() => navigate('/signup')} style={styles.link}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  background: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', fontFamily: '"Inter", sans-serif', position: 'relative', overflow: 'hidden' },
  successOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  successCard: { textAlign: 'center' },
  checkmarkCircle: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#28a745', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px', boxShadow: '0 10px 25px rgba(40,167,69,0.3)' },
  checkmark: { color: 'white', fontSize: '40px', fontWeight: 'bold' },
  successTitle: { fontSize: '28px', color: '#1a1a1a', fontWeight: '700' },
  successText: { fontSize: '16px', color: '#666' },
  card: { backgroundColor: '#fff', padding: '50px 40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', width: '95%', maxWidth: '440px', textAlign: 'center' },
  title: { margin: '0 0 40px 0', fontSize: '32px', fontWeight: '700', color: '#1a1a1a' },
  error: { color: '#dc3545', fontSize: '14px', marginBottom: '20px', backgroundColor: '#f8d7da', padding: '12px', borderRadius: '8px' },
  inputGroup: { marginBottom: '25px', textAlign: 'left' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '10px' },
  passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  input: { width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', fontSize: '16px', boxSizing: 'border-box', outline: 'none' },
  passwordInput: { width: '100%', padding: '16px 60px 16px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', fontSize: '16px', boxSizing: 'border-box', outline: 'none' },
  toggleButton: { position: 'absolute', right: '16px', background: 'none', border: 'none', color: '#007bff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' },
  button: { width: '100%', padding: '16px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '15px' },
  footerText: { marginTop: '30px', fontSize: '14px', color: '#666' },
  link: { color: '#007bff', cursor: 'pointer', fontWeight: '600' }
};

export default LoginForm;