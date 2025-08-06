import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Calendar } from "lucide-react";
import FilterDropdown from "./FilterDropdown";
import Button from "@/components/ui/Button";

export default function DateRangePicker({ selected, onSelect }) {
  const [show, setShow] = useState(false);
  const ref = useRef();

  // Close calendar if clicked outside
  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      setShow(false);
    }
  }
  // Attach/detach event
  useEffect(() => {
    if (show) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  return (
    <div className="w-full relative" ref={ref}>
      <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
        Date Range
      </label>
      <Button
        type="button"
        className="w-full bg-background border-2 border-[var(--gray-300)] !text-[var(--gray-400)] font-semibold rounded-lg py-2 px-4 flex items-center gap-2 focus:outline-none"
        onClick={() => setShow((v) => !v)}
      >
        <Calendar className="h-5 w-5" />
        {selected ? selected.toLocaleDateString() : "Select a due date"}
      </Button>
      {show && (
        <div className="absolute z-50 mt-2 bg-background rounded-lg shadow-lg p-2">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={onSelect}
            modifiersClassNames={{
              selected: "bg-purple-500 text-white rounded-full",
            }}
            className=""
          />
        </div>
      )}
    </div>
  );
}
