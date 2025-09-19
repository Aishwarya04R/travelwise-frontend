import React from 'react';
import { useAuth } from '../context/AuthContext';
import './LoyaltyDashboard.css';

function LoyaltyDashboard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Generate a simple referral code from username
  const referralCode = user.username.toUpperCase() + user.id;

  return (
    <div className="loyalty-dashboard">
      <h3>Your Loyalty Rewards</h3>
      <div className="points-display">
        <span className="points-value">{user.loyaltyPoints}</span>
        <span className="points-label">Points</span>
      </div>
      <div className="referral-section">
        <h4>Refer a Friend!</h4>
        <p>Share your code with friends. When they sign up, you both get bonus points!</p>
        <div className="referral-code-box">
          <span>Your Referral Code:</span>
          <strong className="referral-code">{referralCode}</strong>
        </div>
      </div>
    </div>
  );
}

export default LoyaltyDashboard;