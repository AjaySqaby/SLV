import PageLayout from "@/components/layout/page-layout"
import RidesContent from "@/components/rides/rides-content"

export default function RidesPage() {
  return (
    <PageLayout activePage="Rides" pageTitle="Rides">
      <RidesContent />
    </PageLayout>
  )
}
