"use client";

import PageLayout from "@/components/layout/page-layout"
import DriversContent from "@/components/drivers/drivers-content"

// Disable static generation for this page
export const dynamic = 'force-dynamic';

export default function DriversPage() {
  return (
    <PageLayout activePage="Drivers" pageTitle="Drivers">
      <DriversContent />
    </PageLayout>
  )
}
