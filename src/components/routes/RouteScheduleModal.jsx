"use client";

import { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, Save, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

export default function RouteScheduleModal({ isOpen, onClose, route }) {
  const [scheduleData, setScheduleData] = useState({
    date: '',
    startTime: '08:00',
    endTime: '08:25',
    driver: route?.driver || 'Sam Kebede',
    vehicle: 'Toyota Sienna',
    repeatType: 'once',
    repeatDays: [],
    maxStudents: 8,
    notes: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setScheduleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save schedule logic here
    console.log('Saving schedule:', scheduleData);
    onClose();
  };

  const repeatOptions = [
    { value: 'once', label: 'One Time Only' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'weekdays', label: 'Weekdays Only' },
    { value: 'custom', label: 'Custom Schedule' }
  ];

  const driverOptions = [
    { value: 'Sam Kebede', label: 'Sam Kebede' },
    { value: 'John Doe', label: 'John Doe' },
    { value: 'Jane Smith', label: 'Jane Smith' }
  ];

  const vehicleOptions = [
    { value: 'Toyota Sienna', label: 'Toyota Sienna' },
    { value: 'Honda Odyssey', label: 'Honda Odyssey' },
    { value: 'Ford Transit', label: 'Ford Transit' }
  ];

  const weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

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
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Schedule Route</h2>
              <p className="text-gray-600">{route?.name || 'North District Route'} - {route?.id || 'RT-30842'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] space-y-6">
          {/* Basic Schedule Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Schedule Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <Input
                  type="date"
                  value={scheduleData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repeat Type
                </label>
                <Select
                  value={scheduleData.repeatType}
                  onChange={(value) => handleInputChange('repeatType', value)}
                  options={repeatOptions}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <Input
                  type="time"
                  value={scheduleData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <Input
                  type="time"
                  value={scheduleData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Repeat Schedule */}
          {scheduleData.repeatType === 'weekly' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Repeat Days</h3>
              <div className="grid grid-cols-4 gap-3">
                {weekDays.map((day) => (
                  <label key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={scheduleData.repeatDays.includes(day)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInputChange('repeatDays', [...scheduleData.repeatDays, day]);
                        } else {
                          handleInputChange('repeatDays', scheduleData.repeatDays.filter(d => d !== day));
                        }
                      }}
                      className="mr-2"
                    />
                    {day}
                  </label>
                ))}
              </div>
            </Card>
          )}

          {/* Assignment */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Assignment</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Driver
                </label>
                <Select
                  value={scheduleData.driver}
                  onChange={(value) => handleInputChange('driver', value)}
                  options={driverOptions}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle
                </label>
                <Select
                  value={scheduleData.vehicle}
                  onChange={(value) => handleInputChange('vehicle', value)}
                  options={vehicleOptions}
                />
              </div>
            </div>
          </Card>

          {/* Route Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Route Summary</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{route?.stops || 5}</div>
                <div className="text-sm text-gray-600">Stops</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{route?.distance || '12.4'}</div>
                <div className="text-sm text-gray-600">Miles</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{route?.students || 7}</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">25</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
            </div>
          </Card>

          {/* Additional Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Additional Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Students
                </label>
                <Input
                  type="number"
                  value={scheduleData.maxStudents}
                  onChange={(e) => handleInputChange('maxStudents', parseInt(e.target.value))}
                  min="1"
                  max="15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  value={scheduleData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Add any special instructions or notes..."
                />
              </div>
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Schedule Preview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Route:</span>
                <span className="font-medium">{route?.name || 'North District Route'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{scheduleData.date || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{scheduleData.startTime} - {scheduleData.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Driver:</span>
                <span className="font-medium">{scheduleData.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle:</span>
                <span className="font-medium">{scheduleData.vehicle}</span>
              </div>
            </div>
          </Card>
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
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            onClick={handleSave}
          >
            <Save className="w-4 h-4" />
            Schedule Route
          </Button>
        </div>
      </div>
    </div>
  );
}
