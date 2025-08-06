import PageLayout from "../layout/PageLayout"
import DashboardContent from "./dashboard-content"

export default function Dashboard() {
  return (
    <PageLayout activePage="Dashboard" pageTitle="Dashboard">
      <DashboardContent />
    </PageLayout>
  )
}
