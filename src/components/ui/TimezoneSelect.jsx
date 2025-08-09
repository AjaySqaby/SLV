import { Listbox } from "@headlessui/react";
import { ChevronDown, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { TIMEZONES, getUserTimezone, getTimezoneLabel } from "@/utils/timezone";

export default function TimezoneSelect({ value, onChange, placeholder = "Select timezone", className = "", showAutoDetect = true }) {
  const [userTimezone, setUserTimezone] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    // Auto-detect user's timezone on component mount
    const detectUserTz = () => {
      const detected = getUserTimezone();
      setUserTimezone(detected);
    };
    detectUserTz();
  }, []);

  const handleAutoDetect = async () => {
    setIsDetecting(true);
    try {
      const detected = getUserTimezone();
      setUserTimezone(detected);
      if (onChange) {
        onChange(detected);
      }
    } catch (error) {
      console.error('Error detecting timezone:', error);
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {showAutoDetect && userTimezone && (
        <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-800">
              Your timezone: {getTimezoneLabel(userTimezone)}
            </span>
          </div>
          <button
            onClick={handleAutoDetect}
            disabled={isDetecting}
            className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isDetecting ? 'Detecting...' : 'Use This'}
          </button>
        </div>
      )}
      
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button
              className={`w-full px-3 py-2.5 rounded-lg bg-white text-left flex items-center border border-gray-300 transition focus:outline-none ${
                open ? "border-gray-400" : "border-gray-300"
              }`}
            >
              <span className={value ? "text-gray-900 font-medium" : "text-gray-400"}>
                {value ? getTimezoneLabel(value) : placeholder}
              </span>
              <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 border border-gray-200 py-1 max-h-60 overflow-auto">
              {TIMEZONES.map((tz) => (
                <Listbox.Option
                  key={tz.value}
                  value={tz.value}
                  className={({ active, selected }) =>
                    `cursor-pointer select-none px-4 py-3 text-sm transition-colors ${
                      value === tz.value
                        ? "bg-[var(--timezone-hover)] text-white"
                        : active
                        ? "bg-[var(--timezone-hover)] text-white"
                        : "text-gray-900 hover:bg-[var(--timezone-hover)] hover:text-white"
                    }`
                  }
                >
                  <div className="flex items-center justify-between">
                    <span>{tz.label}</span>
                    {tz.value === userTimezone && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Your timezone
                      </span>
                    )}
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </div>
  );
} 