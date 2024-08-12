import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegisterClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:7001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        onRegister(); // 注册成功后清除登录状态
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onRegister(); // 确保点击 "Login" 按钮后清除登录状态
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Register</h1>
        <form className="login-form" onSubmit={handleRegisterClick}>
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
            Register
          </button>
        </form>
        {error && <p className="login-error">{error}</p>}
        <p className="login-footer">
            Already have an account? <a href="#" onClick={handleLoginClick}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;  // 这里确保默认导出
