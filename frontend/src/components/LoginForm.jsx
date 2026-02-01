import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LoginForm = ({ setUser }) => {
  const [formData, setFormData] = useState({ user_id: '', password: '' });
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsPending(true);

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
        
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(loggedUser));
        } else {
          sessionStorage.setItem('user', JSON.stringify(loggedUser));
        }
        
        sessionStorage.setItem('session_active', 'true');
        
        setUserName(loggedUser);
        setIsPending(false);
        setIsSuccess(true);

        setTimeout(() => {
          setUser(loggedUser);
          navigate('/');
        }, 2200);
      } else {
        setIsPending(false);
        setError(result.message || "Invalid User ID or Password");
      }
    } catch (err) {
      setIsPending(false);
      setError("Connection failed. Please try again later.");
    }
  };

  return (
    <div style={styles.background}>
      <style>{`
        input::-ms-reveal, input::-ms-clear { display: none !important; }
        input::-webkit-contacts-auto-fill-button,
        input::-webkit-credentials-auto-fill-button { display: none !important; visibility: hidden; pointer-events: none; }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <AnimatePresence>
        {/* Aesthetic Minimalist Loader with Progress Bar */}
        {isPending && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={styles.overlay}
          >
            <div style={styles.loaderContainer}>
              <div style={styles.spinner}></div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={styles.loaderTextContent}
              >
                <h3 style={styles.loaderTitle}>Connecting to Server</h3>
                <p style={styles.loaderSub}>Waking up your workspace...</p>
                
                {/* Visual Progress Bar */}
                <div style={styles.progressBarBg}>
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "90%" }}
                    transition={{ duration: 8, ease: "easeOut" }} // Slow crawl to 90%
                    style={styles.progressBarFill}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Professional Success Transition */}
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={styles.overlay}
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
              <p style={styles.successText}>Authentication verified. Welcome back.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={styles.error}>{error}</p>}
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>User ID</label>
            <input 
              type="text" 
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

          <div style={styles.actionRow}>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
              />
              Keep me logged in
            </label>
            <span onClick={() => navigate('/forgot-password')} style={styles.forgotLink}>
              Forgot Password?
            </span>
          </div>

          <button type="submit" disabled={isPending} style={{...styles.button, opacity: isPending ? 0.7 : 1}}>
            {isPending ? "Verifying..." : "Sign In"}
          </button>
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
  overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  
  loaderContainer: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '300px' },
  spinner: { width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #1a1a1a', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '24px' },
  loaderTitle: { fontSize: '20px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 8px 0' },
  loaderSub: { fontSize: '14px', color: '#666', margin: '0 0 20px 0' },

  // Progress Bar Styles
  progressBarBg: { width: '100%', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#1a1a1a', borderRadius: '10px' },

  successCard: { textAlign: 'center' },
  checkmarkCircle: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#28a745', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px', boxShadow: '0 10px 25px rgba(40,167,69,0.3)' },
  checkmark: { color: 'white', fontSize: '40px', fontWeight: 'bold' },
  successTitle: { fontSize: '28px', color: '#1a1a1a', fontWeight: '700' },
  successText: { fontSize: '16px', color: '#666' },

  card: { backgroundColor: '#fff', padding: '50px 40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', width: '95%', maxWidth: '440px', textAlign: 'center' },
  title: { margin: '0 0 40px 0', fontSize: '32px', fontWeight: '700', color: '#1a1a1a' },
  error: { color: '#dc3545', fontSize: '14px', marginBottom: '20px', backgroundColor: '#f8d7da', padding: '12px', borderRadius: '8px' },
  inputGroup: { marginBottom: '20px', textAlign: 'left' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '10px' },
  passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  input: { width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', fontSize: '16px', boxSizing: 'border-box', outline: 'none' },
  passwordInput: { width: '100%', padding: '16px 60px 16px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', fontSize: '16px', boxSizing: 'border-box', outline: 'none' },
  toggleButton: { position: 'absolute', right: '16px', background: 'none', border: 'none', color: '#007bff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' },
  actionRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  checkboxLabel: { display: 'flex', alignItems: 'center', fontSize: '14px', color: '#666', cursor: 'pointer', gap: '8px' },
  checkbox: { width: '18px', height: '18px', cursor: 'pointer', accentColor: '#1a1a1a' },
  forgotLink: { fontSize: '14px', color: '#007bff', fontWeight: '600', cursor: 'pointer' },
  button: { width: '100%', padding: '16px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '5px', transition: 'all 0.2s' },
  footerText: { marginTop: '30px', fontSize: '14px', color: '#666' },
  link: { color: '#007bff', cursor: 'pointer', fontWeight: '600' }
};

export default LoginForm;