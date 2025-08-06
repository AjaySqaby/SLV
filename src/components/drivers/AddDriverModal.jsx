import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { X } from "lucide-react";

export default function AddDriverModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    vendor: "",
    avatar: null,
  });
  const fileInputRef = useRef();

  const stateOptions = [
    { value: "", label: "Select a state" },
    { value: "GA", label: "Georgia" },
    { value: "CA", label: "California" },
    { value: "NY", label: "New York" },
    { value: "TX", label: "Texas" },
    { value: "FL", label: "Florida" },
  ];
  const vendorOptions = [
    { value: "", label: "Select a vendor" },
    { value: "ABC", label: "ABC Transportation" },
    { value: "RR", label: "Reliable Rides LLC" },
    { value: "QTS", label: "Quality Transportation Services" },
    { value: "SJI", label: "Safe Journey Inc." },
    { value: "PTS", label: "Premier Transit Solutions" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Add New Driver</h2>
            <div className="text-sm text-[var(--gray-500)]">
              Step 1 of 3: Personal Information
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
          <hr className="mb-6" />
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[var(--gray-100)] flex items-center justify-center text-[var(--gray-400)] text-5xl overflow-hidden">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <>
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#A3A3A3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-2.5 3.5-4.5 8-4.5s8 2 8 4.5" />
                    </svg>
                  </>
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0  bg-[var(--blue-600)] text-[var(--background)] rounded-full p-1 border-2 border-[var(--background)] shadow"
                onClick={handleAvatarClick}
                aria-label="Upload photo"
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="9" fill="#2563eb" />
                  <path
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v8m4-4H8"
                  />
                </svg>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />
              <Input
                type="text"
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
              />
              <Input
                type="tel"
                name="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(xxx) xxx-xxxx"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                name="dateOfBirth"
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              <div>
                <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                  Gender
                </label>
                <div className="flex items-center space-x-6 h-full">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[var(--blue-500)]"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[var(--blue-500)]"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={formData.gender === "Other"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[var(--blue-500)]"
                    />
                    <span className="ml-2">Other</span>
                  </label>
                </div>
              </div>
            </div>

            <Input
              type="text"
              name="address"
              label="Home Address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your street address"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="city"
                label="City"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city name"
              />
              <Select
                name="state"
                label="State"
                value={formData.state}
                onChange={(val) => handleSelectChange("state", val)}
                options={stateOptions}
              />
            </div>

            <Select
              name="vendor"
              label="Vendor"
              value={formData.vendor}
              onChange={(val) => handleSelectChange("vendor", val)}
              options={vendorOptions}
            />

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="secondary" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
