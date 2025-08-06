import DashboardContent from "@/components/dashboard/dashboard-content"
import PageLayout from "@/components/layout/page-layout"

export default function DashboardPage() {
  return (
    <PageLayout activePage="Dashboard" pageTitle="Dashboard">
      <DashboardContent />
    </PageLayout>
  )
}
