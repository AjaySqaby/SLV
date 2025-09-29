"use client";
import React, { useState, useEffect } from "react";
import { X, Plus, GripVertical, Trash2, Clock, Calendar, ChevronDown, Route, User, Car, DollarSign, CreditCard } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Toggle from "@/components/ui/Toggle";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function AddRouteModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [formData, setFormData] = useState({
    routeId: "",
    routeType: "roundTrip",
    oneWayDirection: "morning", // "morning", "midday", or "afternoon"
    dropoffLocation: "school", // "school" or "home"
    routeDescription: "",
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
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  // Partner data from screenshot
  const partners = [
    { id: "abc-transport", name: "ABC Transportation" },
    { id: "city-bus", name: "City Bus Services" },
    { id: "metro-transit", name: "Metro Transit Co." },
    { id: "safe-ride", name: "Safe Ride Partners" }
  ];

  // Student data based on campus
  const getStudentsForCampus = (campus) => {
    switch (campus) {
      case "west-campus":
        return [
          { id: "student-1", name: "Abigail King" },
          { id: "student-2", name: "Henry Wright" },
          { id: "student-3", name: "Ella Lopez" },
          { id: "student-4", name: "Jackson Scott" }
        ];
      case "east-campus":
        return [
          { id: "student-5", name: "Emma Johnson" },
          { id: "student-6", name: "Liam Davis" },
          { id: "student-7", name: "Olivia Wilson" },
          { id: "student-8", name: "Noah Brown" }
        ];
      case "main-campus":
        return [
          { id: "student-9", name: "Sophia Miller" },
          { id: "student-10", name: "William Garcia" },
          { id: "student-11", name: "Isabella Rodriguez" },
          { id: "student-12", name: "James Martinez" }
        ];
      case "north-campus":
        return [
          { id: "student-13", name: "Charlotte Anderson" },
          { id: "student-14", name: "Benjamin Taylor" },
          { id: "student-15", name: "Amelia Thomas" },
          { id: "student-16", name: "Lucas Hernandez" }
        ];
      case "south-campus":
        return [
          { id: "student-17", name: "Harper Moore" },
          { id: "student-18", name: "Mason Jackson" },
          { id: "student-19", name: "Evelyn Martin" },
          { id: "student-20", name: "Logan Lee" }
        ];
      case "central-campus":
        return [
          { id: "student-21", name: "Aria Perez" },
          { id: "student-22", name: "Alexander Thompson" },
          { id: "student-23", name: "Luna White" },
          { id: "student-24", name: "Sebastian Harris" }
        ];
      default:
        return [];
    }
  };

  const availableStudents = getStudentsForCampus(formData.campus);
  const filteredStudents = availableStudents.filter(student =>
    student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) &&
    !selectedStudents.find(selected => selected.id === student.id)
  );

  const handleStudentSelect = (student) => {
    setSelectedStudents(prev => [...prev, student]);
    setShowStudentDropdown(false);
    setStudentSearchQuery("");
  };

  const handleStudentRemove = (studentId) => {
    setSelectedStudents(prev => prev.filter(student => student.id !== studentId));
  };

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

    // Close student dropdown if clicking outside
    if (showStudentDropdown && !event.target.closest('.student-dropdown')) {
      setShowStudentDropdown(false);
      setStudentSearchQuery("");
    }
  };

  // Add event listener for click outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPartnerDropdown, showDriverDropdown, showStudentDropdown]);
  
  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(partnerSearchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  const tabs = ["Basic Info", "Schedule", "Additional Stops", "Monitor", "Driver", "Payment"];

    const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">Route ID</label>
        <Input
          type="text"
          placeholder="Enter route ID"
          value={formData.routeId}
          onChange={(e) => setFormData(prev => ({ ...prev, routeId: e.target.value }))}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[var(--primary-black)] mb-3">Route Type</label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input 
              type="radio" 
              name="routeType" 
              value="roundTrip"
              checked={formData.routeType === "roundTrip"}
              onChange={(e) => setFormData(prev => ({ ...prev, routeType: e.target.value }))}
              className="mr-2 h-4 w-4 text-[var(--primary)]" 
            />
            <span className="font-medium">Round Trip Route</span>
          </label>
          <label className="flex items-center">
            <input 
              type="radio" 
              name="routeType" 
              value="oneWay"
              checked={formData.routeType === "oneWay"}
              onChange={(e) => setFormData(prev => ({ ...prev, routeType: e.target.value }))}
              className="mr-2 h-4 w-4 text-[var(--primary)]" 
            />
            <span className="font-medium">One Way Route</span>
          </label>
        </div>
      </div>

      {/* Round Trip Details - Only shown when roundTrip is selected */}
      {formData.routeType === "roundTrip" && (
        <div>
          <h3 className="text-lg font-medium text-[var(--primary-black)] mb-3">Round Trip Routes</h3>
          <div className="space-y-4">
            {/* Top Row - Route Optimization */}
            <div className="bg-[var(--amber-100)] border border-[var(--amber-200)] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
              <h4 className="font-medium text-[var(--amber-900)]">Route Optimization</h4>
              <span className="inline-block bg-[var(--amber-200)] text-[var(--amber-800)] text-xs px-2 py-1 rounded mt-1">Auto-Generated</span>
              <p className="text-sm text-[var(--amber-700)] mt-2">The system will automatically calculate the most efficient route order for both morning and afternoon trips to minimize travel time and distance.</p>
            </div>
            
            {/* Bottom Row - Morning and Afternoon Routes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[var(--blue-100)] border border-[var(--blue-200)] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
                <h4 className="font-medium text-[var(--blue-900)]">Morning Route</h4>
                <span className="inline-block bg-[var(--blue-200)] text-[var(--blue-800)] text-xs px-2 py-1 rounded mt-1">Home → School</span>
                <p className="text-sm text-[var(--blue-700)] mt-2">Pick up students from addresses and drop off at campus</p>
              </div>
              <div className="bg-[var(--green-100)] border border-[var(--green-200)] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
                <h4 className="font-medium text-[var(--green-900)]">Afternoon Route</h4>
                <span className="inline-block bg-[var(--green-200)] text-[var(--green-800)] text-xs px-2 py-1 rounded mt-1">School → Home</span>
                <p className="text-sm text-[var(--green-700)] mt-2">Pick up students from campus and drop off at addresses</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* One Way Direction Selection - Only shown when oneWay is selected */}
      {formData.routeType === "oneWay" && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-3">Route Direction</label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="oneWayDirection" 
                  value="morning"
                  checked={formData.oneWayDirection === "morning"}
                  onChange={(e) => setFormData(prev => ({ ...prev, oneWayDirection: e.target.value }))}
                  className="mr-2 h-4 w-4 text-[var(--primary)]" 
                />
                <span className="font-medium">Morning Route</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="oneWayDirection" 
                  value="midday"
                  checked={formData.oneWayDirection === "midday"}
                  onChange={(e) => setFormData(prev => ({ ...prev, oneWayDirection: e.target.value }))}
                  className="mr-2 h-4 w-4 text-[var(--primary)]" 
                />
                <span className="font-medium">Midday Route</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="oneWayDirection" 
                  value="afternoon"
                  checked={formData.oneWayDirection === "afternoon"}
                  onChange={(e) => setFormData(prev => ({ ...prev, oneWayDirection: e.target.value }))}
                  className="mr-2 h-4 w-4 text-[var(--primary)]" 
                />
                <span className="font-medium">Afternoon Route</span>
              </label>
            </div>
          </div>

          {/* Drop-off Location Section - Only show for Midday Route */}
          {formData.oneWayDirection === "midday" && (
            <div>
              <label className="block text-sm font-medium text-[var(--primary-black)] mb-3">Drop-off Location</label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="dropoffLocation" 
                    value="school"
                    checked={formData.dropoffLocation === "school"}
                    onChange={(e) => setFormData(prev => ({ ...prev, dropoffLocation: e.target.value }))}
                    className="mr-2 h-4 w-4 text-[var(--primary)]" 
                  />
                  <span className="font-medium">Drop off at School</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="dropoffLocation" 
                    value="home"
                    checked={formData.dropoffLocation === "home"}
                    onChange={(e) => setFormData(prev => ({ ...prev, dropoffLocation: e.target.value }))}
                    className="mr-2 h-4 w-4 text-[var(--primary)]" 
                  />
                  <span className="font-medium">Drop off at Home</span>
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">Route Description</label>
        <Input
          as="textarea"
          rows={3}
          value={formData.routeDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, routeDescription: e.target.value }))}
          placeholder={
            formData.routeType === "roundTrip" 
              ? "Round trip route with automatic morning and afternoon scheduling" 
              : formData.oneWayDirection === "morning"
                ? "Pick up students from their addresses and drop off at school"
                : formData.oneWayDirection === "afternoon"
                  ? "Pick up students from school and drop off at their addresses"
                  : formData.dropoffLocation === "school"
                    ? "Pick up students from their addresses and drop off at school"
                    : "Pick up students from school and drop off at their addresses"
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">District</label>
          <Select
            value={formData.district}
            onChange={(value) => {
              setFormData(prev => ({ ...prev, district: value, campus: "" }));
              setSelectedStudents([]);
            }}
            options={[
              { value: "", label: "Select district" },
              { value: "86022-Z", label: "86022-Z" },
              { value: "75044-A", label: "75044-A" }
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">Campus</label>
          <Select
            value={formData.campus}
            onChange={(value) => {
              setFormData(prev => ({ ...prev, campus: value }));
              setSelectedStudents([]);
            }}
            disabled={!formData.district}
            options={[
              { value: "", label: formData.district ? "Select a campus" : "Select a district first" },
              ...(formData.district === "86022-Z" ? [
                { value: "west-campus", label: "West Campus" },
                { value: "east-campus", label: "East Campus" },
                { value: "main-campus", label: "Main Campus" }
              ] : []),
              ...(formData.district === "75044-A" ? [
                { value: "north-campus", label: "North Campus" },
                { value: "south-campus", label: "South Campus" },
                { value: "central-campus", label: "Central Campus" }
              ] : [])
            ]}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-[var(--primary-black)]">Students</label>
          <Button 
            variant="primary" 
            className="flex items-center gap-2 text-sm"
            disabled={!formData.campus}
          >
            <Plus size={16} />
            Add a Student
          </Button>
        </div>
        
        {formData.campus ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">Select Students</label>
              <div className="relative student-dropdown">
                <button
                  type="button"
                  className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md text-left focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white flex items-center justify-between"
                  onClick={() => setShowStudentDropdown(!showStudentDropdown)}
                >
                  <span className="text-[var(--muted-text)]">Search and select students</span>
                  <ChevronDown size={16} className="text-[var(--gray-400)]" />
                </button>
                
                {showStudentDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    {/* Search Bar */}
                    <div className="p-3 border-b border-gray-200">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search search and select students"
                          value={studentSearchQuery}
                          onChange={(e) => setStudentSearchQuery(e.target.value)}
                          className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Student List */}
                    <div className="max-h-48 overflow-y-auto">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <button
                            key={student.id}
                            type="button"
                            onClick={() => handleStudentSelect(student)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-sm"
                          >
                            {student.name}
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          No students found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Selected Students Display */}
            {selectedStudents.length > 0 && (
              <div className="border border-gray-200 rounded-md p-3">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Selected Students ({selectedStudents.length})</h4>
                <div className="space-y-1">
                  {selectedStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between py-1">
                      <span className="text-sm text-gray-700">{student.name}</span>
                      <button
                        type="button"
                        onClick={() => handleStudentRemove(student.id)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="border border-gray-300 rounded-md p-4 min-h-[100px] bg-gray-50">
            <p className="text-gray-500 text-sm">
              {formData.district ? "Select a campus to add students." : "Select a district and campus to add students."}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
             <div>
         <label className="block text-sm font-medium text-[var(--primary-black)] mb-3">Operating Days</label>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
              <div key={day} className="flex items-center p-3 border border-[var(--gray-200)] rounded-lg hover:bg-[var(--gray-50)] cursor-pointer transition-all duration-200">
                <Toggle
                  checked={operatingDays[day]}
                  onChange={(checked) => {
                    setOperatingDays(prev => ({
                      ...prev,
                      [day]: checked
                    }));
                  }}
                  className="mr-3"
                />
                <span className="text-sm font-medium text-[var(--primary-black)]">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </span>
              </div>
            ))}
          </div>
       </div>

      <div>
        <label className="block text-sm font-medium text-[var(--primary-black)] mb-3">Effective Date Range</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[var(--muted-text)] mb-1">Start Date *</label>
            <div className="relative">
              <Input
                type="text"
                defaultValue="08/13/2025"
              />
              <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--gray-400)]" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-[var(--muted-text)] mb-1">End Date</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Select end date"
              />
              <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--gray-400)]" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--primary-black)] mb-3">Default Times</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-xs text-[var(--muted-text)] mb-1">Default Pickup Time</label>
            <div className="relative">
              <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--gray-400)]" />
              <Input
                type="time"
                defaultValue="07:30"
                className="pl-10"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-xs text-[var(--muted-text)] mb-1">Default Dropoff Time</label>
            <div className="relative">
              <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--gray-400)]" />
              <Input
                type="time"
                defaultValue="15:30"
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">Schedule Exceptions</label>
        <p className="text-xs text-[var(--muted-text)] mb-3">Add dates when rides should not run (holidays, teacher work days, etc.)</p>
        
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <label className="block text-xs text-[var(--muted-text)] mb-1">Select Dates</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Select dates"
                />
                <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--gray-400)]" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[var(--muted-text)] mb-1">Exception Type</label>
              <Select
                value="No School"
                onChange={(value) => console.log(value)}
                options={[
                  { value: "No School", label: "No School" },
                  { value: "Holiday", label: "Holiday" },
                  { value: "Teacher Work Day", label: "Teacher Work Day" }
                ]}
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted-text)] mb-1">Description</label>
              <Input
                type="text"
                placeholder="e.g., Teacher In-service Day, Early Release, etc."
              />
            </div>
          </div>
          <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white flex items-center gap-2 text-sm">
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
                       className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                       readOnly
                     />
                   </div>
                   <div className="flex-1">
                     <label className="block text-xs text-gray-600 mb-1">Address</label>
                     <input
                       type="text"
                       value={stop.address}
                       placeholder="Enter full address"
                       className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
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
                       className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                     />
                   </div>
                   <div className="flex-1">
                     <label className="block text-xs text-gray-600 mb-1">Address</label>
                     <input
                       type="text"
                       value={newStop.address}
                       onChange={(e) => setNewStop(prev => ({ ...prev, address: e.target.value }))}
                       placeholder="Enter full address"
                       className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="monitor@email.com" 
                  className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Drop Off Address (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Enter monitor's drop off address" 
                  className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" 
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
                  className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Pickup Address *</label>
                <input 
                  type="text" 
                  placeholder="Enter monitor's pickup address" 
                  className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" 
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
              <Route className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--primary-black)]">Add New Route</h2>
              <p className="text-[var(--muted-text)]">Create a new route configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
          >
            <X className="w-6 h-6 text-[var(--gray-500)]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mt-2 ml-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-3 font-medium cursor-pointer transition-all duration-200 hover:opacity-90 rounded-lg"
              style={{
                backgroundColor: activeTab === tab ? 'var(--primary)' : 'var(--gray-100)',
                color: activeTab === tab ? 'var(--on-primary)' : 'var(--muted-text)',
                borderBottom: activeTab === tab ? '2px solid var(--primary)' : 'none',
                marginRight: '4px',
                fontSize: '14px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-[var(--gray-200)]">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white flex items-center gap-2">
            <Route className="w-4 h-4" />
            Create Route
          </Button>
        </div>
      </div>
    </div>
  );
}
