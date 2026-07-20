// Auth.jsx - Maintained by M Durga Prasad
import React, { useState } from 'react';

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      // Uses relative path for EKS Ingress routing
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      
      if (isLogin) {
        onAuthSuccess(data.token);
      } else {
        setIsLogin(true);
        setError('Registration successful! Please log in.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 w-96">
        <h2 className="text-3xl font-black text-cyan-400 mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        {error && <p className="text-rose-400 text-sm mb-4 text-center bg-rose-900/30 py-2 rounded">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Username" required
            className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-cyan-400 focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-cyan-400 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-colors">
            {isLogin ? 'Secure Login' : 'Register Securely'}
          </button>
        </form>
        <p className="mt-4 text-center text-slate-400 text-sm">
          {isLogin ? "Don't have an account? " : "Already registered? "}
          <button onClick={() => {setIsLogin(!isLogin); setError('');}} className="text-cyan-400 hover:underline">
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}