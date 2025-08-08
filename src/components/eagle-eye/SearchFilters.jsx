import { Search } from "lucide-react";
import Tabs from "@/components/ui/Tabs";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SearchFilters({ 
  activeTab, 
  setActiveTab, 
  showDistrictsDropdown, 
  setShowDistrictsDropdown,
  showSchoolsDropdown,
  setShowSchoolsDropdown,
  showPartnersDropdown,
  setShowPartnersDropdown,
  districts,
  schools,
  partners
}) {
  const tabs = [
    { id: 0, label: "All" },
    { id: 1, label: "Districts" },
    { id: 2, label: "Schools" },
    { id: 3, label: "Partners" }
  ];

  return (
    <div className="p-4 bg-[var(--surface-bg)] border-b border-[var(--border)] w-full">
      <div className="relative mb-4 w-full">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--muted-text)]" />
        <Input
          type="text"
          placeholder="Search district, campus, or driver..."
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 w-full">
        <DropdownButton
          label="All Districts"
          isOpen={showDistrictsDropdown}
          onToggle={() => {
            setShowDistrictsDropdown(!showDistrictsDropdown);
            setShowSchoolsDropdown(false);
            setShowPartnersDropdown(false);
          }}
          items={districts}
        />

        <DropdownButton
          label="All Schools"
          isOpen={showSchoolsDropdown}
          onToggle={() => {
            setShowSchoolsDropdown(!showSchoolsDropdown);
            setShowDistrictsDropdown(false);
            setShowPartnersDropdown(false);
          }}
          items={schools}
        />

        <DropdownButton
          label="All Partners"
          isOpen={showPartnersDropdown}
          onToggle={() => {
            setShowPartnersDropdown(!showPartnersDropdown);
            setShowDistrictsDropdown(false);
            setShowSchoolsDropdown(false);
          }}
          items={partners}
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

function DropdownButton({ label, isOpen, onToggle, items }) {
  return (
    <div className="relative">
      <Button
        variant="secondary"
        className="w-full flex justify-between items-center px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface-bg)]"
        onClick={onToggle}
      >
        <span>{label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-[var(--surface-bg)] border border-[var(--border)] rounded-lg shadow-lg">
          {items.map((item, index) => (
            <div
              key={index}
              className={`px-4 py-2 hover:bg-[var(--hover-bg)] cursor-pointer ${index === 0 ? "bg-[var(--primary)] text-[var(--on-primary)]" : ""}`}
            >
              {index === 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline mr-2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 