"use client"
import dynamic from "next/dynamic"
import PageLayout from "@/components/layout/page-layout"

const RoutesContent = dynamic(() => import("@/components/routes/routes-content"), {
  ssr: false,
})

export default function RoutesPage() {
  return (
    <PageLayout activePage="Routes" pageTitle="Routes">
      <RoutesContent />
    </PageLayout>
  )
}
