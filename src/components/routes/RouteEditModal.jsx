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

  if (!isOpen) return null;

  const tabs = [
    { id: 0, label: "Basic Info" },
    { id: 1, label: "Route Stops" },
    { id: 2, label: "Schedule" },
    { id: 3, label: "Assignment" },
    { id: 4, label: "Exceptions" }
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

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4 text-[var(--primary-black)]">Route Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
              Route Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter route name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
              District
            </label>
            <Input
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              placeholder="Enter district code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
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
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
              Route ID
            </label>
            <Input
              value={routeId || "RT-30842"}
              disabled
              className="bg-[var(--gray-100)]"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-[var(--primary-black)]">Route Statistics</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-[var(--blue-100)] rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-2xl font-bold text-[var(--blue-600)]">5</div>
            <div className="text-sm text-[var(--muted-text)]">Stops</div>
          </div>
          <div className="text-center p-4 bg-[var(--green-100)] rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-2xl font-bold text-[var(--green-600)]">12.4</div>
            <div className="text-sm text-[var(--muted-text)]">Miles</div>
          </div>
          <div className="text-center p-4 bg-[var(--purple-100)] rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-2xl font-bold text-[var(--purple-600)]">7</div>
            <div className="text-sm text-[var(--muted-text)]">Students</div>
          </div>
          <div className="text-center p-4 bg-[var(--amber-100)] rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-2xl font-bold text-[var(--amber-600)]">25</div>
            <div className="text-sm text-[var(--muted-text)]">Minutes</div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderRouteStops = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[var(--primary-black)]">Route Stops</h3>
        <Button
          variant="secondary"
          className="flex items-center gap-2 hover:bg-[var(--purple)] hover:text-white hover:border-[var(--purple)] transition-all duration-200"
          onClick={() => setStops(prev => [...prev, { address: '', type: 'pickup', time: '08:30', students: 1 }])}
        >
          <Plus className="w-4 h-4" />
          Add Stop
        </Button>
      </div>

      {stops.map((stop, index) => (
        <Card key={index} className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
              stop.type === 'dropoff' ? 'bg-[var(--orange)]' : 'bg-[var(--green)]'
            }`}>
              {index + 1}
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
                  Address
                </label>
                <Input
                  placeholder="Enter stop address"
                  value={stop.address}
                  onChange={(e)=> setStops(prev => prev.map((s,i)=> i===index ? { ...s, address: e.target.value } : s))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
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
                <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
                  Time
                </label>
                <Input
                  type="time"
                  value={stop.time}
                  onChange={(e)=> setStops(prev => prev.map((s,i)=> i===index ? { ...s, time: e.target.value } : s))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
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
              className="text-[var(--red-600)] hover:text-[var(--red-800)] hover:bg-[var(--red-100)] transition-all duration-200"
              onClick={() => setStops(prev => prev.filter((_,i)=> i!==index))}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4 text-[var(--primary-black)]">Route Schedule</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
              Start Time
            </label>
            <Input
              type="time"
              value={formData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
              End Time
            </label>
            <Input
              type="time"
              value={formData.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
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
        <h3 className="text-lg font-semibold mb-4 text-[var(--primary-black)]">Route Duration</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-[var(--blue-100)] rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-2xl font-bold text-[var(--blue-600)]">25</div>
            <div className="text-sm text-[var(--muted-text)]">Total Minutes</div>
          </div>
          <div className="text-center p-4 bg-[var(--green-100)] rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-2xl font-bold text-[var(--green-600)]">20</div>
            <div className="text-sm text-[var(--muted-text)]">Travel Time</div>
          </div>
          <div className="text-center p-4 bg-[var(--amber-100)] rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-2xl font-bold text-[var(--amber-600)]">5</div>
            <div className="text-sm text-[var(--muted-text)]">Stop Time</div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAssignment = () => (
    <div className="space-y-6">
      <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4 text-[var(--primary-black)]">Driver Assignment</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-[var(--blue-600)]" />
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
        <div className="text-sm text-[var(--muted-text)]">
          <p>Rating: 4.9/5.0</p>
          <p>Experience: 3 years</p>
          <p>Status: Available</p>
        </div>
      </Card>

      <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4 text-[var(--primary-black)]">Vehicle Assignment</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[var(--green-100)] rounded-full flex items-center justify-center">
            <Car className="w-6 h-6 text-[var(--green-600)]" />
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
        <div className="text-sm text-[var(--muted-text)]">
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
        <h3 className="text-lg font-semibold mb-4 text-[var(--primary-black)]">Exceptions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">Date</label>
            <Input type="date" value={exceptionDate} onChange={(e)=>setExceptionDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">Type</label>
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
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">Notes</label>
            <Input type="text" value={exceptionNotes} onChange={(e)=>setExceptionNotes(e.target.value)} placeholder="Optional" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button className="flex items-center gap-2" onClick={addException}>
            <Plus className="w-4 h-4" />
            Add Exception
          </Button>
        </div>
      </Card>

      {exceptions.length > 0 && (
        <Card className="p-0 overflow-hidden">
          <div className="divide-y" style={{ borderColor: 'var(--gray-200)' }}>
            {exceptions.map((ex, idx) => (
              <div key={idx} className="flex items-center justify-between p-4">
                <div>
                  <div className="font-medium text-[var(--primary-black)]">{ex.date} • {ex.type}</div>
                  {ex.notes && <div className="text-sm text-[var(--muted-text)]">{ex.notes}</div>}
                </div>
                <Button variant="ghost" size="sm" className="text-[var(--red-600)] hover:text-[var(--red-800)] hover:bg-[var(--red-100)]" onClick={()=>removeException(idx)}>
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
        <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
              <Route className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--primary-black)]">Edit Route #{routeId || "RT-30842"}</h2>
              <p className="text-[var(--muted-text)]">Modify route details and configuration</p>
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
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 font-medium cursor-pointer transition-all duration-200 hover:opacity-90 rounded-lg"
              style={{
                backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--gray-100)',
                color: activeTab === tab.id ? 'var(--on-primary)' : 'var(--muted-text)',
                borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : 'none',
                marginRight: '4px',
                fontSize: '14px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 0 && renderBasicInfo()}
          {activeTab === 1 && renderRouteStops()}
          {activeTab === 2 && renderSchedule()}
          {activeTab === 3 && renderAssignment()}
          {activeTab === 4 && renderExceptions()}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-[var(--gray-200)] sticky bottom-0 bg-white">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white flex items-center gap-2"
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
