import React, { useState } from 'react';
import api from '../api'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      username: username,
      password: password,
    };
    try {
      // Step 1: Log in using the standard axios instance to get the token
      const response = await api.post('/users/login', userData);
      const { jwt } = response.data;

      // Step 2: IMPORTANT - Save the new token to localStorage FIRST
      localStorage.setItem('token', jwt);

      // Step 3: Now, use our custom 'api' instance to fetch the user's profile.
      // It will automatically add the new token from localStorage to its headers.
      const userResponse = await api.get('/users/profile');

      // Step 4: Save the user data and token in our application's state
      login(userResponse.data, jwt);
      
      navigate('/my-bookings');

    } catch (error) {
      console.error('Login failed:', error);
      // It's better to show a more specific error from the server if it exists
      const errorMessage = error.response?.data?.message || "Please check your credentials.";
      alert(`Login failed: ${errorMessage}`);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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

