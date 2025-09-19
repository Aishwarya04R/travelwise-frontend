import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import MapComponent from './MapComponent';
import ReviewsSection from './ReviewsSection';
import LocalInfoWidget from './LocalInfoWidget';
import Spinner from './Spinner';
import BookingWidget from './BookingWidget';
import TripHighlights from './TripHighlights';
import WeatherWidget from './WeatherWidget';
import './HotelDetails.css'; // Use the new dedicated CSS

function HotelDetails() {
  const [hotelDetails, setHotelDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('explore');
  const { id } = useParams();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await api.get(`/hotels/${id}`);
        setHotelDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch hotel details:', error);
      }
    };
    fetchHotelDetails();
  }, [id]);

  if (!hotelDetails) {
    return <Spinner />;
  }

  return (
    <div className="hotel-details-layout"> {/* Use the new layout class */}
      {/* --- MAIN CONTENT (LEFT) --- */}
      <div className="hotel-main-content">
        <div className="hotel-header">
          <h1>{hotelDetails.hotelName}</h1>
          <p>{hotelDetails.city}</p>
        </div>
        
        <img src={hotelDetails.imageUrl} alt={hotelDetails.hotelName} className="hotel-image-full"/>
        
        <hr className="section-divider" />
        
        <TripHighlights highlights={hotelDetails.highlights} duration={null} />
        
        <hr className="section-divider" />

        <div className="details-section">
          <h3>About this Hotel</h3>
          <p className="details-description">Enjoy a luxurious stay at one of the finest hotels in {hotelDetails.city}.</p>
          <WeatherWidget lat={hotelDetails.latitude} lng={hotelDetails.longitude} />
        </div>
        
        <hr className="section-divider" />
        
         <div className="tab-container">
            <div className="tab-buttons">
                <button className={`tab-button ${activeTab === 'explore' ? 'active' : ''}`} onClick={() => setActiveTab('explore')}>Explore Like a Local</button>
                <button className={`tab-button ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>Location Map</button>
                <button className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>User Reviews</button>
            </div>
            <div className="tab-content">
                {activeTab === 'explore' && <LocalInfoWidget locationName={hotelDetails.city} />}
                {activeTab === 'map' && <MapComponent lat={hotelDetails.latitude} lng={hotelDetails.longitude} />}
                {activeTab === 'reviews' && <ReviewsSection itemId={id} itemType="hotel" />}
            </div>
        </div>
      </div>

      {/* --- SIDEBAR (RIGHT) --- */}
      <div className="hotel-sidebar">
        <BookingWidget item={hotelDetails} type="hotel" />
      </div>
    </div>
  );
}

export default HotelDetails;

