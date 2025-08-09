"use client";

import React, { useState, useEffect } from "react";
import { Clock, Globe } from "lucide-react";
import { getUserTimezone, getCurrentTimeInTimezone } from "@/utils/timezone";
import { useTimezone } from "@/contexts/TimezoneContext";

export default function TimezoneIndicator() {
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const { userTimezone } = useTimezone();

  useEffect(() => {
    setIsClient(true);
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [userTimezone]);

  const updateTime = () => {
    if (userTimezone) {
      const time = getCurrentTimeInTimezone(userTimezone);
      setCurrentTime(time);
    }
  };

  // Don't render anything on server-side to prevent hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <Globe className="h-4 w-4" />
      <span className="font-medium">{userTimezone || getUserTimezone()}</span>
      <Clock className="h-4 w-4" />
      <span>{currentTime}</span>
    </div>
  );
}
