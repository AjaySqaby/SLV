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
        <div className={`relative mb-1 ${className}`}>
          <Listbox.Button
            className={`w-full px-3 py-2 rounded-lg bg-[var(--on-primary)] text-left flex items-center border border-[var(--purple)] transition focus:outline-none ${
              open ? "border-2 border-[var(--purple-400)]" : "border border-[var(--gray-300)]"
            }`}
          >
            <span className={value ? "text-[var(--gray-900)]" : "text-[var(--gray-400)]"}>
              {value || placeholder}
            </span>
            <ChevronDown className="ml-auto h-5 w-5 text-[var(--gray-400)]" />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full bg-[var(--on-primary)] rounded-lg shadow-lg z-10 border border-[var(--gray-200)] py-1">
            {TIMEZONES.map((tz) => (
              <Listbox.Option
                key={tz}
                value={tz}
                className={({ active, selected }) =>
                  `cursor-pointer select-none px-4 py-2 text-sm ${
                    selected
                      ? "bg-[var(--purple)] text-[var(--on-primary)]"
                      : active
                      ? "bg-[var(--purple)] text-[var(--gray-900)]"
                      : "text-[var(--gray-900)]"
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