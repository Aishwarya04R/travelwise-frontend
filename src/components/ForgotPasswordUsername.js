import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function ForgotPasswordUsername() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/get-security-question', { username });
      navigate('/forgot-password/answer', { state: { username, question: response.data.securityQuestion } });
    } catch (err) {
      setError('User not found. Please check the username.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>Step 1: Enter your username.</p>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <button type="submit">Next</button>
        {error && <p className="form-link" style={{color: 'red'}}>{error}</p>}
      </form>
    </div>
  );
}
export default ForgotPasswordUsername;