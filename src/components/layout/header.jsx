"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TimezoneIndicator from "@/components/ui/TimezoneIndicator";
import { useAuth } from "@/components/auth/AuthContext";

export default function Header({ activePage, onSearch, searchPlaceholder, hideSearch }) {
  const [search, setSearch] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { logout } = useAuth();
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    console.log("Header search input:", value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/auth");
    setShowUserDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserDropdown]);
  
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
        {!hideSearch && (
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder={searchPlaceholder || "Search rides or drivers..."}
              className="bg-gray-100 text-gray-900 placeholder-gray-500 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200"
              suppressHydrationWarning={true}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        )}
        <button className="text-[var(--primary-black)] p-2 rounded-full hover:bg-[var(--primary-hover)]">
          <Bell className="h-5 w-5" />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="text-[var(--primary-black)] p-2 rounded-full hover:bg-[var(--primary-hover)] transition-colors"
          >
            <User className="h-5 w-5" />
          </button>
          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
