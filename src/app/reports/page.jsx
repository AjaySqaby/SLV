import PageLayout from "@/components/layout/page-layout";
import ReportsContent from "@/components/reports/reports-content";

export default function ReportsPage() {
  return (
    <PageLayout title="Reports & Analytics" activePage="Reports">
      <ReportsContent />
    </PageLayout>
  );
}
