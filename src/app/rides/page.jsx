"use client";
import dynamic from "next/dynamic";
import PageLayout from "@/components/layout/page-layout"
import { useState } from "react"

const RidesContent = dynamic(() => import("@/components/rides/rides-content"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Loading...</div>
    </div>
  )
});

export default function RidesPage() {
  const [headerSearchTerm, setHeaderSearchTerm] = useState("");

  const handleHeaderSearch = (searchTerm) => {
    console.log("Rides page received search:", searchTerm);
    setHeaderSearchTerm(searchTerm);
  };

  return (
    <PageLayout
      activePage="Rides"
      pageTitle="Rides"
      onHeaderSearch={undefined}
      headerSearchPlaceholder={undefined}
      hideHeaderSearch
    >
      <RidesContent />
    </PageLayout>
  )
}
