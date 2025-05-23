import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">CRUD App</Link>
        <div className="navbar-nav">
          {isAuthenticated ? (
            <>
              <Link to="/users" className="nav-link">Users</Link>
              <button onClick={onLogout} className="btn btn-link nav-link">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 