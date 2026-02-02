import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti'; 

const SignupForm = () => {
  const [formData, setFormData] = useState({ 
    username: '', user_id: '', password: '', confirmPassword: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const getStrength = (password) => {
    if (!password) return 0;
    let points = 0;
    if (password.length >= 8) points++;
    if (password.length >= 12) points++; 
    if (/[A-Z]/.test(password)) points++;
    if (/[0-9]/.test(password)) points++;
    if (/[^A-Za-z0-9]/.test(password)) points++;
    const hasConsecutiveIdentical = /(.)\1/.test(password);
    const hasLongRun = /([a-zA-Z]{6,})|([0-9]{6,})/.test(password);
    if (hasConsecutiveIdentical || hasLongRun) points = Math.max(0, points - 1); 
    return points;
  };

  const validatePassword = (pass) => {
    if (pass.length < 8) return "Password must be at least 8 characters long.";
    if (pass.length > 20) return "Password cannot exceed 20 characters.";
    if (!/[a-zA-Z]/.test(pass) || !/[0-9]/.test(pass)) return "Password must contain at least one letter and one number.";
    if (/(.)\1/.test(pass)) return "No consecutive identical characters allowed.";
    if (/([a-zA-Z]{6,})/.test(pass)) return "Too many consecutive letters (max 5).";
    if (/([0-9]{6,})/.test(pass)) return "Too many consecutive numbers (max 5).";
    return null;
  };

  const strength = getStrength(formData.password);
  const isStrong = strength >= 3;
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';
  
  const strengthColor = () => {
    if (strength < 1) return '#dc3545';
    if (strength < 3) return '#ffc107';
    return '#28a745';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validatePassword(formData.password);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('https://byte-desk.onrender.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          user_id: formData.user_id,
          password: formData.password
        }),
      });

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(formData.username));
        setIsSuccess(true);
        fireConfetti(); 
        
        setTimeout(() => {
          navigate('/home'); 
        }, 3500); 
      } else {
        const result = await response.json();
        setError(result.message);
      }
    } catch (err) {
      setError("Registration failed. Please check your connection.");
    }
  };

  return (
    <div style={styles.background}>
      <style>
        {`
          input::-ms-reveal, input::-ms-clear { display: none; }
          input::-webkit-contacts-auto-fill-button, 
          input::-webkit-credentials-auto-fill-button { display: none !important; }
          
          @keyframes pulse-glow {
            0% { box-shadow: 0 0 0px #28a745; transform: scaleY(1); }
            50% { box-shadow: 0 0 15px #28a745; transform: scaleY(1.3); }
            100% { box-shadow: 0 0 0px #28a745; transform: scaleY(1); }
          }
        `}
      </style>

      <AnimatePresence>
        {isSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.successOverlay}>
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={styles.successCard}>
              <div style={styles.checkmarkCircle}>
                <span style={styles.checkmark}>✓</span>
              </div>
              <h2 style={styles.successTitle}>Welcome, {formData.username}!</h2>
              <p style={styles.successText}>You're all set. Heading to your dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={styles.error}>{error}</p>}
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input type="text" name="username" placeholder="e.g. John Doe" onChange={handleChange} required style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>User ID</label>
            <input type="text" name="user_id" placeholder="Choose a unique ID" onChange={handleChange} required style={styles.input} />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                placeholder="8-20 characters"
                onChange={handleChange} 
                required 
                style={styles.passwordInput} 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.toggleButton}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            
            {formData.password && (
              <div style={styles.strengthContainer}>
                <div style={{
                  ...styles.strengthBar,
                  width: `${Math.min((strength / 5) * 100, 100)}%`,
                  backgroundColor: strengthColor(),
                  animation: isStrong ? 'pulse-glow 1.5s infinite ease-in-out' : 'none'
                }} />
                <span style={{...styles.strengthText, color: strengthColor()}}>
                  {strength < 1 ? 'Weak' : strength < 3 ? 'Moderate' : 'Strong'}
                </span>
              </div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              name="confirmPassword" 
              placeholder="Re-enter password"
              onChange={handleChange} 
              required 
              style={{
                ...styles.input,
                borderColor: formData.confirmPassword ? (passwordsMatch ? '#28a745' : '#dc3545') : '#e0e0e0'
              }} 
            />
          </div>

          <button type="submit" style={styles.button}>Register & Sign In</button>
        </form>
        <p style={styles.footerText}>
          Already have an account? <span onClick={() => navigate('/login')} style={styles.link}>Login</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  background: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', fontFamily: '"Inter", sans-serif' },
  successOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  successCard: { textAlign: 'center' },
  checkmarkCircle: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#28a745', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px', boxShadow: '0 10px 25px rgba(40,167,69,0.3)' },
  checkmark: { color: 'white', fontSize: '40px' },
  successTitle: { fontSize: '28px', color: '#1a1a1a', fontWeight: '700' },
  successText: { fontSize: '16px', color: '#666' },
  card: { backgroundColor: '#fff', padding: '50px 40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', width: '95%', maxWidth: '440px', textAlign: 'center' },
  title: { margin: '0 0 40px 0', fontSize: '32px', fontWeight: '700', color: '#1a1a1a' },
  error: { color: '#dc3545', fontSize: '13px', marginBottom: '20px', backgroundColor: '#f8d7da', padding: '12px', borderRadius: '8px', textAlign: 'left' },
  inputGroup: { marginBottom: '25px', textAlign: 'left' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '10px' },
  passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  input: { width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', fontSize: '16px', boxSizing: 'border-box', outline: 'none' },
  passwordInput: { width: '100%', padding: '16px 60px 16px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', fontSize: '16px', boxSizing: 'border-box', outline: 'none' },
  toggleButton: { position: 'absolute', right: '16px', background: 'none', border: 'none', color: '#007bff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' },
  strengthContainer: { marginTop: '10px', width: '100%', height: '4px', backgroundColor: '#eee', borderRadius: '2px', position: 'relative' },
  strengthBar: { height: '100%', borderRadius: '2px', transition: 'all 0.3s ease' },
  strengthText: { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', position: 'absolute', right: 0, top: '8px' },
  button: { width: '100%', padding: '16px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '15px' },
  footerText: { marginTop: '30px', fontSize: '14px', color: '#666' },
  link: { color: '#007bff', cursor: 'pointer', fontWeight: '600' }
};

export default SignupForm;