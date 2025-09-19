import React, { useState } from 'react';
import api from '../api'; 
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // <-- ADD STATE FOR EMAIL
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      username: username,
      email: email, // <-- ADD EMAIL TO SUBMITTED DATA
      password: password,
      securityQuestion: securityQuestion,
      securityAnswer: securityAnswer,
    };

    try {
      const response = await api.post('/users/login', userData);
      console.log('User registered successfully:', response.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('There was an error registering the user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
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

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        {/* Add the new input fields here */}
        <div className="form-group">
          <label>Security Question</label>
          <input
            type="text"
            placeholder="e.g., Your favorite color?"
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Security Answer</label>
          <input
            type="text"
            placeholder="e.g., Blue"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        <p className="form-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );


}


export default Register;