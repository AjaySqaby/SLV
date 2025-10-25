"use client";

import React, { useState, useEffect } from "react";
import { Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function ETATracker({ 
  scheduledTime,
  driverETA,
  currentTime = null,
  className = ""
}) {
  const [timeStatus, setTimeStatus] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);
  const [isLate, setIsLate] = useState(false);
  const [isEarly, setIsEarly] = useState(false);
  const [isOnTime, setIsOnTime] = useState(false);

  useEffect(() => {
    if (!scheduledTime || !driverETA) return;

    const calculateTimeStatus = () => {
      // Parse times
      const parseTime = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        const [hours, minutes] = time.split(':');
        let hour = parseInt(hours);
        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;
        return hour * 60 + parseInt(minutes); // Convert to minutes
      };

      const scheduledMinutes = parseTime(scheduledTime);
      const driverMinutes = parseTime(driverETA);
      
      const difference = driverMinutes - scheduledMinutes;
      setTimeDifference(difference);

      if (difference > 0) {
        // Driver is late
        setIsLate(true);
        setIsEarly(false);
        setIsOnTime(false);
        setTimeStatus('late');
      } else if (difference < -5) {
        // Driver is early (more than 5 minutes early)
        setIsEarly(true);
        setIsLate(false);
        setIsOnTime(false);
        setTimeStatus('early');
      } else {
        // Driver is on time (within 5 minutes)
        setIsOnTime(true);
        setIsLate(false);
        setIsEarly(false);
        setTimeStatus('on-time');
      }
    };

    calculateTimeStatus();
  }, [scheduledTime, driverETA]);

  const getStatusIcon = () => {
    if (isLate) return <XCircle className="w-4 h-4 text-red-500" />;
    if (isEarly) return <CheckCircle className="w-4 h-4 text-green-500" />;
    return <Clock className="w-4 h-4 text-blue-500" />;
  };

  const getStatusColor = () => {
    if (isLate) return 'text-red-600 bg-red-50 border-red-200';
    if (isEarly) return 'text-green-600 bg-green-50 border-green-200';
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  const getStatusText = () => {
    if (isLate) return `Late by ${Math.abs(timeDifference)} minutes`;
    if (isEarly) return `Early by ${Math.abs(timeDifference)} minutes`;
    return 'On Time';
  };

  return (
    <div className={`bg-white rounded-lg border p-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium">ETA Status</span>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Scheduled Time:</span>
          <span className="font-medium">{scheduledTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Driver ETA:</span>
          <span className="font-medium">{driverETA}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Time Difference:</span>
          <span className={`font-medium ${isLate ? 'text-red-600' : isEarly ? 'text-green-600' : 'text-blue-600'}`}>
            {timeDifference > 0 ? `+${timeDifference} min` : `${timeDifference} min`}
          </span>
        </div>
      </div>
    </div>
  );
}
