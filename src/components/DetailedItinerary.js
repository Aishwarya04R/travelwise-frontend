import React from 'react';
import './DetailedItinerary.css';

function DetailedItinerary({ itinerary }) {
  let parsedItinerary = {};
  try {
    parsedItinerary = JSON.parse(itinerary) || {};
  } catch (e) {
    return <p>A detailed itinerary is not available for this package.</p>;
  }

  return (
    <div className="detailed-itinerary">
      <h3>Detailed Itinerary</h3>
      <ul className="itinerary-list">
        {Object.entries(parsedItinerary).map(([day, description]) => (
          <li key={day} className="itinerary-day">
            <strong>{day}:</strong> {description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetailedItinerary;
