import { Listbox } from "@headlessui/react";
import { Check, ChevronDown, Search } from "lucide-react";
import { useState } from "react";

const filterTypes = [
  "Driver",
  "Partners",
  "District",
  "Campus",
  "Student",
  "Route",
  "Ride ID",
];

export default function FilterDropdown({ value, onChange }) {
  const [query, setQuery] = useState("");
  const filtered = filterTypes.filter((type) =>
    type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
        Filter Type
      </label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full bg-white text-[var(--primary-black)] border border-[var(--gray-300)] rounded-lg py-2.5 px-3 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
            <span className="text-gray-900">{value || "Select filter type..."}</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Search filter type..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-gray-400 text-sm">No results</div>
            )}
            {filtered.map((type) => (
              <Listbox.Option
                key={type}
                value={type}
                className={({ active, selected }) =>
                  `cursor-pointer select-none relative py-2.5 pl-10 pr-4 transition-colors !hover:bg-[#be5eed] hover:text-white ${
                    selected
                      ? "bg-[#be5eed] text-white font-medium"
                      : active
                      ? "bg-[#be5eed] text-white"
                      : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {type}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Check className="w-4 h-4 text-white" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
