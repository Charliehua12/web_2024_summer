import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLoginClick = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:7001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        onLogin();  // 调用传递的 onLogin 回调函数
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome to Coteam</h1>
        <p className="login-subtitle">Your task management tool</p>
        <form className="login-form" onSubmit={handleLoginClick}>
          <input 
            type="text" 
            className="login-input" 
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <input 
            type="password" 
            className="login-input" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button 
            type="submit" 
            className="login-button"
          >
            Login
          </button>
        </form>
        {error && <p className="login-error">{error}</p>}
        <p className="login-footer">
          Don't have an account? <a href="#" onClick={() => navigate('/register')}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
