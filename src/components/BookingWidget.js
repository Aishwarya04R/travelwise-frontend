import React from 'react';
import { Link } from 'react-router-dom';
import './BookingWidget.css';

function BookingWidget({ item, type }) {
  // Determine the price based on whether it's a package or a hotel
  const price = type === 'package' ? item.basePrice : item.costPerPerson;
  const priceLabel = type === 'package' ? 'per person' : 'per person / night';

  return (
    <div className="booking-widget">
      <div className="price-section">
        <span className="price-amount">₹{price}</span>
        <span className="price-label">{priceLabel}</span>
      </div>
      <Link 
        to="/checkout" 
        state={{ item, type }} 
        className="book-now-btn-widget"
      >
        Book Now
      </Link>
    </div>
  );
}

export default BookingWidget;
