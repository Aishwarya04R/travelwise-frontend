import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api'; // There is now only ONE import for 'api'
import axios from 'axios'; // We still need the original axios for the login call

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, password };
    
    try {
      // Use the standard axios for login to get the token
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, userData);
      const { jwt } = response.data;

      // Save the token FIRST
      localStorage.setItem('token', jwt);

      // Now fetch the user's profile using our authenticated 'api' instance
      const userResponse = await api.get('/users/profile');

      // Save user data in our context
      login(userResponse.data, jwt);
      
      addToast('Login successful!', 'success');
      navigate('/my-bookings');

    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.message || "Please check your credentials.";
      addToast(`Login failed: ${errorMessage}`, 'error');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <p className="form-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p className="form-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;