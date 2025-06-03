import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/upload'); // Redirect to your main app page
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default AuthSuccess;
