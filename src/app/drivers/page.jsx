import PageLayout from "@/components/layout/page-layout"
import DriversContent from "@/components/drivers/drivers-content"

export default function DriversPage() {
  return (
    <PageLayout activePage="Drivers" pageTitle="Drivers">
      <DriversContent />
    </PageLayout>
  )
}
