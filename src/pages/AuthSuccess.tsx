import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // Store the JWT in localStorage so your other pages can use it:
      localStorage.setItem('token', token);
      // Redirect to the upload page (or wherever you want):
      navigate('/upload');
    } else {
      // If no token, send back to login
      navigate('/login');
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default AuthSuccess;
