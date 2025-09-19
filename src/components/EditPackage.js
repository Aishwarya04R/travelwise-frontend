import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function EditPackage() {
  const [packageData, setPackageData] = useState({
    packageName: '',
    description: '',
    durationDays: '',
    basePrice: '',
    imageUrl: '',
    latitude: '',  // Add latitude
    longitude: '' // Add longitude
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await api.get(`/packages/${id}`);
        setPackageData(response.data);
      } catch (error) {
        console.error("Failed to fetch package data", error);
      }
    };
    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/packages/${id}`, packageData);
      alert('Package updated successfully!');
      navigate('/packages');
    } catch (error) {
      alert('Failed to update package.');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-section">
        <h3>Edit Travel Package</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <input name="packageName" type="text" placeholder="Package Name" value={packageData.packageName || ''} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={packageData.description || ''} onChange={handleChange} required />
          <input name="durationDays" type="number" placeholder="Duration (Days)" value={packageData.durationDays || ''} onChange={handleChange} required />
          <input name="basePrice" type="number" placeholder="Price" value={packageData.basePrice || ''} onChange={handleChange} required />
          <input name="imageUrl" type="text" placeholder="Image URL" value={packageData.imageUrl || ''} onChange={handleChange} required />
          {/* Add Latitude and Longitude inputs */}
          <input name="latitude" type="text" placeholder="Latitude" value={packageData.latitude || ''} onChange={handleChange} />
          <input name="longitude" type="text" placeholder="Longitude" value={packageData.longitude || ''} onChange={handleChange} />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditPackage;
