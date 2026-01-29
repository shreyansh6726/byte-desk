import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Changed imports to look in the same folder as App.jsx
import LoginForm from './components/LoginForm'; 
import SignupForm from './components/SignupForm';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Welcome, {user || 'Guest'}!</h1>
      <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>
        Logout
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<h2 style={{textAlign: 'center'}}>404: Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;