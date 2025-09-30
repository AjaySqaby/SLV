"use client";
import { useState } from "react";
import { ShoppingBag, ChevronDown, DollarSign, Users, MapPin, Clock, Calendar, User } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import SearchInput from "@/components/ui/SearchInput";

export default function MarketplaceContent() {
  const [rides, setRides] = useState([
    {
      id: "RT-38754",
      district: "86022-Z",
      date: "04/06/2025",
      pickupTime: "7:30 AM",
      pickupAddress: "1234 Peachtree St NE, Atlanta, GA",
      dropoffTime: "8:15 AM",
      dropoffLocation: "Maynard Jackson High School",
      students: 2,
      driverFare: 45,
      reason: "Driver unavailable due to illness",
      minFare: 46
    },
    {
      id: "RT-39283",
      district: "86022-Z",
      date: "04/07/2025",
      pickupTime: "6:45 AM",
      pickupAddress: "5678 Roswell Rd, Sandy Springs, GA",
      dropoffTime: "7:30 AM",
      dropoffLocation: "North Springs High School",
      students: 3,
      driverFare: 55,
      reason: "Vehicle maintenance issue",
      minFare: 56
    }
  ]);

  const [fareUpdates, setFareUpdates] = useState({});
  const [expandedRides, setExpandedRides] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleFareUpdate = (rideId, newFare) => {
    setFareUpdates(prev => ({
      ...prev,
      [rideId]: newFare
    }));
  };

  const handleUpdateFare = (rideId) => {
    const currentFare = fareUpdates[rideId];
    const ride = rides.find(r => r.id === rideId);
    
    if (!currentFare) {
      alert("Please enter a fare amount");
      return;
    }
    
    if (parseInt(currentFare) < ride.driverFare) {
      alert(`Amount must be at least $${ride.driverFare}`);
      return;
    }
    
    // Update both the ride's minimum fare and driver fare
    const updatedRides = rides.map(r => 
      r.id === rideId 
        ? { 
            ...r, 
            minFare: parseInt(currentFare),
            driverFare: parseInt(currentFare)
          }
        : r
    );
    setRides(updatedRides);
    
    // Clear the input field after updating
    setFareUpdates(prev => ({
      ...prev,
      [rideId]: ""
    }));
    
    console.log(`Updated fare for ride ${rideId} to $${currentFare}`);
  };

  const handleShowDrivers = (rideId) => {
    setExpandedRides(prev => ({
      ...prev,
      [rideId]: !prev[rideId]
    }));
  };

  // Filter rides based on search query
  const filteredRides = rides.filter((ride) => {
    const matchesSearch =
      ride.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.dropoffLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Sample available drivers data
  const availableDrivers = [
    {
      id: "DR-001",
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      rating: 4.8,
      vehicle: "Toyota Camry 2022",
      distance: "2.3 miles",
      status: "Available"
    },
    {
      id: "DR-002", 
      name: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      rating: 4.9,
      vehicle: "Honda Accord 2021",
      distance: "1.8 miles",
      status: "Available"
    },
    {
      id: "DR-003",
      name: "Mike Davis",
      phone: "+1 (555) 456-7890",
      rating: 4.7,
      vehicle: "Ford Fusion 2023",
      distance: "3.1 miles",
      status: "Available"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--primary-black)]">Marketplace</h1>
          <p className="text-[var(--muted-text)] mt-1">Manage rejected rides and find available drivers</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rides by ID, district, location, or reason"
            width="w-full"
          />
        </div>
      </div>

      {/* Rides Grid - 2 cards per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRides.map((ride) => (
          <Card key={ride.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="text-[var(--blue)] font-semibold text-lg">
                  {ride.id}
                </div>
                <div className="text-[var(--muted-text)]">
                  District: {ride.district}
                </div>
              </div>
              <div className="px-3 py-1 bg-[var(--red)] text-white text-sm font-medium rounded-full">
                Rejected
              </div>
            </div>

             {/* Ride Details */}
             <div className="space-y-4 mb-6">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
                   <Calendar className="w-6 h-6 text-[var(--blue-600)]" />
                 </div>
                 <span className="text-[var(--heading)] font-medium">{ride.date}</span>
               </div>
               
               <div className="space-y-3">
                 <div className="flex items-start gap-3">
                   <div className="w-10 h-10 bg-[var(--green-100)] rounded-full flex items-center justify-center mt-0.5">
                     <Clock className="w-6 h-6 text-[var(--green-600)]" />
                   </div>
                   <div>
                     <div className="text-[var(--heading)] font-medium">
                       Pickup: {ride.pickupTime}
                     </div>
                     <div className="text-[var(--muted-text)] text-sm">
                       {ride.pickupAddress}
                     </div>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-3">
                   <div className="w-10 h-10 bg-[var(--purple-100)] rounded-full flex items-center justify-center mt-0.5">
                     <MapPin className="w-6 h-6 text-[var(--purple-600)]" />
                   </div>
                   <div>
                     <div className="text-[var(--heading)] font-medium">
                       Dropoff: {ride.dropoffTime}
                     </div>
                     <div className="text-[var(--muted-text)] text-sm">
                       {ride.dropoffLocation}
                     </div>
                   </div>
                 </div>
               </div>

               <div className="space-y-3">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-[var(--amber-100)] rounded-full flex items-center justify-center">
                     <Users className="w-6 h-6 text-[var(--amber-600)]" />
                   </div>
                   <span className="text-[var(--heading)] font-medium">
                     {ride.students} students
                   </span>
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-[var(--green-100)] rounded-full flex items-center justify-center">
                     <DollarSign className="w-6 h-6 text-[var(--green-600)]" />
                   </div>
                   <span className="text-[var(--heading)] font-medium">
                     Driver Fare: ${ride.driverFare}
                   </span>
                 </div>
                 
                 <div className="text-sm text-[var(--muted-text)]">
                   <span className="font-medium">Reason:</span> {ride.reason}
                 </div>
               </div>
             </div>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-[var(--border)]">
              {/* Increase Driver Fare */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-[var(--heading)]">
                  Increase Driver Fare
                </label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    placeholder={`Min $${ride.driverFare}`}
                    value={fareUpdates[ride.id] || ""}
                    onChange={(e) => handleFareUpdate(ride.id, e.target.value)}
                    className="flex-1 h-9"
                    min={ride.driverFare}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateFare(ride.id)}
                    className="whitespace-nowrap"
                  >
                    Update Fare
                  </Button>
                </div>
                {fareUpdates[ride.id] && parseInt(fareUpdates[ride.id]) < ride.driverFare && (
                  <div className="text-red-500 text-sm mt-1">
                    Amount must be at least ${ride.driverFare}
                  </div>
                )}
              </div>

              {/* Show Available Drivers */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-200 ${
                      expandedRides[ride.id] ? 'rotate-180' : ''
                    }`}
                  />
                }
                onClick={() => handleShowDrivers(ride.id)}
                className="bg-[var(--blue)] hover:bg-[var(--blue-600)]"
              >
                {expandedRides[ride.id] ? 'Hide Available Drivers' : 'Show Available Drivers'}
              </Button>

              {/* Collapsible Available Drivers Section */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedRides[ride.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pt-4 border-t border-[var(--border)]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-[var(--blue)] rounded-full"></div>
                    <h3 className="text-lg font-semibold text-[var(--heading)]">Available Drivers</h3>
                  </div>
                  
                   <div className="text-center py-8">
                     <div className="w-20 h-20 bg-[var(--gray-100)] rounded-full flex items-center justify-center mx-auto mb-4">
                       <User className="w-10 h-10 text-[var(--muted-text)]" />
                     </div>
                     <h4 className="text-lg font-medium text-[var(--heading)] mb-2">No Available Drivers</h4>
                     <p className="text-[var(--muted-text)]">
                       No available drivers found for this district.
                     </p>
                   </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

       {/* Empty State */}
       {filteredRides.length === 0 && (
         <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] p-12">
           <div className="text-center">
             <div className="w-20 h-20 bg-[var(--gray-100)] rounded-full flex items-center justify-center mx-auto mb-4">
               <ShoppingBag className="w-10 h-10 text-[var(--muted-text)]" />
             </div>
             <h3 className="text-lg font-semibold text-[var(--heading)] mb-2">
               {searchQuery ? 'No rides found' : 'No rejected rides available'}
             </h3>
             <p className="text-[var(--muted-text)]">
               {searchQuery 
                 ? 'Try adjusting your search criteria to find rides'
                 : 'All rides have been assigned or there are no rejected rides at the moment.'
               }
             </p>
           </div>
         </div>
       )}
    </div>
  );
}
