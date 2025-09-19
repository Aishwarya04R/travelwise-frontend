import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import './Packages.css'; // We'll create this new CSS file

function Packages() {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input
  const { user } = useAuth();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        let response;
        if (searchTerm) {
          // If there's a search term, use the search endpoint
          response = await api.get(`/packages/search?query=${searchTerm}`);
        } else {
          // Otherwise, fetch all packages
          response = await api.get('/packages');
        }
        setPackages(response.data);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      }
    };

    // This setup will re-fetch data whenever the searchTerm changes
    const delayDebounceFn = setTimeout(() => {
        fetchPackages();
    }, 300); // 300ms delay to avoid API calls on every keystroke

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
        try {
            await api.delete(`/admin/packages/${id}`);
            setPackages(packages.filter(p => p.id !== id));
        } catch (error) {
            alert('Failed to delete package.');
        }
    }
  };

  return (
    <div className="packages-container">
      <h2>Our Travel Packages</h2>

      {/* SEARCH BAR */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for a destination or package..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="packages-grid">
        {packages.map(pkg => (
          <div key={pkg.id} className="package-card">
            <Link to={`/packages/${pkg.id}`} className="package-card-link">
              <img src={pkg.imageUrl} alt={pkg.packageName} className="package-image"/>
              <div className="package-info">
                <h3>{pkg.packageName}</h3>
                <p>{pkg.description}</p>
                <p><strong>Duration:</strong> {pkg.durationDays} days</p>
                <p><strong>Price:</strong> ${pkg.basePrice}</p>
              </div>
            </Link>
            {user && user.role === 'ADMIN' && (
              <div className="admin-actions">
                <Link to={`/admin/edit-package/${pkg.id}`} className="btn-edit">Edit</Link>
                <button onClick={() => handleDelete(pkg.id)} className="btn-delete">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Packages;

