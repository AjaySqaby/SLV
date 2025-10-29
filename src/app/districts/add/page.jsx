"use client";
import { useState } from "react";
import { ArrowLeft, Plus, X, Building2, Calendar, MapPin, User, Mail, Phone, Clock, Sun, BookOpen, DollarSign, Car, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import SingleDatePicker from "@/components/routes/SingleDatePicker";
import PageLayout from "@/components/layout/page-layout";

export default function AddDistrictPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    districtName: "",
    city: "",
    districtAddress: "",
    state: "",
    contactFirstName: "",
    contactLastName: "",
    contactPhone: "",
    contactEmail: "",
    districtStartDate: null,
    districtEndDate: null,
    
    // Holidays
    holidays: [],
    
    // Summer School
    summerSchoolPeriods: [],
    
    // Rate Settings
    baseRate: "",
    includedMileage: "",
    mileageFee: "",
    miscellaneousFees: [],
  });

  const [newHoliday, setNewHoliday] = useState({
    name: "",
    startDate: null,
    endDate: null,
  });

  const [newSummerPeriod, setNewSummerPeriod] = useState({
    name: "",
    startDate: null,
    endDate: null,
  });

  const states = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ];

  const tabs = [
    { id: 0, label: "Basic Info", icon: Building2 },
    { id: 1, label: "Holidays", icon: Calendar },
    { id: 2, label: "Summer School", icon: Sun },
    { id: 3, label: "Rate Settings", icon: DollarSign },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addHoliday = () => {
    if (newHoliday.name && newHoliday.startDate && newHoliday.endDate) {
      setFormData(prev => ({
        ...prev,
        holidays: [...prev.holidays, { ...newHoliday, id: Date.now() }]
      }));
      setNewHoliday({ name: "", startDate: null, endDate: null });
    }
  };

  const removeHoliday = (id) => {
    setFormData(prev => ({
      ...prev,
      holidays: prev.holidays.filter(holiday => holiday.id !== id)
    }));
  };

  const addSummerPeriod = () => {
    if (newSummerPeriod.name && newSummerPeriod.startDate && newSummerPeriod.endDate) {
      setFormData(prev => ({
        ...prev,
        summerSchoolPeriods: [...prev.summerSchoolPeriods, { ...newSummerPeriod, id: Date.now() }]
      }));
      setNewSummerPeriod({ name: "", startDate: null, endDate: null });
    }
  };

  const removeSummerPeriod = (id) => {
    setFormData(prev => ({
      ...prev,
      summerSchoolPeriods: prev.summerSchoolPeriods.filter(period => period.id !== id)
    }));
  };

  const [newFee, setNewFee] = useState({
    name: "",
    amount: "",
  });

  const addMiscellaneousFee = () => {
    if (newFee.name && newFee.amount) {
      setFormData(prev => ({
        ...prev,
        miscellaneousFees: [...prev.miscellaneousFees, { ...newFee, id: Date.now() }]
      }));
      setNewFee({ name: "", amount: "" });
    }
  };

  const removeMiscellaneousFee = (id) => {
    setFormData(prev => ({
      ...prev,
      miscellaneousFees: prev.miscellaneousFees.filter(fee => fee.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("District data:", formData);
    // Handle form submission here
    router.push('/districts');
  };

  const handleCancel = () => {
    router.push('/districts');
  };

  const renderBasicInfoTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <Input
            label="District Name *"
            name="districtName"
            value={formData.districtName}
            onChange={handleInputChange}
            placeholder="Enter district name"
            required
            icon={<Building2 className="h-4 w-4 text-[var(--muted-text)]" />}
          />
          
          <Input
            label="City *"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter city"
            required
            icon={<MapPin className="h-4 w-4 text-[var(--muted-text)]" />}
          />
          
          <Input
            label="Contact First Name *"
            name="contactFirstName"
            value={formData.contactFirstName}
            onChange={handleInputChange}
            placeholder="Enter contact first name"
            required
            icon={<User className="h-4 w-4 text-[var(--muted-text)]" />}
          />
          
          <Input
            label="Contact Phone Number *"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
            placeholder="(555) 555-5555"
            required
            icon={<Phone className="h-4 w-4 text-[var(--muted-text)]" />}
          />
          
                                 <div>
              <label className="block text-sm font-medium text-[var(--heading)] mb-2">
                District Start Date
              </label>
              <div className="[&_.rdp-button]:!bg-purple-600 [&_.rdp-button]:!text-white [&_.rdp-button]:!border-purple-600 [&_.rdp-button:hover]:!bg-purple-700 [&_.rdp-button:hover]:!border-purple-700">
                <SingleDatePicker
                  selected={formData.districtStartDate}
                  onSelect={(date) => setFormData(prev => ({ ...prev, districtStartDate: date }))}
                  hideLabel={true}
                />
              </div>
            </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <Input
            label="District Address *"
            name="districtAddress"
            value={formData.districtAddress}
            onChange={handleInputChange}
            placeholder="Enter district address"
            required
            icon={<MapPin className="h-4 w-4 text-[var(--muted-text)]" />}
          />
          
          <Select
            label="State *"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            options={states}
            placeholder="Select a state"
            required
          />
          
          <Input
            label="Contact Last Name *"
            name="contactLastName"
            value={formData.contactLastName}
            onChange={handleInputChange}
            placeholder="Enter contact last name"
            required
            icon={<User className="h-4 w-4 text-[var(--muted-text)]" />}
          />
          
          <Input
            label="Contact Email *"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={handleInputChange}
            placeholder="contact@district.edu"
            required
            icon={<Mail className="h-4 w-4 text-[var(--muted-text)]" />}
          />
          
                                 <div>
              <label className="block text-sm font-medium text-[var(--heading)] mb-2">
                District End Date
              </label>
              <div className="[&_.rdp-button]:!bg-purple-600 [&_.rdp-button]:!text-white [&_.rdp-button]:!border-purple-600 [&_.rdp-button:hover]:!bg-purple-700 [&_.rdp-button:hover]:!border-purple-700">
                <SingleDatePicker
                  selected={formData.districtEndDate}
                  onSelect={(date) => setFormData(prev => ({ ...prev, districtEndDate: date }))}
                  hideLabel={true}
                />
              </div>
            </div>
        </div>
      </div>

      <div className="bg-[var(--blue-50)] border border-[var(--blue-200)] rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-[var(--blue-600)] mt-0.5" />
          <p className="text-sm text-[var(--blue-800)]">
            After creating the district, the number of schools, students, and routes will be automatically tracked based on data in the system.
          </p>
        </div>
      </div>
    </div>
  );

  const renderHolidaysTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[var(--amber-100)] rounded-full flex items-center justify-center">
          <Calendar className="h-4 w-4 text-[var(--amber-500)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--heading)]">District Holidays</h3>
      </div>
      
      <div className="space-y-4">
        <Input
          label="Holiday Name"
          value={newHoliday.name}
          onChange={(e) => setNewHoliday(prev => ({ ...prev, name: e.target.value }))}
          placeholder="e.g., Winter Break, Spring Break"
          icon={<Calendar className="h-4 w-4 text-[var(--muted-text)]" />}
        />
        
        <div className="grid grid-cols-2 gap-4">
                                 <div>
              <label className="block text-sm font-medium text-[var(--heading)] mb-2">
                Start Date
              </label>
              <div className="[&_.rdp-button]:!bg-purple-600 [&_.rdp-button]:!text-white [&_.rdp-button]:!border-purple-600 [&_.rdp-button:hover]:!bg-purple-700 [&_.rdp-button:hover]:!border-purple-700">
                <SingleDatePicker
                  selected={newHoliday.startDate}
                  onSelect={(date) => setNewHoliday(prev => ({ ...prev, startDate: date }))}
                  hideLabel={true}
                />
              </div>
            </div>
          
                                 <div>
              <label className="block text-sm font-medium text-[var(--heading)] mb-2">
                End Date
              </label>
              <div className="[&_.rdp-button]:!bg-purple-600 [&_.rdp-button]:!text-white [&_.rdp-button]:!border-purple-600 [&_.rdp-button:hover]:!bg-purple-700 [&_.rdp-button:hover]:!border-purple-700">
                <SingleDatePicker
                  selected={newHoliday.endDate}
                  onSelect={(date) => setNewHoliday(prev => ({ ...prev, endDate: date }))}
                  hideLabel={true}
                />
              </div>
            </div>
        </div>
        
        <Button
          variant="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={addHoliday}
        >
          Add Holiday
        </Button>
      </div>

      {/* Display added holidays */}
      {formData.holidays.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-[var(--heading)] flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Added Holidays:
          </h4>
          {formData.holidays.map((holiday) => (
            <div key={holiday.id} className="flex items-center justify-between p-4 bg-[var(--gray-50)] rounded-lg border border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--amber-100)] rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-[var(--amber-500)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--heading)]">{holiday.name}</p>
                  <p className="text-sm text-[var(--muted-text)]">
                    {holiday.startDate?.toLocaleDateString()} - {holiday.endDate?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeHoliday(holiday.id)}
                className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-[var(--muted-text)]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSummerSchoolTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[var(--orange-100)] rounded-full flex items-center justify-center">
          <Sun className="h-4 w-4 text-[var(--orange-500)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--heading)]">Summer School Dates</h3>
      </div>
      
      <div className="space-y-4">
        <Input
          label="Summer School Period Name"
          value={newSummerPeriod.name}
          onChange={(e) => setNewSummerPeriod(prev => ({ ...prev, name: e.target.value }))}
          placeholder="e.g., Session 1, Session 2"
          icon={<BookOpen className="h-4 w-4 text-[var(--muted-text)]" />}
        />
        
        <div className="grid grid-cols-2 gap-4">
                                 <div>
              <label className="block text-sm font-medium text-[var(--heading)] mb-2">
                Start Date
              </label>
              <div className="[&_.rdp-button]:!bg-purple-600 [&_.rdp-button]:!text-white [&_.rdp-button]:!border-purple-600 [&_.rdp-button:hover]:!bg-purple-700 [&_.rdp-button:hover]:!border-purple-700">
                <SingleDatePicker
                  selected={newSummerPeriod.startDate}
                  onSelect={(date) => setNewSummerPeriod(prev => ({ ...prev, startDate: date }))}
                  hideLabel={true}
                />
              </div>
            </div>
          
                                 <div>
              <label className="block text-sm font-medium text-[var(--heading)] mb-2">
                End Date
              </label>
              <div className="[&_.rdp-button]:!bg-purple-600 [&_.rdp-button]:!text-white [&_.rdp-button]:!border-purple-600 [&_.rdp-button:hover]:!bg-purple-700 [&_.rdp-button:hover]:!border-purple-700">
                <SingleDatePicker
                  selected={newSummerPeriod.endDate}
                  onSelect={(date) => setNewSummerPeriod(prev => ({ ...prev, endDate: date }))}
                  hideLabel={true}
                />
              </div>
            </div>
        </div>
        
        <Button
          variant="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={addSummerPeriod}
        >
          Add Summer School Period
        </Button>
      </div>

      {/* Display added summer periods */}
      {formData.summerSchoolPeriods.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-[var(--heading)] flex items-center gap-2">
            <Sun className="h-4 w-4" />
            Added Summer School Periods:
          </h4>
          {formData.summerSchoolPeriods.map((period) => (
            <div key={period.id} className="flex items-center justify-between p-4 bg-[var(--gray-50)] rounded-lg border border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--orange-100)] rounded-full flex items-center justify-center">
                  <Sun className="h-4 w-4 text-[var(--orange-500)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--heading)]">{period.name}</p>
                  <p className="text-sm text-[var(--muted-text)]">
                    {period.startDate?.toLocaleDateString()} - {period.endDate?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeSummerPeriod(period.id)}
                className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-[var(--muted-text)]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderRateSettingsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[var(--green-100)] rounded-full flex items-center justify-center">
          <DollarSign className="h-4 w-4 text-[var(--green-600)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--heading)]">$ Rate Settings</h3>
      </div>

      {/* Rate Settings Fields */}
      <div className="space-y-6">
        {/* Base Rate */}
        <div>
          <label className="block text-sm font-medium text-[var(--heading)] mb-2">
            Base Rate *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-text)]">$</span>
            <Input
              type="number"
              name="baseRate"
              value={formData.baseRate}
              onChange={handleInputChange}
              placeholder="0.00"
              required
              className="pl-8"
            />
          </div>
          <p className="text-xs text-[var(--muted-text)] mt-1">
            The default starting rate for rides in the district.
          </p>
        </div>

        {/* Included Mileage */}
        <div>
          <label className="block text-sm font-medium text-[var(--heading)] mb-2">
            Included Mileage *
          </label>
          <div className="relative">
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Car className="h-4 w-4 text-[var(--muted-text)]" />
            </span>
            <Input
              type="number"
              name="includedMileage"
              value={formData.includedMileage}
              onChange={handleInputChange}
              placeholder="0"
              required
              className="pr-10"
            />
          </div>
          <p className="text-xs text-[var(--muted-text)] mt-1">
            The number of miles included in the base rate.
          </p>
        </div>

        {/* Mileage Fee */}
        <div>
          <label className="block text-sm font-medium text-[var(--heading)] mb-2">
            Mileage Fee *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-text)]">$</span>
            <Input
              type="number"
              name="mileageFee"
              value={formData.mileageFee}
              onChange={handleInputChange}
              placeholder="0.00"
              required
              className="pl-8"
            />
          </div>
          <p className="text-xs text-[var(--muted-text)] mt-1">
            The cost per additional mile beyond the included mileage.
          </p>
        </div>

        {/* Miscellaneous Fees Section */}
        <div className="pt-6 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-md font-semibold text-[var(--heading)] mb-1">Miscellaneous Fees</h4>
              <p className="text-xs text-[var(--muted-text)]">
                Add custom fees like tolls, service charges, or special zone fees.
              </p>
            </div>
            <Button
              variant="secondary"
              icon={<Plus className="h-4 w-4" />}
              onClick={addMiscellaneousFee}
              className="whitespace-nowrap"
            >
              Add Fee
            </Button>
          </div>

          {/* Add Fee Form */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input
              label="Fee Name"
              value={newFee.name}
              onChange={(e) => setNewFee(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Tolls, Service Charge"
            />
            <div>
              <label className="block text-sm font-medium text-[var(--heading)] mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-text)]">$</span>
                <Input
                  type="number"
                  value={newFee.amount}
                  onChange={(e) => setNewFee(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.00"
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          {/* Display added fees */}
          {formData.miscellaneousFees.length > 0 && (
            <div className="space-y-3">
              {formData.miscellaneousFees.map((fee) => (
                <div key={fee.id} className="flex items-center justify-between p-4 bg-[var(--gray-50)] rounded-lg border border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--green-100)] rounded-full flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-[var(--green-600)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--heading)]">{fee.name}</p>
                      <p className="text-sm text-[var(--muted-text)]">${fee.amount}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeMiscellaneousFee(fee.id)}
                    className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4 text-[var(--muted-text)]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Information Banner */}
        <div className="bg-[var(--blue-50)] border border-[var(--blue-200)] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-[var(--blue-600)] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-[var(--blue-800)]">
              These rates will automatically apply to all rides within the selected district.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PageLayout activePage="Districts" pageTitle="Add New School District">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[var(--muted-text)]" />
          </button>
          <h1 className="text-2xl font-bold text-[var(--heading)]">Add New School District</h1>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-[var(--border)]">
          {/* Card Header */}
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="text-lg font-semibold text-[var(--heading)]">District Information</h2>
          </div>

          {/* Tabs */}
          <div className="px-6 pt-6">
            <div className="flex space-x-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[var(--primary)] text-white shadow-sm'
                      : 'bg-white text-[var(--heading)] border border-[var(--border)] hover:bg-[var(--gray-50)]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-6 pb-6">
            {activeTab === 0 && renderBasicInfoTab()}
            {activeTab === 1 && renderHolidaysTab()}
            {activeTab === 2 && renderSummerSchoolTab()}
            {activeTab === 3 && renderRateSettingsTab()}
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-between p-6 border-t border-[var(--border)] bg-[var(--gray-50)]">
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              {activeTab > 0 && (
                <Button
                  variant="secondary"
                  onClick={() => setActiveTab(activeTab - 1)}
                >
                  Back to {tabs[activeTab - 1].label}
                </Button>
              )}
            </div>
            <Button
              variant="primary"
              onClick={handleSubmit}
            >
              Create District
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
