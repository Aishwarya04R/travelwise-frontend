import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';

function ForgotPasswordNewPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/reset-password-sq', { username, newPassword });
      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    }
  };

  if (!username) return <p>Something went wrong. Please start over from the Forgot Password link.</p>;

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>Step 3: Enter your new password.</p>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <button type="submit">Reset Password</button>
        {message && <p className="form-link">{message}</p>}
      </form>
    </div>
  );
}
export default ForgotPasswordNewPassword;