"use client";

import Header from "./header";
import Sidebar from "./sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function PageLayout({ children, activePage, pageTitle, onHeaderSearch, headerSearchPlaceholder, hideHeaderSearch }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar activePage={activePage} />
        <div className="flex-1 flex flex-col">
          <Header activePage={pageTitle} onSearch={onHeaderSearch} searchPlaceholder={headerSearchPlaceholder} hideSearch={hideHeaderSearch} />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
