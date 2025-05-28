// import React, { useState } from 'react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const API = import.meta.env.VITE_API_URL;

//     try {
//       const res = await fetch(`${API}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('✅ Login successful!');
//         localStorage.setItem('token', data.token); // Save token if needed
//       } else {
//         setMessage(`❌ Login failed: ${data.message}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Server error');
//     }
//   };

//   return (
//     <div className="p-4 max-w-sm mx-auto">
//       <h1 className="text-xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleLogin} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 w-full"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
//           Log In
//         </button>
//       </form>
//       {message && <p className="mt-4 text-sm">{message}</p>}
//     </div>
//   );
// };

// export default Login;
