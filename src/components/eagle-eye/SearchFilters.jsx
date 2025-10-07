import { Search } from "lucide-react";
import { useState } from "react";
import Input from "@/components/ui/Input";
import SearchableDropdown from "@/components/ui/SearchableDropdown";

export default function SearchFilters({ 
  districts,
  schools,
  partners
}) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);

  return (
    <div className="p-4  w-full">
      <div className="relative mb-4 w-full">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--muted-text)]" />
        <Input
          type="text"
          placeholder="Search district, campus, or driver..."
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>
      <div className="flex w-full items-center">
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