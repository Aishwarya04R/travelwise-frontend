import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api'; // Import our configured api instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await api.get('/users/profile');
          setUser(response.data); // Restore user state
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          localStorage.removeItem('token'); // Clear bad token
        }
      };
      fetchUserProfile();
    }
    setLoading(false); // End loading
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Don't render children until we've checked for a token
  if (loading) {
    return <div>Loading Application...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};