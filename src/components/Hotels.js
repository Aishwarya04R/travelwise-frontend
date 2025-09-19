import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import './Hotels.css'; // Use the CSS file from the Canvas

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input
  const { user } = useAuth();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const endpoint = searchTerm ? `/hotels/search?query=${searchTerm}` : '/hotels';
        const response = await api.get(endpoint);
        setHotels(response.data);
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };
    
    // This setup will re-fetch data whenever the searchTerm changes, with a small delay
    const delayDebounceFn = setTimeout(() => {
      fetchHotels();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        await api.delete(`/admin/hotels/${id}`);
        setHotels(hotels.filter(h => h.id !== id));
        // In a real app, you would use a toast notification here
      } catch (error) {
        console.error('Failed to delete hotel:', error);
      }
    }
  };

  return (
    <div className="packages-container">
      <h2>Our Best Hotels</h2>

      {/* SEARCH BAR */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for a hotel or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="packages-grid">
        {hotels.map(hotel => (
          <div key={hotel.id} className="package-card">
            <Link to={`/hotels/${hotel.id}`} className="package-card-link">
              <img src={hotel.imageUrl} alt={hotel.hotelName} className="package-image"/>
              <div className="package-info">
                <h3>{hotel.hotelName}</h3>
                <p><strong>City:</strong> {hotel.city}</p>
                <p><strong>Price per person:</strong> ${hotel.costPerPerson}</p>
              </div>
            </Link>
            {user && user.role === 'ADMIN' && (
              <div className="admin-actions">
                <Link to={`/admin/edit-hotel/${hotel.id}`} className="btn-edit">Edit</Link>
                <button onClick={() => handleDelete(hotel.id)} className="btn-delete">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;

