"use client";
import { useState } from "react";
import { Search, Bell, User } from "lucide-react";
import Image from "next/image";
import TimezoneIndicator from "@/components/ui/TimezoneIndicator";

export default function Header({ activePage, onSearch }) {
  const [search, setSearch] = useState("");
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    console.log("Header search input:", value);
    if (onSearch) {
      onSearch(value);
    }
  };
  
  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between shadow-md border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="text-[var(--primary-black)] font-medium ">
            {activePage}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <TimezoneIndicator />
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search rides or drivers..."
            className="bg-gray-100 text-gray-900 placeholder-gray-500 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200"
            suppressHydrationWarning={true}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
        <button className="text-[var(--primary-black)] p-2 rounded-full hover:bg-[var(--primary-hover)]">
          <Bell className="h-5 w-5" />
        </button>
        <button className="text-[var(--primary-black)] p-2 rounded-full hover:bg-[var(--primary-hover)]">
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
