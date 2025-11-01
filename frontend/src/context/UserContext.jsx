import React, { createContext, useEffect, useState } from 'react';
import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [insightData, setInsightData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to update the user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear the user data when logged out
  const clearUser = () => {
    setUser(null);
  };

  // Fetch Insight Data
  const fetchInsightData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_SMART_INSIGHTS);
      if (response.data) {
        setInsightData(response.data);
      }
    } catch (error) {
      console.error('Error fetching insight data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        insightData,
        setInsightData,
        loading,
        setLoading,
        fetchInsightData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
