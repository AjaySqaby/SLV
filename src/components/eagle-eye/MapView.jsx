import { useState } from 'react';
import { MapPin, Phone, Car, Clock, User, Eye } from 'lucide-react';

const mockDrivers = [
  {
    id: "D1",
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    vehicle: "Honda Odyssey",
    location: "Midtown",
    address: "999 Peachtree St NE, Atlanta, GA 30309",
    phone: "510-555-2345",
    status: "On Ride",
    statusColor: "#3b82f6",
    position: { top: "32%", left: "52%" },
    rideId: "R123",
    eta: "15 min"
  },
  {
    id: "D2", 
    name: "Michael Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    vehicle: "Toyota Sienna",
    location: "West Midtown",
    address: "1234 West Peachtree St NW, Atlanta, GA 30309",
    phone: "510-555-1234",
    status: "Ready Now",
    statusColor: "#16a34a",
    position: { top: "28%", left: "48%" },
    rideId: null,
    eta: null
  },
  {
    id: "D3",
    name: "David Thompson", 
    avatar: "/placeholder.svg?height=40&width=40",
    vehicle: "Ford Transit",
    location: "Downtown Atlanta",
    address: "456 Marietta St NW, Atlanta, GA 30313",
    phone: "510-555-3456",
    status: "Delayed",
    statusColor: "#ef4444",
    position: { top: "45%", left: "54%" },
    rideId: "R456",
    eta: "8 min"
  },
  {
    id: "D4",
    name: "Jessica Martinez",
    avatar: "/placeholder.svg?height=40&width=40", 
    vehicle: "Chevrolet Suburban",
    location: "Buckhead",
    address: "3456 Peachtree Rd NE, Atlanta, GA 30326",
    phone: "510-555-4567",
    status: "Ready Now",
    statusColor: "#16a34a",
    position: { top: "22%", left: "56%" },
    rideId: null,
    eta: null
  },
  {
    id: "D5",
    name: "Robert Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    vehicle: "Honda Pilot", 
    location: "Virginia Highland",
    address: "1234 N Highland Ave NE, Atlanta, GA 30306",
    phone: "510-555-5678",
    status: "On Ride",
    statusColor: "#3b82f6",
    position: { top: "35%", left: "60%" },
    rideId: "R789",
    eta: "12 min"
  }
];

export default function MapView() {
  const [hoveredDriver, setHoveredDriver] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case "On Ride":
        return <Car className="w-3 h-3" />;
      case "Ready Now":
        return <User className="w-3 h-3" />;
      case "Delayed":
        return <Clock className="w-3 h-3" />;
      default:
        return <MapPin className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex-1 relative">
      {/* Google Maps Background */}
      <div className="absolute inset-0 bg-[var(--surface-muted)]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212270.7411321579!2d-84.56068880277875!3d33.76804936776367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5045d6993098d%3A0x66fede2f990b630b!2sAtlanta%2C%20GA!5e0!3m2!1sen!2sus!4v1621361323087!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Driver Markers Overlay (clickable) */}
      <div className="absolute inset-0">
        {mockDrivers.map((driver) => (
          <div key={driver.id} className="pointer-events-auto">
            {/* Driver Marker Container */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ 
                top: driver.position.top, 
                left: driver.position.left,
                zIndex: hoveredDriver?.id === driver.id ? 1000 : 10
              }}
              onMouseEnter={() => setHoveredDriver(driver)}
              onMouseLeave={(e) => {
                // Check if we're moving to the tooltip
                const relatedTarget = e.relatedTarget;
                if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
                  setHoveredDriver(null);
                }
              }}
              onClick={() => setSelectedDriver(driver)}
            >
              {/* Marker Pin */}
              <div className="relative">
                <div 
                  className="w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 relative z-10"
                  style={{ backgroundColor: driver.statusColor }}
                >
                  <div style={{ color: '#ffffff' }}>
                    {getStatusIcon(driver.status)}
                  </div>
                </div>
                
                {/* Marker Pin Point */}
                <div 
                  className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent relative z-10"
                  style={{ borderTopColor: driver.statusColor }}
                ></div>
              </div>

              {/* Hover Tooltip */}
              {hoveredDriver?.id === driver.id && (
                <div 
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 min-w-[280px] animate-in fade-in zoom-in duration-200"
                  style={{ zIndex: 1001 }}
                  onMouseEnter={() => setHoveredDriver(driver)}
                  onMouseLeave={() => setHoveredDriver(null)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{driver.name}</h3>
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium text-white flex-shrink-0 ml-2"
                          style={{ backgroundColor: driver.statusColor }}
                        >
                          {driver.status}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Car className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{driver.vehicle}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{driver.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{driver.phone}</span>
                        </div>
                        {driver.rideId && (
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
                            <span className="truncate">Ride {driver.rideId} • ETA {driver.eta}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 gap-2">
                        <button 
                          className="text-blue-600 text-xs font-medium hover:text-blue-700 flex items-center hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDriver(driver);
                          }}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </button>
                        <button 
                          className="text-green-600 text-xs font-medium hover:text-green-700 flex items-center hover:bg-green-50 px-2 py-1 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`tel:${driver.phone}`, '_self');
                          }}
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Call Driver
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tooltip Arrow */}
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"
                    style={{ zIndex: 1002 }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Driver Modal/Panel (if needed) */}
      {selectedDriver && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-30 pointer-events-auto">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Driver Details</h2>
              <button 
                onClick={() => setSelectedDriver(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedDriver.name}</h3>
                  <p className="text-gray-600">{selectedDriver.vehicle}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{selectedDriver.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{selectedDriver.phone}</span>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700">
                  View Full Details
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700">
                  Call Driver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 