import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const TIMEZONES = [
  "Pacific Time (PT)",
  "Mountain Time (MT)",
  "Central Time (CT)",
  "Eastern Time (ET)",
  "Greenwich Mean Time (GMT)",
  "Central European Time (CET)",
  "Japan Standard Time (JST)",
  "Australian Eastern Time (AET)",
];

export default function TimezoneSelect({ value, onChange, placeholder = "Select timezone", className = "" }) {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className={`relative ${className}`}>
          <Listbox.Button
            className={`w-full px-3 py-2.5 rounded-lg bg-white text-left flex items-center border border-gray-300 transition focus:outline-none ${
              open ? "border-gray-400" : "border-gray-300"
            }`}
          >
            <span className={value ? "text-gray-900 font-medium" : "text-gray-400"}>
              {value || placeholder}
            </span>
            <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 border border-gray-200 py-1">
            {TIMEZONES.map((tz) => (
              <Listbox.Option
                key={tz}
                value={tz}
                className={({ active, selected }) =>
                  `cursor-pointer select-none px-4 py-3 text-sm transition-colors ${
                    value === tz
                      ? "bg-[var(--timezone-hover)] text-white"
                      : active
                      ? "bg-[var(--timezone-hover)] text-white"
                      : "text-gray-900 hover:bg-[var(--timezone-hover)] hover:text-white"
                  }`
                }
              >
                {tz}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
} 