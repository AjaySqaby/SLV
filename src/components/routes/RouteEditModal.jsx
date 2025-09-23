"use client";

import { useState } from 'react';
import { X, MapPin, Clock, User, Car, Calendar, Map, Save, Plus, Trash2 } from 'lucide-react';
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

  if (!isOpen) return null;

  const tabs = [
    { id: 0, label: "Basic Info" },
    { id: 1, label: "Route Stops" },
    { id: 2, label: "Schedule" },
    { id: 3, label: "Assignment" }
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
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Route Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Route Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter route name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District
            </label>
            <Input
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              placeholder="Enter district code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Route ID
            </label>
            <Input
              value={routeId || "RT-30842"}
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Route Statistics</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600">Stops</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">12.4</div>
            <div className="text-sm text-gray-600">Miles</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">7</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">25</div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderRouteStops = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Route Stops</h3>
        <Button
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Stop
        </Button>
      </div>

      {[1, 2, 3, 4, 5].map((stopId) => (
        <Card key={stopId} className="p-6">
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
              stopId <= 4 ? 'bg-green-500' : 'bg-orange-500'
            }`}>
              {stopId}
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <Input
                  placeholder="Enter stop address"
                  defaultValue={stopId <= 4 ? `Stop ${stopId} Address` : "School Drop-off"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <Select
                  value={stopId <= 4 ? "pickup" : "dropoff"}
                  options={[
                    { value: "pickup", label: "Pickup" },
                    { value: "dropoff", label: "Drop-off" }
                  ]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <Input
                  type="time"
                  defaultValue={stopId <= 4 ? `08:${(stopId-1)*5}` : "08:25"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Students
                </label>
                <Input
                  type="number"
                  defaultValue={stopId <= 4 ? (stopId === 1 ? 2 : 1) : 7}
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
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
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Route Schedule</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <Input
              type="time"
              value={formData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <Input
              type="time"
              value={formData.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
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

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Route Duration</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">25</div>
            <div className="text-sm text-gray-600">Total Minutes</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">20</div>
            <div className="text-sm text-gray-600">Travel Time</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">5</div>
            <div className="text-sm text-gray-600">Stop Time</div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAssignment = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Driver Assignment</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
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
        <div className="text-sm text-gray-600">
          <p>Rating: 4.9/5.0</p>
          <p>Experience: 3 years</p>
          <p>Status: Available</p>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Vehicle Assignment</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Car className="w-6 h-6 text-green-600" />
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
        <div className="text-sm text-gray-600">
          <p>Vehicle ID: RT-30845</p>
          <p>Capacity: 8 passengers</p>
          <p>Status: Available</p>
        </div>
      </Card>
    </div>
  );

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
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Edit Route #{routeId || "RT-30842"}</h2>
              <p className="text-gray-600">Modify route details and configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 0 && renderBasicInfo()}
          {activeTab === 1 && renderRouteStops()}
          {activeTab === 2 && renderSchedule()}
          {activeTab === 3 && renderAssignment()}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
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
