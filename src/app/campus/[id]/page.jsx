import PageLayout from "@/components/layout/page-layout"
import CampusDetailContent from "@/components/campus/CampusDetailContent"

export default async function CampusDetailPage({ params }) {
  const resolvedParams = await params;
  const campusId = resolvedParams.id;
  return (
    <PageLayout activePage="Campus" pageTitle="Campus Details">
      <CampusDetailContent campusId={campusId} />
    </PageLayout>
  )
}
