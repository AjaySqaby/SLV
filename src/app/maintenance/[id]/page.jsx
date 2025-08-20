import PageLayout from "@/components/layout/page-layout"
import MaintenanceDetailContent from "@/components/maintenance/MaintenanceDetailContent"

export default async function MaintenanceDetailPage({ params }) {
  const maintenanceId = await params.id;
  return (
    <PageLayout activePage="Drivers" pageTitle="Maintenance Details">
      <MaintenanceDetailContent maintenanceId={maintenanceId} />
    </PageLayout>
  )
}
