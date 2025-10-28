"use client";

import { useState } from 'react';
import { X, MapPin, Clock, User, Car, Calendar, Map, Save, Plus, Trash2, Route, Star, CheckCircle, Users, Navigation } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import StatusBadge from '@/components/ui/StatusBadge';

export default function RouteEditModal({ isOpen, onClose, routeId }) {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "North District Route",
    district: "86022-Z",
    status: "Active",
    driver: "Sam Kebede",
    vehicle: "Toyota Sienna",
    startTime: "8:00 AM",
    endTime: "8:25 AM"
  });
  const [exceptions, setExceptions] = useState([]);
  const [exceptionDate, setExceptionDate] = useState("");
  const [exceptionType, setExceptionType] = useState("No School");
  const [exceptionNotes, setExceptionNotes] = useState("");
  const [stops, setStops] = useState([
    { address: 'Stop 1 Address', type: 'pickup', time: '08:00', students: 2 },
    { address: 'Stop 2 Address', type: 'pickup', time: '08:05', students: 1 },
    { address: 'Stop 3 Address', type: 'pickup', time: '08:10', students: 1 },
    { address: 'Stop 4 Address', type: 'pickup', time: '08:15', students: 1 },
    { address: 'School Drop-off', type: 'dropoff', time: '08:25', students: 7 }
  ]);

  // Students management state
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', grade: '5th', address: '123 Main St', pickupTime: '08:00', stopId: 0 },
    { id: 2, name: 'Jane Smith', grade: '4th', address: '456 Oak Ave', pickupTime: '08:00', stopId: 0 },
    { id: 3, name: 'Mike Johnson', grade: '6th', address: '789 Pine Rd', pickupTime: '08:05', stopId: 1 },
    { id: 4, name: 'Sarah Wilson', grade: '5th', address: '321 Elm St', pickupTime: '08:10', stopId: 2 },
    { id: 5, name: 'Tom Brown', grade: '4th', address: '654 Maple Dr', pickupTime: '08:15', stopId: 3 },
    { id: 6, name: 'Lisa Davis', grade: '6th', address: '987 Cedar Ln', pickupTime: '08:15', stopId: 3 },
    { id: 7, name: 'Alex Miller', grade: '5th', address: '147 Birch Way', pickupTime: '08:15', stopId: 3 }
  ]);

  if (!isOpen) return null;

  const tabs = [
    { id: 0, label: "Basic Info" },
    { id: 1, label: "Route Stops" },
    { id: 2, label: "Students" },
    { id: 3, label: "Schedule" },
    { id: 4, label: "Assignment" },
    { id: 5, label: "Exceptions" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save logic here
    console.log('Saving route:', formData);
    onClose();
  };

  // Student management functions
  const addStudent = () => {
    const newStudent = {
      id: Math.max(...students.map(s => s.id)) + 1,
      name: '',
      grade: '',
      address: '',
      pickupTime: '08:00',
      stopId: 0
    };
    setStudents(prev => [newStudent, ...prev]); // Add at the beginning instead of end
  };

  const updateStudent = (id, field, value) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...student, [field]: value } : student
    ));
  };

  const removeStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#111827' }}>Route Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
              Route Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter route name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
              District
            </label>
            <Input
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              placeholder="Enter district code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
              Status
            </label>
            <Select
              value={formData.status}
              onChange={(value) => handleInputChange('status', value)}
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" }
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
              Route ID
            </label>
            <Input
              value={routeId || "RT-30842"}
              disabled
              className="bg-gray-100"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#111827' }}>Route Statistics</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200" style={{ backgroundColor: '#dbeafe' }}>
            <div className="text-2xl font-bold" style={{ color: '#1d4ed8' }}>5</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Stops</div>
          </div>
          <div className="text-center p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200" style={{ backgroundColor: '#dcfce7' }}>
            <div className="text-2xl font-bold" style={{ color: '#166534' }}>12.4</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Miles</div>
          </div>
          <div className="text-center p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200" style={{ backgroundColor: '#f3e8ff' }}>
            <div className="text-2xl font-bold" style={{ color: '#7c3aed' }}>7</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Students</div>
          </div>
          <div className="text-center p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200" style={{ backgroundColor: '#fef3c7' }}>
            <div className="text-2xl font-bold" style={{ color: '#d97706' }}>25</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Minutes</div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderRouteStops = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold" style={{ color: '#111827' }}>Route Stops & Map</h3>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="flex items-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200"
            onClick={() => setStops(prev => [...prev, { address: '', type: 'pickup', time: '08:30', students: 1 }])}
          >
            <Plus className="w-4 h-4" />
            Add Stop
          </Button>
          <Button
            variant="secondary"
            className="flex items-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            <Map className="w-4 h-4" />
            View Map
          </Button>
        </div>
      </div>

      {/* Map Preview */}
      <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h4 className="text-md font-semibold mb-4" style={{ color: '#111827' }}>Route Map Preview</h4>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-200 relative overflow-hidden">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
          </div>

          {/* Route Line */}
          <div className="absolute inset-0">
            <svg className="w-full h-full">
              <path
                d="M 50 50 Q 150 100 250 80 Q 350 60 450 120"
                stroke="#3b82f6"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>
          </div>

          {/* Stop Markers */}
          {stops.map((stop, index) => (
            <div
              key={index}
              className="absolute w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg"
              style={{
                backgroundColor: stop.type === 'dropoff' ? '#f97316' : '#10b981',
                top: `${20 + (index * 15)}%`,
                left: `${10 + (index * 20)}%`
              }}
            >
              {index + 1}
            </div>
          ))}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="bg-white px-3 py-2 rounded-lg shadow-md text-xs font-medium text-gray-700 border border-gray-200 hover:bg-gray-50">
              Edit Route
            </button>
            <button className="bg-white px-3 py-2 rounded-lg shadow-md text-xs font-medium text-gray-700 border border-gray-200 hover:bg-gray-50">
              Optimize
            </button>
          </div>
        </div>
      </Card>

      {stops.map((stop, index) => (
        <Card key={index} className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start gap-4">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: stop.type === 'dropoff' ? '#f97316' : '#10b981' }}
            >
              {index + 1}
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Address/Location
                </label>
                <Input
                  placeholder="Enter stop address or location"
                  value={stop.address}
                  onChange={(e)=> setStops(prev => prev.map((s,i)=> i===index ? { ...s, address: e.target.value } : s))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Type
                </label>
                <Select
                  value={stop.type}
                  onChange={(value)=> setStops(prev => prev.map((s,i)=> i===index ? { ...s, type: value } : s))}
                  options={[
                    { value: "pickup", label: "Pickup" },
                    { value: "dropoff", label: "Drop-off" }
                  ]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Time
                </label>
                <Input
                  type="time"
                  value={stop.time}
                  onChange={(e)=> setStops(prev => prev.map((s,i)=> i===index ? { ...s, time: e.target.value } : s))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Students
                </label>
                <Input
                  type="number"
                  value={stop.students}
                  onChange={(e)=> setStops(prev => prev.map((s,i)=> i===index ? { ...s, students: Number(e.target.value) } : s))}
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-800 hover:bg-red-100 transition-all duration-200"
              onClick={() => setStops(prev => prev.filter((_,i)=> i!==index))}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold" style={{ color: '#111827' }}>Students Management</h3>
        <Button
          variant="secondary"
          className="flex items-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200"
          onClick={addStudent}
        >
          <Plus className="w-4 h-4" />
          Add Student
        </Button>
      </div>

      {students.map((student) => (
        <Card key={student.id} className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold bg-blue-500">
              {student.id}
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Student Name
                </label>
                <Input
                  placeholder="Enter student name"
                  value={student.name}
                  onChange={(e) => updateStudent(student.id, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Grade
                </label>
                <Select
                  value={student.grade}
                  onChange={(value) => updateStudent(student.id, 'grade', value)}
                  options={[
                    { value: "1st", label: "1st Grade" },
                    { value: "2nd", label: "2nd Grade" },
                    { value: "3rd", label: "3rd Grade" },
                    { value: "4th", label: "4th Grade" },
                    { value: "5th", label: "5th Grade" },
                    { value: "6th", label: "6th Grade" },
                    { value: "7th", label: "7th Grade" },
                    { value: "8th", label: "8th Grade" }
                  ]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Address
                </label>
                <Input
                  placeholder="Enter student address"
                  value={student.address}
                  onChange={(e) => updateStudent(student.id, 'address', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Pickup Time
                </label>
                <Input
                  type="time"
                  value={student.pickupTime}
                  onChange={(e) => updateStudent(student.id, 'pickupTime', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Assigned Stop
                </label>
                <Select
                  value={student.stopId}
                  onChange={(value) => updateStudent(student.id, 'stopId', Number(value))}
                  options={stops.map((stop, index) => ({
                    value: index,
                    label: `Stop ${index + 1}: ${stop.address}`
                  }))}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-800 hover:bg-red-100 transition-all duration-200"
                onClick={() => removeStudent(student.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#111827' }}>Route Schedule</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
              Start Time
            </label>
            <Input
              type="time"
              value={formData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
              End Time
            </label>
            <Input
              type="time"
              value={formData.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
              Operating Days
            </label>
            <div className="flex gap-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <label key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mr-2"
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#111827' }}>Route Duration</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200" style={{ backgroundColor: '#dbeafe' }}>
            <div className="text-2xl font-bold" style={{ color: '#1d4ed8' }}>25</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Total Minutes</div>
          </div>
          <div className="text-center p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200" style={{ backgroundColor: '#dcfce7' }}>
            <div className="text-2xl font-bold" style={{ color: '#166534' }}>20</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Travel Time</div>
          </div>
          <div className="text-center p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200" style={{ backgroundColor: '#fef3c7' }}>
            <div className="text-2xl font-bold" style={{ color: '#d97706' }}>5</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Stop Time</div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAssignment = () => (
    <div className="space-y-6">
      <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#111827' }}>Driver Assignment</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dbeafe' }}>
            <User className="w-6 h-6" style={{ color: '#1d4ed8' }} />
          </div>
          <div className="flex-1">
            <Select
              value={formData.driver}
              onChange={(value) => handleInputChange('driver', value)}
              options={[
                { value: "Sam Kebede", label: "Sam Kebede" },
                { value: "John Doe", label: "John Doe" },
                { value: "Jane Smith", label: "Jane Smith" }
              ]}
            />
          </div>
        </div>
        <div className="text-sm" style={{ color: '#6b7280' }}>
          <p>Rating: 4.9/5.0</p>
          <p>Experience: 3 years</p>
          <p>Status: Available</p>
        </div>
      </Card>

      <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#111827' }}>Vehicle Assignment</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dcfce7' }}>
            <Car className="w-6 h-6" style={{ color: '#166534' }} />
          </div>
          <div className="flex-1">
            <Select
              value={formData.vehicle}
              onChange={(value) => handleInputChange('vehicle', value)}
              options={[
                { value: "Toyota Sienna", label: "Toyota Sienna" },
                { value: "Honda Odyssey", label: "Honda Odyssey" },
                { value: "Ford Transit", label: "Ford Transit" }
              ]}
            />
          </div>
        </div>
        <div className="text-sm" style={{ color: '#6b7280' }}>
          <p>Vehicle ID: RT-30845</p>
          <p>Capacity: 8 passengers</p>
          <p>Status: Available</p>
        </div>
      </Card>
    </div>
  );

  const addException = () => {
    if (!exceptionDate || !exceptionType) return;
    setExceptions(prev => [...prev, { date: exceptionDate, type: exceptionType, notes: exceptionNotes }]);
    setExceptionDate("");
    setExceptionType("No School");
    setExceptionNotes("");
  };

  const removeException = (idx) => {
    setExceptions(prev => prev.filter((_, i) => i !== idx));
  };

  const renderExceptions = () => (
    <div className="space-y-6">
      <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#111827' }}>Exceptions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>Date</label>
            <Input type="date" value={exceptionDate} onChange={(e)=>setExceptionDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>Type</label>
            <Select
              value={exceptionType}
              onChange={(e)=>setExceptionType(e.target.value)}
              options={[
                { value: "No School", label: "No School" },
                { value: "Holiday", label: "Holiday" },
                { value: "Teacher Work Day", label: "Teacher Work Day" },
                { value: "Weather", label: "Weather" },
                { value: "Other", label: "Other" },
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>Notes</label>
            <Input type="text" value={exceptionNotes} onChange={(e)=>setExceptionNotes(e.target.value)} placeholder="Optional" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button 
            className="flex items-center gap-2 text-white"
            style={{ backgroundColor: '#8b5cf6' }}
            onClick={addException}
          >
            <Plus className="w-4 h-4" />
            Add Exception
          </Button>
        </div>
      </Card>

      {exceptions.length > 0 && (
        <Card className="p-0 overflow-hidden">
          <div className="divide-y" style={{ borderColor: '#e5e7eb' }}>
            {exceptions.map((ex, idx) => (
              <div key={idx} className="flex items-center justify-between p-4">
                <div>
                  <div className="font-medium" style={{ color: '#111827' }}>{ex.date} • {ex.type}</div>
                  {ex.notes && <div className="text-sm" style={{ color: '#6b7280' }}>{ex.notes}</div>}
                </div>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-100" onClick={()=>removeException(idx)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#e5e7eb' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#8b5cf6' }}>
              <Route className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>Edit Route #{routeId || "RT-30842"}</h2>
              <p style={{ color: '#6b7280' }}>Modify route details and configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" style={{ color: '#6b7280' }} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 mt-2 ml-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: activeTab === tab.id ? '#8b5cf6' : '#f3f4f6',
                color: activeTab === tab.id ? '#ffffff' : '#6b7280',
                border: activeTab === tab.id ? 'none' : '1px solid #e5e7eb',
                borderRadius: '12px'
              }}
            >
              {tab.id === 0 && <Route className="w-4 h-4" />}
              {tab.id === 1 && <MapPin className="w-4 h-4" />}
              {tab.id === 2 && <Users className="w-4 h-4" />}
              {tab.id === 3 && <Clock className="w-4 h-4" />}
              {tab.id === 4 && <User className="w-4 h-4" />}
              {tab.id === 5 && <Calendar className="w-4 h-4" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 0 && renderBasicInfo()}
          {activeTab === 1 && renderRouteStops()}
          {activeTab === 2 && renderStudents()}
          {activeTab === 3 && renderSchedule()}
          {activeTab === 4 && renderAssignment()}
          {activeTab === 5 && renderExceptions()}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t sticky bottom-0 bg-white" style={{ borderColor: '#e5e7eb' }}>
          <Button
            variant="secondary"
            onClick={onClose}
            className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            className="flex items-center gap-2 text-white"
            style={{ backgroundColor: '#8b5cf6' }}
            onClick={handleSave}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
