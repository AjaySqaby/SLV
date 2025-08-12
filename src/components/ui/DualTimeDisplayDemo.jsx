"use client";

import React from "react";
import DualTimeDisplay from "./DualTimeDisplay";

export default function DualTimeDisplayDemo() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">DualTimeDisplay Demo</h2>
      
      <div className="space-y-6">
        {/* Scenario 1: Different timezones */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-2">Scenario 1: Different Timezones</h3>
          <p className="text-sm text-gray-600 mb-3">
            User in India (IST) viewing ride in Los Angeles (PST)
          </p>
          <DualTimeDisplay 
            rideTime="7:30 AM"
            rideTimezone="America/Los_Angeles"
            userTimezone="Asia/Kolkata"
            showLabels={true}
          />
        </div>

        {/* Scenario 2: Same timezone */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-2">Scenario 2: Same Timezone</h3>
          <p className="text-sm text-gray-600 mb-3">
            User in New York (EST) viewing ride in New York (EST)
          </p>
          <DualTimeDisplay 
            rideTime="7:30 AM"
            rideTimezone="America/New_York"
            userTimezone="America/New_York"
            showLabels={true}
          />
        </div>

        {/* Scenario 3: User in Chicago viewing LA ride */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-2">Scenario 3: Central to Pacific</h3>
          <p className="text-sm text-gray-600 mb-3">
            User in Chicago (CST) viewing ride in Los Angeles (PST)
          </p>
          <DualTimeDisplay 
            rideTime="7:30 AM"
            rideTimezone="America/Los_Angeles"
            userTimezone="America/Chicago"
            showLabels={true}
          />
        </div>

                 {/* Scenario 4: Compact display */}
         <div className="border border-gray-200 rounded-lg p-4">
           <h3 className="font-medium mb-2">Scenario 4: Compact Display</h3>
           <p className="text-sm text-gray-600 mb-3">
             Compact display for table layouts
           </p>
           <DualTimeDisplay 
             rideTime="7:30 AM"
             rideTimezone="America/Los_Angeles"
             userTimezone="Asia/Kolkata"
             showLabels={false}
             compact={true}
           />
         </div>

         {/* Scenario 5: Full display */}
         <div className="border border-gray-200 rounded-lg p-4">
           <h3 className="font-medium mb-2">Scenario 5: Full Display</h3>
           <p className="text-sm text-gray-600 mb-3">
             Full display for modals and detailed views
           </p>
           <DualTimeDisplay 
             rideTime="7:30 AM"
             rideTimezone="America/Los_Angeles"
             userTimezone="Asia/Kolkata"
             showLabels={true}
             compact={false}
           />
         </div>
      </div>
    </div>
  );
}
