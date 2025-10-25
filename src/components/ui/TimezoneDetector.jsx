"use client";

import React, { useState, useEffect } from "react";
import { Globe, MapPin, Clock } from "lucide-react";
import { getUserTimezone, getTimezoneLabel, getCurrentTimeInTimezone } from "@/utils/timezone";

export default function TimezoneDetector({ 
  rideTimezone = "America/Los_Angeles",
  className = "" 
}) {
  const [userTimezone, setUserTimezone] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const detectTimezone = async () => {
      try {
        setIsDetecting(true);
        
        // Get user's timezone automatically from browser
        const detectedTimezone = getUserTimezone();
        setUserTimezone(detectedTimezone);
        
        // Get current time in user's timezone
        const time = getCurrentTimeInTimezone(detectedTimezone);
        setCurrentTime(time);
        
        console.log('🌍 Auto-detected timezone:', detectedTimezone);
        console.log('🕐 Current time in your timezone:', time);
        
      } catch (error) {
        console.error('Error detecting timezone:', error);
        setUserTimezone('UTC');
        setCurrentTime('Unknown');
      } finally {
        setIsDetecting(false);
      }
    };

    detectTimezone();
  }, []);

  if (isDetecting) {
    return (
      <div className={`flex items-center gap-2 text-sm text-gray-500 ${className}`}>
        <Globe className="w-4 h-4 animate-spin" />
        <span>Detecting timezone...</span>
      </div>
    );
  }

  const getCountryFromTimezone = (timezone) => {
    const timezoneCountryMap = {
      'America/New_York': 'United States (Eastern)',
      'America/Chicago': 'United States (Central)', 
      'America/Denver': 'United States (Mountain)',
      'America/Los_Angeles': 'United States (Pacific)',
      'Europe/London': 'United Kingdom',
      'Europe/Paris': 'France',
      'Europe/Berlin': 'Germany',
      'Asia/Kolkata': 'India',
      'Asia/Shanghai': 'China',
      'Asia/Tokyo': 'Japan',
      'Australia/Sydney': 'Australia (Eastern)',
      'Australia/Perth': 'Australia (Western)',
      'Pacific/Auckland': 'New Zealand',
    };
    
    return timezoneCountryMap[timezone] || 'Global Location';
  };

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-medium text-blue-800">🌍 Global Timezone Detection</div>
          <div className="text-xs text-gray-600">Works from any country: USA, India, UK, Australia, etc.</div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">📍 Your Location:</span>
          <span className="font-medium text-blue-700">{getCountryFromTimezone(userTimezone)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">🕐 Current Time:</span>
          <span className="font-medium text-green-600">{currentTime}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">🌍 Timezone:</span>
          <span className="font-medium text-blue-700">{getTimezoneLabel(userTimezone)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">🚌 Ride Timezone:</span>
          <span className="font-medium text-orange-600">{getTimezoneLabel(rideTimezone)}</span>
        </div>
      </div>
      
      <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <div className="text-xs text-green-700 font-medium">
            ✅ Automatically detected from your browser location
          </div>
        </div>
        <div className="text-xs text-green-600 mt-1">
          Works from any country: USA, India, UK, Australia, etc.
        </div>
      </div>
    </div>
  );
}
