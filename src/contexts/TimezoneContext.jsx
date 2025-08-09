"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { getUserTimezone, detectUserLocation } from '@/utils/timezone';

const TimezoneContext = createContext();

export const useTimezone = () => {
  const context = useContext(TimezoneContext);
  if (!context) {
    throw new Error('useTimezone must be used within a TimezoneProvider');
  }
  return context;
};

export const TimezoneProvider = ({ children }) => {
  const [userTimezone, setUserTimezone] = useState(null);
  const [isDetecting, setIsDetecting] = useState(true);
  const [detectionError, setDetectionError] = useState(null);

  useEffect(() => {
    const initializeTimezone = async () => {
      try {
        setIsDetecting(true);
        setDetectionError(null);
        
        // First try to get timezone from browser
        const browserTimezone = getUserTimezone();
        setUserTimezone(browserTimezone);
        
        // Optionally try to detect location-based timezone
        try {
          const locationTimezone = await detectUserLocation();
          if (locationTimezone && locationTimezone !== browserTimezone) {
            console.log('Location-based timezone detected:', locationTimezone);
            // You can choose to use location-based timezone or keep browser timezone
            // setUserTimezone(locationTimezone);
          }
        } catch (locationError) {
          console.warn('Location-based timezone detection failed:', locationError);
          // Continue with browser timezone
        }
      } catch (error) {
        console.error('Error initializing timezone:', error);
        setDetectionError('Failed to detect timezone');
        setUserTimezone('UTC'); // Fallback to UTC
      } finally {
        setIsDetecting(false);
      }
    };

    initializeTimezone();
  }, []);

  const updateUserTimezone = (newTimezone) => {
    setUserTimezone(newTimezone);
  };

  const value = {
    userTimezone,
    isDetecting,
    detectionError,
    updateUserTimezone,
  };

  return (
    <TimezoneContext.Provider value={value}>
      {children}
    </TimezoneContext.Provider>
  );
};
