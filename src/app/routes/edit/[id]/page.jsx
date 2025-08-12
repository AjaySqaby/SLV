import PageLayout from "@/components/layout/page-layout"
import RouteEditContent from "@/components/routes/route-edit/RouteEditContent"

export default function RouteEditPage({ params }) {
  return (
    <PageLayout activePage="Routes" pageTitle="Edit Route">
      <RouteEditContent routeId={params.id} />
    </PageLayout>
  )
}
