import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import './Header.css';


function Header() {
  const { user, logout } = useAuth(); // Get user and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear the user state
    localStorage.removeItem('token'); // Remove the token
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">TravelWise</Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/packages">Packages</Link></li>
          <li><Link to="/hotels">Hotels</Link></li>
          <li><Link to="/plan-trip">Plan a Trip</Link></li>
          <li><Link to="/dream-trip">Dream Catcher</Link></li>
          {user ? (
            // If user is logged in, show these links
            <>
              <li><Link to="/my-bookings">My Bookings</Link></li>
                {/* ADD THIS CONDITIONAL LINK */}
                {user.role === 'ADMIN' && (
                  <li><Link to="/admin">Admin</Link></li>
                )}
                <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
            
          ) : (
            // If user is not logged in, show these links
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register" className="register-btn">Register</Link></li>
            </>
            

          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;