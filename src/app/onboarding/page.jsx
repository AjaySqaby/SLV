import PageLayout from "@/components/layout/page-layout"
import OnboardingContent from "@/components/onboarding/onboarding-content"

export default function OnboardingPage() {
  return (
    <PageLayout activePage="Onboarding" pageTitle="Driver Onboarding">
      <OnboardingContent />
    </PageLayout>
  )
}
