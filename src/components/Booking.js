import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api';
import './Booking.css';

function Booking() {
  const [persons, setPersons] = useState(1);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleBooking = async (event) => {
    event.preventDefault();
    if (!user) {
      addToast("Please log in to book a package.", 'error');
      return navigate('/login');
    }

    const bookingData = {
      packageId: id,
      userId: user.id,
      persons: persons,
      totalPrice: 0 // Placeholder
    };

    try {
      await api.post(`/packages/${id}/book`, bookingData);
      addToast('Package booking successful!', 'success'); // <-- CORRECT MESSAGE
      navigate('/my-bookings');
    } catch (error) {
      console.error('Booking failed:', error);
      addToast('Booking failed. Please try again.', 'error');
    }
  };

  return (
    <div className="booking-container">
      <form onSubmit={handleBooking}>
        <h2>Confirm Your Booking</h2>
        <div className="form-group">
          <label>Number of Persons</label>
          <input
            type="number"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            min="1"
          />
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default Booking;
