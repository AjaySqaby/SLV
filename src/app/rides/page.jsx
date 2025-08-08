"use client";
import PageLayout from "@/components/layout/page-layout"
import RidesContent from "@/components/rides/rides-content"
import { useState } from "react"

export default function RidesPage() {
  const [headerSearchTerm, setHeaderSearchTerm] = useState("");

  const handleHeaderSearch = (searchTerm) => {
    console.log("Rides page received search:", searchTerm);
    setHeaderSearchTerm(searchTerm);
  };

  return (
    <PageLayout activePage="Rides" pageTitle="Rides" onHeaderSearch={handleHeaderSearch}>
      <RidesContent headerSearchTerm={headerSearchTerm} />
    </PageLayout>
  )
}
