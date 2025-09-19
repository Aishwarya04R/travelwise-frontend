import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import './MyBookings.css';
import LoyaltyDashboard from './LoyaltyDashboard';
// The unused 'Spinner' import has been removed

function MyBookings() {
  const [packageBookings, setPackageBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        try {
          const response = await api.get(`/bookings/my-bookings/${user.id}`);
          setPackageBookings(response.data.packageBookings || []);
          setHotelBookings(response.data.hotelBookings || []);
        } catch (error) {
          console.error('Failed to fetch bookings:', error);
        }
      };
      fetchBookings();
    }
  }, [user]);

  if (!user) {
    return <div className="my-bookings-container"><h2>Please log in to see your bookings.</h2></div>;
  }

  return (
    <div className="my-bookings-container">
      <h2>My Dashboard</h2>
      <LoyaltyDashboard />
      <div className="booking-section">
        <h3>Package Bookings</h3>
        {packageBookings.length > 0 ? (
          <div className="booking-list-enhanced">
            {packageBookings.map(({ booking, packageDetails }) => (
              <div key={`pkg-${booking.id}`} className="booking-card-enhanced">
                <img src={packageDetails?.imageUrl} alt={packageDetails?.packageName} className="booking-image" />
                <div className="booking-info">
                  <h4>{packageDetails?.packageName}</h4>
                  <p><strong>Persons:</strong> {booking.persons}</p>
                  <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no package bookings.</p>
        )}
      </div>
      <div className="booking-section">
        <h3>Hotel Bookings</h3>
        {hotelBookings.length > 0 ? (
          <div className="booking-list-enhanced">
            {hotelBookings.map(({ booking, hotelDetails }) => (
              <div key={`htl-${booking.id}`} className="booking-card-enhanced">
                <img src={hotelDetails?.imageUrl} alt={hotelDetails?.hotelName} className="booking-image" />
                <div className="booking-info">
                  <h4>{hotelDetails?.hotelName}</h4>
                  <p><strong>Persons:</strong> {booking.persons}</p>
                  <p><strong>Days:</strong> {booking.days}</p>
                  <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no hotel bookings.</p>
        )}
      </div>
    </div>
  );
}

export default MyBookings;

    

