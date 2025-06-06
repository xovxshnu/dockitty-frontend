import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  function handleGoogleLogin() {
    // Redirect to your backend’s Google OAuth route:
    // If your backend is running on localhost:5000, it might be:
    //    http://localhost:5000/api/auth/google
    // If deployed on Railway, replace with that URL.
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-8 bg-white rounded shadow-md w-80 text-center">
        <h2 className="text-2xl font-bold mb-6">Login to Dockitty</h2>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
