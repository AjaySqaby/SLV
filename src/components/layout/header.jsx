"use client";
import { useState } from "react";
import { Search, Bell, User } from "lucide-react";
import Image from "next/image";
export default function Header({ activePage }) {
  const [search, setSearch] = useState("");
  return (
    <header className="bg-gradient-to-r from-[var(--header-gradient-from)] via-[var(--header-gradient-via)] to-[var(--header-gradient-to)] py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="text-[var(--header-logo)] font-bold text-xl">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </span>
        </div>
        <div className="ml-8 flex items-center space-x-4">
          <span className="text-white uppercase font-medium border-r-2 border-white px-4">
            Ride
          </span>
          <span className="text-[var(--header-nav-active)] font-medium ">
            {activePage}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rides or drivers..."
            className="bg-[var(--header-search-bg)] text-[var(--header-search-text)] placeholder-[var(--header-search-placeholder)] rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-[var(--header-search-ring)]"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--header-search-placeholder)]" />
        </div>
        <button className="text-[var(--header-icon)] p-2 rounded-full hover:bg-[var(--header-icon-hover)]">
          <Bell className="h-5 w-5" />
        </button>
        <button className="text-[var(--header-icon)] p-2 rounded-full hover:bg-[var(--header-icon-hover)]">
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
