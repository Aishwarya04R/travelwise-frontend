import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';

// The 'bookingDetails' variable is received as a "prop" from the parent CheckoutPage.js component.
function CheckoutForm({ bookingDetails }) {
  const stripe = useStripe();
  const elements = useElements();
  const { addToast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // We add state here for the new input fields
  const [persons, setPersons] = useState(1);
  const [days, setDays] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !user) {
      addToast('Something went wrong. Please try again.', 'error');
      return;
    }
    setIsProcessing(true);

    const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });

    if (paymentError) {
      addToast(paymentError.message, 'error');
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      try {
        const { item, type } = bookingDetails; // We use the prop here
        let bookingData;
        let bookingEndpoint;

        if (type === 'package') {
          bookingEndpoint = `/packages/${item.id}/book`;
          bookingData = {
            packageId: item.id,
            userId: user.id,
            persons: persons,
            totalPrice: item.basePrice * persons
          };
        } else { // type === 'hotel'
          bookingEndpoint = `/hotels/${item.id}/book`;
          bookingData = {
            hotelId: item.id,
            userId: user.id,
            persons: persons,
            days: days,
            totalPrice: item.costPerPerson * persons * days
          };
        }

        await api.post(bookingEndpoint, bookingData);
        
        // --- This is the new logic to award loyalty points ---
        const price = type === 'package' ? item.basePrice : item.costPerPerson;
        const amountSpent = price * persons * (type === 'hotel' ? days : 1);
        try {
            await api.post('/loyalty/award-points', { userId: user.id, amount: amountSpent });
            addToast(`You've earned ${Math.floor(amountSpent / 100)} points!`, 'success');
        } catch (pointsError) {
            console.error("Failed to award points:", pointsError);
        }
        // --- End of new logic ---

        addToast('Booking and payment successful!', 'success');
        navigate('/my-bookings');

      } catch (bookingError) {
        console.error("Failed to save booking:", bookingError);
        addToast('Your payment was successful, but we failed to save your booking. Please contact support.', 'error');
        setIsProcessing(false);
      }
    } else {
      addToast('Payment did not succeed. Please try again.', 'error');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      {/* Input fields for persons and days */}
      <div className="form-group">
        <label>Number of Persons</label>
        <input 
          type="number" 
          value={persons} 
          onChange={(e) => setPersons(Number(e.target.value))} 
          min="1" 
          required 
        />
      </div>
      
      {bookingDetails.type === 'hotel' && (
        <div className="form-group">
          <label>Number of Days</label>
          <input 
            type="number" 
            value={days} 
            onChange={(e) => setDays(Number(e.target.value))} 
            min="1" 
            required 
          />
        </div>
      )}
      
      <hr style={{margin: '1.5rem 0'}} />

      <PaymentElement />
      <button disabled={isProcessing || !stripe || !elements} className="pay-now-btn">
        <span>{isProcessing ? "Processing…" : "Pay Now"}</span>
      </button>
    </form>
  );
}

export default CheckoutForm;

