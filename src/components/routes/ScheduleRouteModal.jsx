"use client";

import { useState } from 'react';
import { X, Calendar, Clock, User, Car, Route, Save } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

export default function ScheduleRouteModal({ isOpen, onClose, routeId }) {
  const [formData, setFormData] = useState({
    date: "",
    repeatType: "One Time Only",
    startTime: "08:00",
    endTime: "08:25",
    driver: "Sam Kebede",
    vehicle: "Toyota Sienna"
  });

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSchedule = () => {
    // Schedule logic here
    console.log('Scheduling route:', formData);
    onClose();
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
              <Calendar className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--primary-black)]">Schedule Route</h2>
              <p className="text-[var(--muted-text)]">North District Route - {routeId || "RT-30842"}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
          >
            <X className="w-6 h-6 text-[var(--gray-500)]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Schedule Details */}
            <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-lg font-semibold mb-4 text-[var(--primary-black)]">Schedule Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--gray-400)]" />
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      placeholder="dd-mm-yyyy"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
                    Repeat Type
                  </label>
                  <Select
                    value={formData.repeatType}
                    onChange={(value) => handleInputChange('repeatType', value)}
                    options={[
                      { value: "One Time Only", label: "One Time Only" },
                      { value: "Daily", label: "Daily" },
                      { value: "Weekly", label: "Weekly" },
                      { value: "Monthly", label: "Monthly" }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
                    Start Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--gray-400)]" />
                    <Input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
                    End Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--gray-400)]" />
                    <Input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Assignment */}
            <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-lg font-semibold mb-4 text-[var(--primary-black)]">Assignment</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
                    Driver
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-[var(--blue-600)]" />
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
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
                    Vehicle
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--green-100)] rounded-full flex items-center justify-center">
                      <Car className="w-5 h-5 text-[var(--green-600)]" />
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
                </div>
              </div>
            </Card>

            {/* Route Summary */}
            <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-lg font-semibold mb-4 text-[var(--primary-black)]">Route Summary</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[var(--blue-100)] rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="text-2xl font-bold text-[var(--blue-600)]">5</div>
                  <div className="text-sm text-[var(--muted-text)]">Stops</div>
                </div>
                <div className="text-center p-4 bg-[var(--green-100)] rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="text-2xl font-bold text-[var(--green-600)]">12.4 mi</div>
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
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-[var(--gray-200)]">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white flex items-center gap-2"
            onClick={handleSchedule}
          >
            <Calendar className="w-4 h-4" />
            Schedule Route
          </Button>
        </div>
      </div>
    </div>
  );
}
