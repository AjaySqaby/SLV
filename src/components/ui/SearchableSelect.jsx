"use client";

import { Listbox } from "@headlessui/react";
import { Check, ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function SearchableSelect({
  options = [], // array of strings or {label, value}
  value = "",
  onChange,
  placeholder = "All",
  label,
  disabled = false,
  className = "",
}) {
  const [query, setQuery] = useState("");

  const normalizedOptions = useMemo(() => {
    const mapped = options.map((opt) =>
      typeof opt === "string" ? { label: opt, value: opt } : opt
    );
    return [{ label: placeholder, value: "" }, ...mapped];
  }, [options, placeholder]);

  const filtered = useMemo(() => {
    if (!query.trim()) return normalizedOptions;
    const q = query.toLowerCase();
    return normalizedOptions.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [normalizedOptions, query]);

  const selectedLabel =
    normalizedOptions.find((o) => o.value === value)?.label || placeholder;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button
            className={`w-full bg-white text-[var(--primary-black)] border border-[var(--gray-300)] rounded-lg py-2.5 px-3 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              disabled ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <span className="text-gray-900 truncate">{selectedLabel}</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </Listbox.Button>
          {!disabled && (
            <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
              <div className="p-2 border-b border-gray-100 bg-white">
                <div className="relative">
                  <Search className="pointer-events-none left-2 top-2.5 h-4 w-4 text-gray-400" style={{ position: 'absolute' }} />
                  <input
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    placeholder={`Search ${label?.toLowerCase() || "options"}...`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
              {filtered.length === 0 && (
                <div className="px-3 py-2 text-gray-400 text-sm">No results</div>
              )}
              {filtered.map((opt) => (
                <Listbox.Option
                  key={opt.value}
                  value={opt.value}
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
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {opt.label}
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
          )}
        </div>
      </Listbox>
    </div>
  );
}


