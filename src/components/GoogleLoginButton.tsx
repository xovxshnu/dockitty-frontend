import React from 'react';

const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
