import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage('✅ Registered successfully!');
        navigate('/upload');
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded">
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default Register;
