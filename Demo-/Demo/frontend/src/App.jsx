import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';  // 确保导入的是默认导出
import TaskList from './Components/TaskList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/task-board');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <TaskList />} />
      <Route path="/register" element={<Register onRegister={handleLogout} />} />
      <Route path="/task-board" element={isLoggedIn ? <TaskList /> : <Login onLogin={handleLogin} />} />
      <Route path="/" element={<Login onLogin={handleLogin} />} />
    </Routes>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
