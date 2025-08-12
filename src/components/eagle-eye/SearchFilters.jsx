import { Search } from "lucide-react";
import { useState } from "react";
import Tabs from "@/components/ui/Tabs";
import Input from "@/components/ui/Input";
import SearchableDropdown from "@/components/ui/SearchableDropdown";

export default function SearchFilters({ 
  activeTab, 
  setActiveTab, 
  districts,
  schools,
  partners
}) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const tabs = [
    { id: 0, label: "All" },
    { id: 1, label: "Districts" },
    { id: 2, label: "Schools" },
    { id: 3, label: "Partners" }
  ];

  return (
    <div className="py-4 bg-[var(--surface-bg)] border-b border-[var(--border)] w-full">
      <div className="relative mb-4 w-full">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--muted-text)]" />
        <Input
          type="text"
          placeholder="Search district, campus, or driver..."
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 w-full">
        <SearchableDropdown
          label="All Districts"
          items={districts}
          selectedItem={selectedDistrict}
          onSelect={setSelectedDistrict}
          placeholder="Search districts..."
        />

        <SearchableDropdown
          label="All Schools"
          items={schools}
          selectedItem={selectedSchool}
          onSelect={setSelectedSchool}
          placeholder="Search schools..."
        />

        <SearchableDropdown
          label="All Partners"
          items={partners}
          selectedItem={selectedPartner}
          onSelect={setSelectedPartner}
          placeholder="Search partners..."
        />
      </div>

      <div className="flex w-full items-center">
        <Tabs 
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <div className="ml-auto flex items-center">
          <div className="flex items-center text-[var(--gray-600)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 text-[var(--blue)]"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-sm">Smart Driver Assignment</span>
          </div>
        </div>
      </div>
    </div>
  );
} 