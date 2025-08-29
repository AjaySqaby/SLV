import PageLayout from "@/components/layout/page-layout";
import DistrictsContent from "@/components/districts/districts-content";

export default function DistrictsPage() {
  return (
    <PageLayout activePage="Districts" pageTitle="School Districts">
      <DistrictsContent />
    </PageLayout>
  );
}
