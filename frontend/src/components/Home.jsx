import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      // replace: true prevents the user from going "back" to the home page
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {/* Your Home Content */}
    </div>
  );
};

export default Home;