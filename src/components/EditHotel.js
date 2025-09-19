import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function EditHotel() {
  const [hotelData, setHotelData] = useState({
    hotelName: '',
    city: '',
    costPerPerson: '',
    acRoomCost: '',
    foodIncludedCost: '',
    imageUrl: '',
    latitude: '',
    longitude: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await api.get(`/hotels/${id}`);
        setHotelData(response.data);
      } catch (error) {
        console.error("Failed to fetch hotel data", error);
      }
    };
    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/hotels/${id}`, hotelData);
      alert('Hotel updated successfully!');
      navigate('/hotels');
    } catch (error) {
      alert('Failed to update hotel.');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-section">
        <h3>Edit Hotel</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <input name="hotelName" type="text" placeholder="Hotel Name" value={hotelData.hotelName || ''} onChange={handleChange} required />
          <input name="city" type="text" placeholder="City" value={hotelData.city || ''} onChange={handleChange} required />
          <input name="costPerPerson" type="number" placeholder="Cost per Person" value={hotelData.costPerPerson || ''} onChange={handleChange} required />
          <input name="acRoomCost" type="number" placeholder="A/C Room Cost" value={hotelData.acRoomCost || ''} onChange={handleChange} required />
          <input name="foodIncludedCost" type="number" placeholder="Food Included Cost" value={hotelData.foodIncludedCost || ''} onChange={handleChange} required />
          <input name="imageUrl" type="text" placeholder="Image URL" value={hotelData.imageUrl || ''} onChange={handleChange} required />
          <input name="latitude" type="text" placeholder="Latitude" value={hotelData.latitude || ''} onChange={handleChange} />
          <input name="longitude" type="text" placeholder="Longitude" value={hotelData.longitude || ''} onChange={handleChange} />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditHotel;
