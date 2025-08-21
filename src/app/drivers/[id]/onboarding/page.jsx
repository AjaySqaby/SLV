import PageLayout from "@/components/layout/page-layout"
import OnboardingDetailsContent from "@/components/drivers/OnboardingDetailsContent"

export default function OnboardingDetailsPage({ params }) {
  return (
    <PageLayout activePage="Drivers" pageTitle="Onboarding Details">
      <OnboardingDetailsContent driverId={params.id} />
    </PageLayout>
  )
}
