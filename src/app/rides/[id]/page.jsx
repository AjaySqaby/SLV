import PageLayout from "@/components/layout/page-layout"
import RideDetailContent from "@/components/rides/RideDetailContent"

export default function RideDetailPage({ params }) {
  return (
    <PageLayout activePage="Rides" pageTitle="Ride Details">
      <RideDetailContent rideId={params.id} />
    </PageLayout>
  )
}
