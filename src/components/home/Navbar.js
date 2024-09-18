import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; // Optional styling

function Navbar() {
  const navigate = useNavigate();
  
  // Function to check if the user is logged in
  const isLoggedIn = () => {
    return localStorage.getItem('token') !== null; // Assuming token is stored in localStorage
  };

  // Function to handle logo click
  const handleLogoClick = () => {
    if (isLoggedIn()) {
      navigate('/home'); // Navigate to homepage if logged in
    } else {
      navigate('/'); // Navigate to login/landing page if not logged in
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('userType');
    navigate('/'); // Redirect to landing page after logout
  };

  return (
    <nav className="navbar">
      {/* Logo that navigates based on login status */}
      <h1 className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        Alexander Mackenzie Secondary School Management System
      </h1>

      <ul className="nav-links">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        
        {isLoggedIn() ? (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        ) : (
          <li><Link to="/">Login</Link></li> // Show Login link when not logged in
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
