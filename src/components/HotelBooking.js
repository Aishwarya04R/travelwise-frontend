import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api';
import './Booking.css';

function HotelBooking() {
  const [persons, setPersons] = useState(1);
  const [days, setDays] = useState(1);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleBooking = async (event) => {
    event.preventDefault();
    if (!user) {
      addToast("Please log in to book a hotel.", 'error');
      return navigate('/login');
    }

    const bookingData = {
      hotelId: id,
      userId: user.id,
      persons,
      days
    };

    try {
      await api.post(`/hotels/${id}/book`, bookingData);
      addToast('Hotel booking successful!', 'success'); // <-- CORRECT MESSAGE
      navigate('/my-bookings');
    } catch (error) {
      console.error('Hotel booking failed:', error);
      addToast('Hotel booking failed. Please try again.', 'error');
    }
  };

  return (
    <div className="booking-container">
      <form onSubmit={handleBooking}>
        <h2>Confirm Your Hotel Booking</h2>
        <div className="form-group">
          <label>Number of Persons</label>
          <input type="number" value={persons} onChange={(e) => setPersons(e.target.value)} min="1"/>
        </div>
        <div className="form-group">
          <label>Number of Days</label>
          <input type="number" value={days} onChange={(e) => setDays(e.target.value)} min="1"/>
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default HotelBooking;
