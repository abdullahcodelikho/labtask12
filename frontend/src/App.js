import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import UserManagement from './components/UserManagement';

const InDevelopment = () => {
  const location = useLocation();
  const name = location.state?.name || 'User';
  return (
    <div className="container mt-4">
      <h2>In development</h2>
      <p>{name}, sorry but this page is currently in development.</p>
      <p>Please check back at a later date :)</p>
    </div>
  );
};

const UserHome = () => (
  <div className="container mt-4">
    <h2>Welcome!</h2>
    <p>You are logged in as a regular user.</p>
  </div>
);

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/api/auth/me', {
            headers: { 'x-auth-token': token }
          });
          setIsAdmin(res.data.isAdmin);
        } catch (err) {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [token]);

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  const AdminRoute = ({ children }) => {
    return token && isAdmin ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <div className="App">
        <Navbar token={token} setToken={setToken} />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/signup" element={<Signup setToken={setToken} />} />
            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              }
            />
            <Route
              path="/user-home"
              element={
                <PrivateRoute>
                  <UserHome />
                </PrivateRoute>
              }
            />
            <Route path="/in-development" element={<InDevelopment />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
