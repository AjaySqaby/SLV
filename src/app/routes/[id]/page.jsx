import PageLayout from "@/components/layout/page-layout"
import RouteDetailContent from "@/components/routes/RouteDetailContent"

export default async function RouteDetailPage({ params }) {
  const routeId = await params.id;
  return (
    <PageLayout activePage="Routes" pageTitle="Route Details">
      <RouteDetailContent routeId={routeId} />
    </PageLayout>
  )
}
