import PageLayout from "@/components/layout/page-layout"
import DriverDetailContent from "@/components/drivers/DriverDetailContent"

export default function DriverDetailPage({ params }) {
  return (
    <PageLayout activePage="Drivers" pageTitle="Driver Details">
      <DriverDetailContent driverId={params.id} />
    </PageLayout>
  )
}
