import PageLayout from "@/components/layout/page-layout"
import CampusContent from "@/components/campus/campus-content"

export default function CampusPage() {
  return (
    <PageLayout activePage="Campus" pageTitle="Campus">
      <CampusContent />
    </PageLayout>
  )
}
