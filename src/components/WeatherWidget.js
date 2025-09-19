import React, { useState, useEffect } from 'react';
import api from '../api';
import './WeatherWidget.css';

function WeatherWidget({ lat, lng }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (lat && lng) {
      const fetchWeather = async () => {
        try {
          const response = await api.get(`/weather?lat=${lat}&lon=${lng}`);
          setWeather(response.data);
        } catch (error) {
          console.error("Failed to fetch weather data:", error);
        }
      };
      fetchWeather();
    }
  }, [lat, lng]);

  if (!weather) {
    return <div className="weather-widget-loading">Loading weather...</div>;
  }

  const { name, main, weather: weatherDetails } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;

  return (
    <div className="weather-widget">
      <h4>Current Weather in {name}</h4>
      <div className="weather-details">
        <img src={iconUrl} alt={weatherDetails[0].description} className="weather-icon" />
        <div className="weather-temp">{Math.round(main.temp)}°C</div>
        <div className="weather-desc">{weatherDetails[0].main}</div>
      </div>
    </div>
  );
}

export default WeatherWidget;