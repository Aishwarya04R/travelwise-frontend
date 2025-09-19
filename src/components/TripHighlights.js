import React from 'react';
import './TripHighlights.css';

// Simple SVG icons for demonstration
const MountainIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L2 21h20L12 3z"/></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;

function TripHighlights({ highlights, duration }) {
  let parsedHighlights = [];
  try {
    parsedHighlights = JSON.parse(highlights) || [];
  } catch (e) {
    // Fallback for simple comma-separated strings
    parsedHighlights = highlights ? highlights.split(',') : [];
  }

  return (
    <div className="trip-highlights">
      <div className="highlight-item">
        <ClockIcon />
        <span>{duration} Days</span>
      </div>
      {parsedHighlights.slice(0, 3).map((highlight, index) => ( // Show up to 3 highlights
        <div key={index} className="highlight-item">
          {index === 0 ? <MountainIcon /> : <UsersIcon />}
          <span>{highlight}</span>
        </div>
      ))}
    </div>
  );
}

export default TripHighlights;
