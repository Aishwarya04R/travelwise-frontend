import React, { useState } from 'react';
import api from '../api';
import Spinner from './Spinner';
import './SOSButton.css';

function SOSModal({ closeModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [helpInfo, setHelpInfo] = useState(null);

  const findHelp = (helpType) => {
    setError('');
    setHelpInfo(null);
    setIsLoading(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser. Please use a modern browser.");
      setIsLoading(false);
      return;
    }

    // This function will be called if the user DENIES location access
    const locationError = (err) => {
      console.error("Geolocation error:", err);
      setError(`Location permission was denied. Please enable location access in your browser's site settings to use this feature.`);
      setIsLoading(false);
    };

    // This function will be called if the user ALLOWS location access
    const locationSuccess = async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await api.post('/sos/find-help', { latitude, longitude, helpType });
        // THE FIX: response.data is already a JavaScript object.
        // We can use it directly without parsing it again.
        setHelpInfo(response.data);
      } catch (err) {
        console.error("Backend error:", err);
        setError(`Could not find help. The AI service may be busy. Please try again later.`);
      } finally {
        setIsLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
  };

  return (
    <div className="sos-modal-overlay">
      <div className="sos-modal-content">
        <button onClick={closeModal} className="close-modal-btn">&times;</button>
        
        <h2>Emergency Support</h2>
        <p>Select the type of assistance you need. We will use your current location to find the nearest help.</p>

        <div className="help-options">
          <button onClick={() => findHelp('Hospital')} disabled={isLoading}>Medical</button>
          <button onClick={() => findHelp('Police')} disabled={isLoading}>Police</button>
          <button onClick={() => findHelp('Embassy')} disabled={isLoading}>Embassy</button>
        </div>
        
        <div className="results-container">
          {isLoading && <Spinner />}
          {error && <p className="error-message">{error}</p>}
          {helpInfo && (
            <div className="help-info-card">
              <h3>{helpInfo.name}</h3>
              <p><strong>Address:</strong> {helpInfo.address}</p>
              <p><strong>Phone:</strong> <a href={`tel:${helpInfo.phone}`}>{helpInfo.phone}</a></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SOSModal;

