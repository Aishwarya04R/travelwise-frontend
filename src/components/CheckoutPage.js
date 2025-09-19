import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import api from '../api';
import { useLocation } from 'react-router-dom';
import './Checkout.css';
import Spinner from './Spinner';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const location = useLocation();
  // Get the item (package or hotel) and its type from the navigation state
  const { item, type } = location.state || {};

  useEffect(() => {
    if (item) {
      // CORRECTED LOGIC: Use the correct price field based on the item type
      const price = type === 'package' ? item.basePrice : item.costPerPerson;
      // Price must be in the smallest currency unit (e.g., cents), so we multiply by 100
      const amount = Math.round(price * 100);

      api.post('/payment/create-payment-intent', { amount })
        .then(res => setClientSecret(res.data.clientSecret))
        .catch(err => console.error("Error creating payment intent:", err));
    }
  }, [item, type]);

  if (!item) {
    return <div>Invalid booking details. Please go back and try again.</div>;
  }

  const appearance = { theme: 'stripe' };
  const options = { clientSecret, appearance };

  return (
    <div className="checkout-container">
      <h2>Complete Your Payment</h2>
      <p>You are booking: <strong>{type === 'package' ? item.packageName : item.hotelName}</strong></p>
      
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          {/* Pass all necessary details to the checkout form */}
          <CheckoutForm bookingDetails={{ item, type }} />
        </Elements>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
export default CheckoutPage;
