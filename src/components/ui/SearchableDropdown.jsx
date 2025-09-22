import { useState, useRef, useEffect } from "react";
import { FaSearch, FaChevronDown, FaCheck } from "react-icons/fa";
import Button from "./Button";
import Input from "./Input";

export default function SearchableDropdown({ 
  label, 
  items, 
  selectedItem, 
  onSelect, 
  placeholder = "Search..." 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    // Check if we're in a browser environment
    if (typeof document !== 'undefined') {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
    setSearchTerm("");
  };

  const displayLabel = selectedItem || label;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="secondary"
        className="w-full flex justify-between items-center px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface-bg)] hover:bg-[var(--hover-bg)] transition-colors"
        onClick={handleToggle}
      >
        <span className={selectedItem ? "text-[var(--text)]" : "text-[var(--muted-text)]"}>
          {displayLabel}
        </span>
        <FaChevronDown 
          size={12} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-[var(--surface-bg)] border border-[var(--border)] rounded-lg shadow-lg max-h-64 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-[var(--border)]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-2.5 h-3 w-3 text-[var(--muted-text)]" />
              <Input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                className="pl-8 pr-4 py-2 text-sm w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="px-4 py-3 text-sm text-[var(--muted-text)] text-center">
                No items found
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 hover:bg-[var(--hover-bg)] cursor-pointer flex items-center justify-between text-sm transition-colors ${
                    item === selectedItem ? "bg-[var(--primary)] text-[var(--on-primary)]" : ""
                  }`}
                  onClick={() => handleSelect(item)}
                >
                  <span>{item}</span>
                  {item === selectedItem && (
                    <FaCheck size={10} />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
