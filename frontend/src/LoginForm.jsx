import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // In a real app, you'd save a token here
        window.location.href = '/home.html'; 
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server connection failed');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Enter your ID and Password</p>
        
        <form onSubmit={handleSubmit}>
          {error && <p style={styles.error}>{error}</p>}
          
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="user_id">User ID</label>
            <input
              type="text"
              id="user_id"
              name="user_id"
              placeholder="aarav.sh_92"
              value={formData.user_id}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                style={{...styles.input, paddingRight: '45px'}}
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
      </div>
    </div>
  );
};

const styles = {
  background: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    margin: 0,
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    width: '100%',
    maxWidth: '360px',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  subtitle: {
    margin: '0 0 32px 0',
    fontSize: '14px',
    color: '#666',
  },
  inputGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#888',
    marginBottom: '8px',
  },
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
    backgroundColor: '#f9f9f9',
  },
  toggleButton: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    color: '#007bff',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '4px',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
  },
  footerText: {
    marginTop: '24px',
    fontSize: '13px',
    color: '#888',
  },
  link: {
    color: '#007bff',
    cursor: 'pointer',
    fontWeight: '500',
  }
};

export default LoginForm;