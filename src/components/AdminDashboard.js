import React, { useState } from 'react';
import api from '../api';
import { useToast } from '../context/ToastContext'; // Import the useToast hook
import './AdminDashboard.css';

function AdminDashboard() {
  // Get the addToast function from our context
  const { addToast } = useToast();

  // State for the package form
  const [packageName, setPackageName] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [packageImageUrl, setPackageImageUrl] = useState('');
  
  // State for the hotel form
  const [hotelName, setHotelName] = useState('');
  const [city, setCity] = useState('');
  const [costPerPerson, setCostPerPerson] = useState('');
  const [acRoomCost, setAcRoomCost] = useState('');
  const [foodIncludedCost, setFoodIncludedCost] = useState('');
  const [hotelImageUrl, setHotelImageUrl] = useState('');

  const handleAddPackage = async (e) => {
    e.preventDefault();
    const newPackage = { packageName, description: packageDescription, durationDays, basePrice, imageUrl: packageImageUrl };
    try {
      await api.post('/admin/packages', newPackage);
      addToast('Package added successfully!', 'success'); // Use success toast
      // Clear form
      setPackageName('');
      setPackageDescription('');
      setDurationDays('');
      setBasePrice('');
      setPackageImageUrl('');
    } catch (error) {
      addToast('Failed to add package. You may not have admin rights.', 'error'); // Use error toast
    }
  };
  
  const handleAddHotel = async (e) => {
    e.preventDefault();
    const newHotel = { hotelName, city, costPerPerson, acRoomCost, foodIncludedCost, imageUrl: hotelImageUrl };
    try {
      await api.post('/admin/hotels', newHotel);
      addToast('Hotel added successfully!', 'success'); // Use success toast
      // Clear form
      setHotelName('');
      setCity('');
      setCostPerPerson('');
      setAcRoomCost('');
      setFoodIncludedCost('');
      setHotelImageUrl('');
    } catch (error) {
      addToast('Failed to add hotel. You may not have admin rights.', 'error'); // Use error toast
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Add Package Section */}
      <div className="admin-section">
        <h3>Add New Travel Package</h3>
        <form onSubmit={handleAddPackage} className="admin-form">
          <input type="text" placeholder="Package Name" value={packageName} onChange={e => setPackageName(e.target.value)} required />
          <textarea placeholder="Description" value={packageDescription} onChange={e => setPackageDescription(e.target.value)} required />
          <input type="number" placeholder="Duration (Days)" value={durationDays} onChange={e => setDurationDays(e.target.value)} required />
          <input type="number" placeholder="Price" value={basePrice} onChange={e => setBasePrice(e.target.value)} required />
          <input type="text" placeholder="Image URL" value={packageImageUrl} onChange={e => setPackageImageUrl(e.target.value)} required />
          <button type="submit">Add Package</button>
        </form>
        {/* The old message <p> tag is no longer needed */}
      </div>

      {/* Add Hotel Section */}
      <div className="admin-section">
        <h3>Add New Hotel</h3>
        <form onSubmit={handleAddHotel} className="admin-form">
          <input type="text" placeholder="Hotel Name" value={hotelName} onChange={e => setHotelName(e.target.value)} required />
          <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} required />
          <input type="number" placeholder="Cost per Person" value={costPerPerson} onChange={e => setCostPerPerson(e.target.value)} required />
          <input type="number" placeholder="A/C Room Cost" value={acRoomCost} onChange={e => setAcRoomCost(e.target.value)} required />
          <input type="number" placeholder="Food Included Cost" value={foodIncludedCost} onChange={e => setFoodIncludedCost(e.target.value)} required />
          <input type="text" placeholder="Image URL" value={hotelImageUrl} onChange={e => setHotelImageUrl(e.target.value)} required />
          <button type="submit">Add Hotel</button>
        </form>
        {/* The old message <p> tag is no longer needed */}
      </div>

    </div>
  );
}

export default AdminDashboard;
