import { useState } from 'react';
import { MapPin, Phone, Car, Clock, User, Eye, Hash } from 'lucide-react';

const mockDrivers = [
  {
    id: "D1",
    name: "Sarah Williams",
    avatar: "/picture.jpg",
    vehicle: "Honda Odyssey",
    plateNumber: "ABC-1234",
    location: "Midtown",
    address: "999 Peachtree St NE, Atlanta, GA 30309",
    status: "On Ride",
    statusColor: "#10b981", // Green for On Ride
    position: { top: "32%", left: "52%" },
    rideId: "R123",
    eta: "15 min"
  },
  {
    id: "D2",
    name: "Michael Johnson",
    avatar: "/picture.jpg",
    vehicle: "Toyota Sienna",
    plateNumber: "XYZ-5678",
    location: "West Midtown",
    address: "1234 West Peachtree St NW, Atlanta, GA 30309",
    status: "Ready Now",
    statusColor: "#10b981", // Green for Ready Now
    position: { top: "28%", left: "48%" },
    rideId: "R222",
    eta: "10 min"
  },
  {
    id: "D3",
    name: "David Thompson",
    avatar: "/picture.jpg",
    vehicle: "Ford Transit",
    plateNumber: "DEF-9012",
    location: "Downtown Atlanta",
    address: "456 Marietta St NW, Atlanta, GA 30313",
    status: "Delayed",
    statusColor: "#ef4444", // Red for Delayed
    position: { top: "45%", left: "54%" },
    rideId: "R456",
    eta: "8 min"
  },
  {
    id: "D4",
    name: "Jessica Martinez",
    avatar: "/picture.jpg",
    vehicle: "Chevrolet Suburban",
    plateNumber: "GHI-3456",
    location: "Buckhead",
    address: "3456 Peachtree Rd NE, Atlanta, GA 30326",
    status: "Ready Now",
    statusColor: "#10b981", // Green for Ready Now
    position: { top: "22%", left: "56%" },
    rideId: "R444",
    eta: "14 min"
  },
  {
    id: "D5",
    name: "Robert Chen",
    avatar: "/picture.jpg",
    vehicle: "Honda Pilot",
    plateNumber: "JKL-7890",
    location: "Virginia Highland",
    address: "1234 N Highland Ave NE, Atlanta, GA 30306",
    status: "On Ride",
    statusColor: "#10b981", // Green for On Ride
    position: { top: "35%", left: "60%" },
    rideId: "R789",
    eta: "12 min"
  }
];

export default function MapView({ onViewRide }) {
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
              onClick={() => {
                if (driver.rideId && onViewRide) {
                  onViewRide(driver.rideId, driver.status === 'Delayed' ? 'Delayed' : 'On Time');
                } else {
                  setSelectedDriver(driver);
                }
              }}
            >
              {/* Marker Pin with profile photo or initials */}
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-200 hover:scale-110 relative z-10"
                  style={{ 
                    backgroundColor: 'white',
                    border: `5px solid ${
                      driver.status === 'On Ride' ? '#10b981' :
                      driver.status === 'Ready Now' ? '#10b981' :
                      driver.status === 'Delayed' ? '#ef4444' :
                      driver.status === 'Unknown' ? '#000000' :
                      '#6b7280'
                    }`,
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {driver.avatar ? (
                    <img src={driver.avatar} alt={driver.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-sm font-semibold">
                      {driver.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  )}
                </div>

                {/* Enhanced Marker Pin Point with shadow */}
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 relative z-10">
                  <div
                    className="w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent"
                    style={{ 
                      borderTopColor: driver.status === 'On Ride' ? '#10b981' :
                      driver.status === 'Ready Now' ? '#10b981' :
                      driver.status === 'Delayed' ? '#ef4444' :
                      driver.status === 'Unknown' ? '#000000' :
                      '#6b7280'
                    }}
                  ></div>
                  {/* Shadow for the arrow */}
                  <div
                    className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent opacity-30"
                    style={{ borderTopColor: '#000000' }}
                  ></div>
                </div>
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
                      {driver.avatar ? (
                        <img src={driver.avatar} alt={driver.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                      ) : (
                        <span className="text-gray-700 text-sm font-semibold">
                          {driver.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      )}
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
                          <Hash className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{driver.plateNumber}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{driver.address}</span>
                        </div>
                        {driver.rideId && (
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
                            <span className="truncate">Route {driver.rideId} • ETA {driver.eta}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span className="truncate">Next Stop: West Campus</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 gap-2">
                        <button
                          className="text-blue-600 text-xs font-medium hover:text-blue-700 flex items-center hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (driver.rideId && onViewRide) {
                              onViewRide(driver.rideId, driver.status === 'Delayed' ? 'Delayed' : 'On Time');
                            } else {
                              setSelectedDriver(driver);
                            }
                          }}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
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
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {selectedDriver.avatar ? (
                    <img src={selectedDriver.avatar} alt={selectedDriver.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  ) : (
                    <User className="w-8 h-8 text-gray-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedDriver.name}</h3>
                  <p className="text-gray-600">{selectedDriver.vehicle}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Car className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{selectedDriver.vehicle}</span>
                </div>
                <div className="flex items-center">
                  <Hash className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{selectedDriver.plateNumber}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{selectedDriver.address}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>Next Stop: West Campus</span>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                {selectedDriver.rideId && (
                  <button
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700"
                    onClick={() => {
                      if (onViewRide) onViewRide(selectedDriver.rideId);
                    }}
                  >
                    View Ride
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 