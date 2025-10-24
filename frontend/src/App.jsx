import React, { useEffect } from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/UserContext';
import { Toaster } from 'react-hot-toast';

const Root = ({ navigate }) => {
  useEffect(() => {
    // Checks if the token in available in local storage
    const isAuthenticated = !!localStorage.getItem('token');

    // Redirects to dashboard if authenticated, otherwise to Login
    return isAuthenticated ? navigate('/dashboard') : navigate('/login');
  });
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

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '',
          style: {
            fontSize: '14px',
            borderRadius: '9px',
            padding: '15px 18px',
          },
          success: {
            style: {
              background: '#16a34a', // green-600
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#16a34a',
            },
          },
          error: {
            style: {
              background: '#dc2626', // red-600
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#dc2626',
            },
          },
        }}
      />
    </UserProvider>
  );
};

export default App;
