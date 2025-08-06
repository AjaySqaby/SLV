import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

const filterTypes = [
  "Driver",
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
          <Listbox.Button className="w-full bg-transparent text-[var(--primary-black)] border-2 border-[var(--gray-300)] font-semibold rounded-lg py-2 px-4 flex items-center justify-between focus:outline-none">
            <span>{value || "Select filter type..."}</span>
            <ChevronDown className="h-5 w-5 text-[var(--on-primary)] ml-2" />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full rounded-md shadow-lg z-50 max-h-60 overflow-auto bg-[--on-primary]">
            <div className="px-2 py-1">
              <input
                className="w-full px-2 py-1 border border-[var(--gray-200)] rounded mb-1 text-sm focus:outline-none"
                placeholder="Search filter type..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {filtered.length === 0 && (
              <div className="px-4 py-2 text-[var(--gray-400)]">No results</div>
            )}
            {filtered.map((type) => (
              <Listbox.Option
                key={type}
                value={type}
                className={({ active }) =>
                  `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                    active
                      ? "bg-transparent text-[var(--primary-black)]"
                      : "text-[var()]"
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
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 bg-transparent text-[var(--primary-black)] border-2 border-[var(--gray-300)]">
                        <Check className="w-5 h-5" />
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
