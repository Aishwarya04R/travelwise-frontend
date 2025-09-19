import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';

function ForgotPasswordAnswer() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { username, question } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/validate-answer', { username, answer });
      navigate('/forgot-password/new', { state: { username } });
    } catch (err) {
      setError('Incorrect answer. Please try again.');
    }
  };

  if (!username) return <p>Something went wrong. Please start over from the Forgot Password link.</p>;

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>Step 2: Answer your security question.</p>
        <div className="form-group">
          <label>{question}</label>
          <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
        </div>
        <button type="submit">Verify</button>
        {error && <p className="form-link" style={{color: 'red'}}>{error}</p>}
      </form>
    </div>
  );
}
export default ForgotPasswordAnswer;