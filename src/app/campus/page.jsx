"use client"
import dynamic from "next/dynamic"
import PageLayout from "@/components/layout/page-layout"

const CampusContent = dynamic(() => import("@/components/campus/campus-content"), {
  ssr: false,
})

export default function CampusPage() {
  return (
    <PageLayout activePage="Campus" pageTitle="Campus">
      <CampusContent />
    </PageLayout>
  )
}
