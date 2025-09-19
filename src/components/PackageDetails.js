import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import MapComponent from './MapComponent';
import ReviewsSection from './ReviewsSection';
import LocalInfoWidget from './LocalInfoWidget';
import Spinner from './Spinner';
import BookingWidget from './BookingWidget';
import TripHighlights from './TripHighlights';
import DetailedItinerary from './DetailedItinerary';
import './PackageDetails.css';

function PackageDetails() {
  const [packageDetails, setPackageDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('explore');
  const { id } = useParams();

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await api.get(`/packages/${id}`);
        setPackageDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch package details:', error);
      }
    };
    fetchPackageDetails();
  }, [id]);

  if (!packageDetails) {
    return <Spinner />;
  }

  return (
    <div className="immersive-layout">
      {/* --- MAIN CONTENT (LEFT) --- */}
      <div className="immersive-main">
        <div className="details-header">
          <h1>{packageDetails.packageName}</h1>
        </div>
        
        <img src={packageDetails.imageUrl} alt={packageDetails.packageName} className="details-image-full"/>
        
        <hr className="section-divider" />
        
        <TripHighlights highlights={packageDetails.highlights} duration={packageDetails.durationDays} />
        
        <hr className="section-divider" />
        
        <div className="details-section">
          <h3>About this Trip</h3>
          <p className="details-description">{packageDetails.description}</p>
        </div>

        <hr className="section-divider" />
        
        <DetailedItinerary itinerary={packageDetails.itinerary} />
        
        <hr className="section-divider" />
        
        <div className="tab-container">
            <div className="tab-buttons">
                <button className={`tab-button ${activeTab === 'explore' ? 'active' : ''}`} onClick={() => setActiveTab('explore')}>Explore Like a Local</button>
                <button className={`tab-button ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>Location Map</button>
                <button className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>User Reviews</button>
            </div>
            <div className="tab-content">
                {activeTab === 'explore' && <LocalInfoWidget locationName={packageDetails.packageName} />}
                {activeTab === 'map' && <MapComponent lat={packageDetails.latitude} lng={packageDetails.longitude} />}
                {activeTab === 'reviews' && <ReviewsSection itemId={id} itemType="package" />}
            </div>
        </div>
      </div>

      {/* --- SIDEBAR (RIGHT) --- */}
      <div className="immersive-sidebar">
        <BookingWidget item={packageDetails} type="package" />
      </div>
    </div>
  );
}

export default PackageDetails;

