"use client";
import React, { useState, useEffect } from "react";
import { X, Plus, GripVertical, Trash2, Clock, Calendar, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function AddRouteModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [formData, setFormData] = useState({
    routeId: "",
    routeType: "oneWay",
    routeDescription: "Pick up students from their addresses and drop off at school",
    district: "",
    campus: "",
    operatingDays: {
      monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
      saturday: false, sunday: false
    },
    startDate: new Date(2025, 7, 13),
    endDate: null,
    defaultPickupTime: "07:30",
    defaultDropoffTime: "15:30",
    additionalStops: []
  });

  const [newStop, setNewStop] = useState({
    name: "",
    address: "",
    arrivalTime: ""
  });

  const [showStopForm, setShowStopForm] = useState(false);
  const [assignMonitor, setAssignMonitor] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState("city-bus");
  const [showDriverDropdown, setShowDriverDropdown] = useState(false);
  const [driverSearchQuery, setDriverSearchQuery] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [operatingDays, setOperatingDays] = useState({
    monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
    saturday: false, sunday: false
  });
  const [showPartnerDropdown, setShowPartnerDropdown] = useState(false);
  const [partnerSearchQuery, setPartnerSearchQuery] = useState("");
  
  // Partner data from screenshot
  const partners = [
    { id: "abc-transport", name: "ABC Transportation" },
    { id: "city-bus", name: "City Bus Services" },
    { id: "metro-transit", name: "Metro Transit Co." },
    { id: "safe-ride", name: "Safe Ride Partners" }
  ];

  // Click outside handlers
  const handleClickOutside = (event) => {
    // Close partner dropdown if clicking outside
    if (showPartnerDropdown && !event.target.closest('.partner-dropdown')) {
      setShowPartnerDropdown(false);
      setPartnerSearchQuery("");
    }
    
    // Close driver dropdown if clicking outside
    if (showDriverDropdown && !event.target.closest('.driver-dropdown')) {
      setShowDriverDropdown(false);
      setDriverSearchQuery("");
    }
  };

  // Add event listener for click outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPartnerDropdown, showDriverDropdown]);
  
  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(partnerSearchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  const tabs = ["Basic Info", "Schedule", "Additional Stops", "Monitor", "Driver", "Payment"];

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Route ID</label>
        <input type="text" placeholder="Enter route ID" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Route Type</label>
        <label className="flex items-center">
          <input type="radio" name="routeType" defaultChecked className="mr-2" />
          One Way Route
        </label>
      </div>

             <div>
         <h3 className="text-lg font-medium text-gray-900 mb-3">Round Trip Routes</h3>
         <div className="space-y-4">
           {/* Top Row - Route Optimization */}
           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-sm">
             <h4 className="font-medium text-yellow-900">Route Optimization</h4>
             <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-1">Auto-Generated</span>
             <p className="text-sm text-yellow-700 mt-2">The system will automatically calculate the most efficient route order for both morning and afternoon trips to minimize travel time and distance.</p>
           </div>
           
           {/* Bottom Row - Morning and Afternoon Routes */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
               <h4 className="font-medium text-blue-900">Morning Route</h4>
               <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">Home → School</span>
               <p className="text-sm text-blue-700 mt-2">Pick up students from addresses and drop off at campus</p>
             </div>
             <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
               <h4 className="font-medium text-green-900">Afternoon Route</h4>
               <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">School → Home</span>
               <p className="text-sm text-green-700 mt-2">Pick up students from campus and drop off at addresses</p>
             </div>
           </div>
         </div>
       </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Route Description</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="Pick up students from their addresses and drop off at school" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">District</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Select district</option>
            <option value="86022-Z">86022-Z</option>
            <option value="75044-A">75044-A</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Campus</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Select a district first</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-900">Students</label>
          <Button variant="primary" className="flex items-center gap-2 text-sm">
            <Plus size={16} />
            Add a Student
          </Button>
        </div>
        <div className="border border-gray-300 rounded-md p-4 min-h-[100px] bg-gray-50">
          <p className="text-gray-500 text-sm">Select a campus to add students.</p>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
             <div>
         <label className="block text-sm font-medium text-gray-900 mb-3">Operating Days</label>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
              <label key={day} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200">
                <input 
                  type="checkbox" 
                  checked={operatingDays[day]}
                  onChange={(e) => {
                    setOperatingDays(prev => ({
                      ...prev,
                      [day]: e.target.checked
                    }));
                  }}
                  className="mr-3 h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
                />
                <span className="text-sm font-medium text-gray-700">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </span>
              </label>
            ))}
          </div>
       </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Effective Date Range</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Start Date *</label>
            <div className="relative">
              <input type="text" defaultValue="08/13/2025" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">End Date</label>
            <div className="relative">
              <input type="text" placeholder="Select end date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Default Times</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-xs text-gray-600 mb-1">Default Pickup Time</label>
            <div className="relative">
              <input type="time" defaultValue="07:30" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              <Clock size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <label className="block text-xs text-gray-600 mb-1">Default Dropoff Time</label>
            <div className="relative">
              <input type="time" defaultValue="15:30" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              <Clock size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Schedule Exceptions</label>
        <p className="text-xs text-gray-600 mb-3">Add dates when rides should not run (holidays, teacher work days, etc.)</p>
        
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <label className="block text-xs text-gray-600 mb-1">Select Dates</label>
              <div className="relative">
                <input type="text" placeholder="Select dates" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Exception Type</label>
              <div className="relative">
                <select defaultValue="No School" className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white">
                  <option value="No School">No School</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Teacher Work Day">Teacher Work Day</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Description</label>
              <input type="text" placeholder="e.g., Teacher In-service Day, Early Release, etc." className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <Button variant="primary" className="flex items-center gap-2 text-sm">
            <Plus size={16} />
            Add Exception
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAdditionalStops = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Stops</h3>
        <p className="text-sm text-gray-600 mb-4">Add intermediate stops between pickup and dropoff locations</p>
        
        {formData.additionalStops.length === 0 && !showStopForm ? (
          <div className="text-center py-8 text-gray-500">
            <p>No additional stops added yet. Click 'Add Stop' to create intermediate stops for this route.</p>
          </div>
        ) : (
          <div className="space-y-3">
                         {formData.additionalStops.map((stop, index) => (
               <div key={index} className="space-y-2">
                 <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-md bg-gray-50">
                   <GripVertical size={16} className="text-gray-400 cursor-move" />
                   <div className="flex-1">
                     <label className="block text-xs text-gray-600 mb-1">Stop Name</label>
                     <input
                       type="text"
                       value={stop.name}
                       placeholder="e.g., Community Center"
                       className="w-full px-3 py-2 border border-gray-300 rounded-md"
                       readOnly
                     />
                   </div>
                   <div className="flex-1">
                     <label className="block text-xs text-gray-600 mb-1">Address</label>
                     <input
                       type="text"
                       value={stop.address}
                       placeholder="Enter full address"
                       className="w-full px-3 py-2 border border-gray-300 rounded-md"
                       readOnly
                     />
                   </div>
                   <div className="relative">
                     <label className="block text-xs text-gray-600 mb-1">Estimated Arrival Time</label>
                     <input
                       type="text"
                       value={stop.arrivalTime}
                       placeholder="--:--"
                       className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                       readOnly
                     />
                     <Clock size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                   </div>
                   <button
                     onClick={() => {
                       setFormData(prev => ({
                         ...prev,
                         additionalStops: prev.additionalStops.filter((_, i) => i !== index)
                       }));
                     }}
                     className="text-red-500 hover:text-red-700"
                   >
                     <Trash2 size={16} />
                   </button>
                 </div>
               </div>
             ))}
            
                         {showStopForm && (
               <div className="space-y-2">
                 <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-md bg-blue-50">
                   <GripVertical size={16} className="text-gray-400 cursor-move" />
                   <div className="flex-1">
                     <label className="block text-xs text-gray-600 mb-1">Stop Name</label>
                     <input
                       type="text"
                       value={newStop.name}
                       onChange={(e) => setNewStop(prev => ({ ...prev, name: e.target.value }))}
                       placeholder="e.g., Community Center"
                       className="w-full px-3 py-2 border border-gray-300 rounded-md"
                     />
                   </div>
                   <div className="flex-1">
                     <label className="block text-xs text-gray-600 mb-1">Address</label>
                     <input
                       type="text"
                       value={newStop.address}
                       onChange={(e) => setNewStop(prev => ({ ...prev, address: e.target.value }))}
                       placeholder="Enter full address"
                       className="w-full px-3 py-2 border border-gray-300 rounded-md"
                     />
                   </div>
                   <div className="relative">
                     <label className="block text-xs text-gray-600 mb-1">Estimated Arrival Time</label>
                     <input
                       type="text"
                       value={newStop.arrivalTime}
                       onChange={(e) => setNewStop(prev => ({ ...prev, arrivalTime: e.target.value }))}
                       placeholder="--:--"
                       className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                     />
                     <Clock size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                   </div>
                   <div className="flex gap-2">
                     <button
                       onClick={() => {
                         if (newStop.name && newStop.address) {
                           setFormData(prev => ({
                             ...prev,
                             additionalStops: [...prev.additionalStops, { ...newStop }]
                           }));
                           setNewStop({ name: "", address: "", arrivalTime: "" });
                           setShowStopForm(false);
                         }
                       }}
                       className="text-green-600 hover:text-green-700"
                     >
                       ✓
                     </button>
                     <button
                       onClick={() => {
                         setNewStop({ name: "", address: "", arrivalTime: "" });
                         setShowStopForm(false);
                       }}
                       className="text-red-500 hover:text-red-700"
                     >
                       ✕
                     </button>
                   </div>
                 </div>
               </div>
             )}
          </div>
        )}
        
        <div className="flex justify-end">
          <Button 
            variant="primary" 
            className="flex items-center gap-2"
            onClick={() => setShowStopForm(true)}
          >
            <Plus size={16} />
            Add Stop
          </Button>
        </div>
      </div>
    </div>
  );

  const renderMonitor = () => (
    <div className="space-y-6">
      <div>
        <label className="flex items-center">
          <input 
            type="radio" 
            name="monitorAssignment" 
            checked={assignMonitor}
            onChange={() => setAssignMonitor(true)}
            className="mr-2 h-4 w-4 text-blue-600" 
          />
          Assign a monitor to this route
        </label>
        <p className="text-sm text-gray-600 mt-2 ml-6">Monitor will be picked up first and dropped off last to supervise students during the ride.</p>
      </div>

      {assignMonitor ? (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Monitor Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter monitor's full name" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="monitor@email.com" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Drop Off Address (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Enter monitor's drop off address" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank to use pickup address for drop off</p>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  placeholder="(555) 123-4567" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Pickup Address *</label>
                <input 
                  type="text" 
                  placeholder="Enter monitor's pickup address" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
              </div>
            </div>
          </div>
          
          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Special Instructions</label>
            <textarea 
              placeholder="Any special instructions for the monitor or driver" 
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none" 
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No monitor assigned to this route. Check the box above to add a monitor for student supervision.</p>
        </div>
      )}
    </div>
  );

  const renderDriver = () => {
         // Mock driver data based on partner
     const getDriversForPartner = (partnerName) => {
       switch (partnerName) {
         case "ABC Transportation":
           return [
             { id: "david-chen", name: "David Chen", phone: "(555) 123-4567" },
             { id: "maria-rodriguez", name: "Maria Rodriguez", phone: "(555) 234-5678" },
             { id: "john-smith", name: "John Smith", phone: "(555) 345-6789" }
           ];
         case "City Bus Services":
           return [
             { id: "sarah-johnson", name: "Sarah Johnson", phone: "(555) 456-7890" },
             { id: "michael-brown", name: "Michael Brown", phone: "(555) 567-8901" },
             { id: "emma-wilson", name: "Emma Wilson", phone: "(555) 678-9012" }
           ];
         case "Metro Transit Co.":
           return [
             { id: "james-davis", name: "James Davis", phone: "(555) 789-0123" },
             { id: "lisa-garcia", name: "Lisa Garcia", phone: "(555) 890-1234" }
           ];
         case "Safe Ride Partners":
           return [
             { id: "robert-martinez", name: "Robert Martinez", phone: "(555) 901-2345" },
             { id: "anna-thompson", name: "Anna Thompson", phone: "(555) 012-3456" }
           ];
         default:
           return [];
       }
     };

    const availableDrivers = getDriversForPartner(selectedPartner);
    const filteredDrivers = availableDrivers.filter(driver =>
      driver.name.toLowerCase().includes(driverSearchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6">
        {/* Partner Selection */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Partner Selection</h3>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Select Partner *</label>
                         <div className="relative partner-dropdown">
               <button
                 type="button"
                 onClick={() => setShowPartnerDropdown(!showPartnerDropdown)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
               >
                 {selectedPartner || "Select a partner"}
               </button>
               <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
               
               {showPartnerDropdown && (
                 <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                   {/* Search Bar */}
                   <div className="p-3 border-b border-gray-200">
                     <div className="relative">
                       <input
                         type="text"
                         placeholder="Search select a partner..."
                         value={partnerSearchQuery}
                         onChange={(e) => setPartnerSearchQuery(e.target.value)}
                         className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                       />
                       <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                       </svg>
                     </div>
                   </div>
                   
                   {/* Partner List */}
                   <div className="max-h-48 overflow-y-auto">
                     {filteredPartners.map((partner) => (
                       <button
                         key={partner.id}
                         type="button"
                         onClick={() => {
                           setSelectedPartner(partner.name);
                           setShowPartnerDropdown(false);
                           setPartnerSearchQuery("");
                           setSelectedDriver("");
                           setShowDriverDropdown(false);
                           setDriverSearchQuery("");
                         }}
                         className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-sm"
                       >
                         {partner.name}
                       </button>
                     ))}
                   </div>
                 </div>
               )}
            </div>
            <p className="text-sm text-gray-600 mt-1">Choose a partner to load their available drivers</p>
          </div>
        </div>

        {/* Driver Assignment */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Driver Assignment</h3>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Primary Driver</label>
                         <div className="relative driver-dropdown">
               <button
                 type="button"
                 onClick={() => selectedPartner && setShowDriverDropdown(!showDriverDropdown)}
                 className={`w-full px-3 py-2 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                   !selectedPartner ? 'text-gray-400' : 'text-gray-900'
                 }`}
                 disabled={!selectedPartner}
               >
                 {selectedDriver || "Select primary driver"}
               </button>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
               
               {showDriverDropdown && selectedPartner && (
                 <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                  {/* Search Bar */}
                  <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search select primary driv"
                        value={driverSearchQuery}
                        onChange={(e) => setDriverSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Driver List */}
                  <div className="max-h-48 overflow-y-auto">
                    {filteredDrivers.length > 0 ? (
                      filteredDrivers.map((driver) => (
                        <button
                          key={driver.id}
                          type="button"
                          onClick={() => {
                            setSelectedDriver(driver.name);
                            setShowDriverDropdown(false);
                            setDriverSearchQuery("");
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-sm"
                        >
                          {driver.name}
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-500">
                        No drivers found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {selectedPartner ? "Select a driver from the list above" : "Select a partner above to see available drivers"}
            </p>
          </div>
        </div>

        {/* Driver Notes & Instructions */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Driver Notes & Instructions</h3>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Driver Notes & Instructions</label>
            <textarea 
              placeholder="Special instructions for drivers, route-specific notes, or safety reminders" 
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none" 
            />
          </div>
        </div>
      </div>
    );
  };

  const renderPayment = () => (
    <div className="space-y-6">
      {/* Payment Structure */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-green-600">$</span> Payment Structure
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Driver Payment (per trip) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Monitor Payment (per trip)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Mileage Rate (per mile)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Fuel Surcharge</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* District Billing */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          District Billing
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Total District Charge (per trip) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md" 
              />
            </div>
          </div>
          
          {/* Cost Breakdown */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Cost Breakdown (per trip)
            </h4>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Driver Payment:</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Monitor Payment:</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fuel Surcharge:</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                <span className="font-medium text-gray-900">Total Costs:</span>
                <span className="font-bold text-gray-900">$0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Notes */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Notes</h3>
        <div>
          <textarea 
            placeholder="Additional payment terms, billing cycles, or special arrangements" 
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none" 
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Basic Info": return renderBasicInfo();
      case "Schedule": return renderSchedule();
      case "Additional Stops": return renderAdditionalStops();
      case "Monitor": return renderMonitor();
      case "Driver": return renderDriver();
      case "Payment": return renderPayment();
      default: return renderBasicInfo();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New Route</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose} className="px-4 py-2">
            Cancel
          </Button>
          <Button variant="primary" className="px-4 py-2 bg-blue-600 hover:bg-blue-700">
            Create Route
          </Button>
        </div>
      </div>
    </div>
  );
}
