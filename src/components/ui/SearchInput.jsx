import React from 'react';
import { CiSearch } from "react-icons/ci";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  width = "w-[300px]"
}) => {
  return (
    <div className={`relative ${width} ${className}`}>
      <input
        type="text"
        className="w-full h-10 px-4 pr-10 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text)] placeholder:text-[var(--muted-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-200"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-text)] pointer-events-none">
        <CiSearch size={20} />
      </div>
    </div>
  );
};

export default SearchInput; 