import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const API = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage('✅ Login successful!');
        navigate('/upload');
      } else {
        setMessage(`❌ Login failed: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">Login to Dockitty</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-3 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded font-semibold transition"
          >
            Log In
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
