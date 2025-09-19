import React, { useEffect, useRef } from 'react';

function MapComponent({ lat, lng }) {
  // useRef will give us a direct reference to the div where the map will be rendered
  const mapRef = useRef(null);

  useEffect(() => {
    // This effect runs after the component has mounted
    if (mapRef.current) {
      const center = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      };

      // Create a new map instance using the global 'google' object
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 13,
      });

      // Add a marker to the map
      new window.google.maps.Marker({
        position: center,
        map: map,
      });
    }
  }, [lat, lng]); // Re-run the effect if lat or lng changes

  if (!lat || !lng) {
    return <div>Location data is not available for this item.</div>;
  }

  // This div is where the map will be injected
  return (
    <div ref={mapRef} style={{ width: '100%', height: '400px', borderRadius: '8px' }} />
  );
}

export default MapComponent;