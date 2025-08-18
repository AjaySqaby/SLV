"use client";

import { MapPin, Navigation } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function RideMap({ pickup, dropoff, status = "In-progress" }) {
  // Mock coordinates - in real app, these would come from API
  const pickupCoords = { lat: 33.9036, lng: -84.2833 }; // Doraville, GA
  const dropoffCoords = { lat: 33.9174, lng: -84.3376 }; // Cross Keys High School area
  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in-progress':
        return 'text-blue-600';
      case 'complete':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Navigation className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Live Tracking</h2>
      </div>
      
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Real-time location of the vehicle.
        </div>
        
        {/* Map Container */}
        <div className="relative bg-gray-100 rounded-lg h-64 overflow-hidden">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Road lines */}
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400 opacity-30"></div>
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 opacity-30"></div>
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400 opacity-30"></div>
            
            {/* Vertical roads */}
            <div className="absolute top-0 bottom-0 left-1/4 w-1 bg-gray-400 opacity-30"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-400 opacity-30"></div>
            <div className="absolute top-0 bottom-0 left-3/4 w-1 bg-gray-400 opacity-30"></div>
          </div>
          
          {/* Pickup Location */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <MapPin className="w-6 h-6 text-green-600" />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs shadow-sm border">
                Pickup
              </div>
            </div>
          </div>
          
          {/* Dropoff Location */}
          <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <MapPin className="w-6 h-6 text-red-600" />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs shadow-sm border">
                Dropoff
              </div>
            </div>
          </div>
          
          {/* Vehicle Location (moving dot) */}
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                Vehicle
              </div>
            </div>
          </div>
          
          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 25% 25% Q 50% 35% 75% 75%"
              stroke="#3B82F6"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>
        </div>
        
        {/* Map Legend */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-green-600" />
              <span>Pickup</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Dropoff</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span>Vehicle</span>
            </div>
          </div>
          
          <div className={`flex items-center space-x-1 ${getStatusColor(status)}`}>
            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
            <span className="font-medium">{status}</span>
          </div>
        </div>
        
        {/* Location Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Pickup Location</span>
            </div>
            <p className="text-sm text-green-700">{pickup.address}</p>
          </div>
          
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">Dropoff Location</span>
            </div>
            <p className="text-sm text-red-700">{dropoff.address}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
