import React, { useState } from 'react';
import api from '../api';

function ForgotPassword() {
  const [email, setEmail] = useState(''); // <-- Change to email
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/forgot-password', { email }); // <-- Change to email
      setMessage('If an account with that email exists, a password reset link has been sent.');
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> {/* <-- Change to email */}
        </div>
        <button type="submit">Send Reset Link</button>
        {message && <p className="form-link">{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;