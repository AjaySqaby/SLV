"use client";

import React from "react";
import { convertRideTimeToUserTimezone, getTimezoneLabel, getUserTimezone } from "@/utils/timezone";
import { useTimezone } from "@/contexts/TimezoneContext";

export default function DualTimeDisplay({ 
  rideTime, 
  rideTimezone, 
  userTimezone = null,
  showLabels = true,
  className = "",
  compact = true
}) {
  const { userTimezone: contextUserTimezone } = useTimezone();
  
  // Use provided userTimezone or fall back to context
  const effectiveUserTimezone = userTimezone || contextUserTimezone;
  
  // If no ride timezone provided, assume it's the same as user's timezone
  const effectiveRideTimezone = rideTimezone || effectiveUserTimezone;
  
  // If both timezones are the same, just show the ride time
  if (effectiveRideTimezone === effectiveUserTimezone) {
    return (
      <span className={`${className}`}>
        {showLabels && <span className="text-gray-600 mr-1">Time:</span>}
        <span className="font-medium">{rideTime}</span>
      </span>
    );
  }
  
  // Convert ride time to user's timezone
  const userTime = convertRideTimeToUserTimezone(rideTime, effectiveRideTimezone, effectiveUserTimezone);
  
  // Get timezone labels
  const rideTimezoneLabel = getTimezoneLabel(effectiveRideTimezone);
  const userTimezoneLabel = getTimezoneLabel(effectiveUserTimezone);
  
  // Compact display (original design)
  if (compact) {
    return (
      <span className={`${className}`}>
        {showLabels && <span className="text-gray-600 mr-1">Time:</span>}
        <span className="font-medium">{rideTime}</span>
        <span className="text-xs text-gray-500 ml-1">({rideTimezoneLabel})</span>
        <br />
        <span className="text-sm text-gray-600">{userTime}</span>
        <span className="text-xs text-gray-500 ml-1">({userTimezoneLabel})</span>
      </span>
    );
  }
  
  // Full display (for modals or detailed views)
  return (
    <div className={`text-sm ${className}`}>
      {showLabels && <div className="text-gray-600 mb-1">Time:</div>}
      
      {/* Ride time (primary) */}
      <div className="font-medium text-gray-900">
        {rideTime}
      </div>
      <div className="text-xs text-gray-500 mb-1">
        {rideTimezoneLabel}
      </div>
      
      {/* User's local time (secondary) */}
      <div className="text-sm text-gray-700">
        {userTime}
      </div>
      <div className="text-xs text-gray-500">
        {userTimezoneLabel}
      </div>
    </div>
  );
}
