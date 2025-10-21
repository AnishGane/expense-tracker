import React from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/UserContext';

const Root = ({ navigate }) => {
  // Checks if the token in available in local storage
  const isAuthenticated = !!localStorage.getItem('token');

  // Redirects to dashboard if authenticated, otherwise to Login
  return isAuthenticated ? navigate('/dashboard') : navigate('/login');
};

const App = () => {
  const navigate = useNavigate();
  return (
    <UserProvider>
      <div>
        <Routes>
          <Route path="/" element={<Root navigate={navigate} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;
