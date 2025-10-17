"use client"
import dynamic from "next/dynamic"
import PageLayout from "@/components/layout/page-layout"

const PartnersContent = dynamic(() => import("@/components/partners/partners-content"), {
  ssr: false,
})

export default function PartnersPage() {
  return (
    <PageLayout activePage="Partners" pageTitle="Partners">
      <PartnersContent />
    </PageLayout>
  )
}
