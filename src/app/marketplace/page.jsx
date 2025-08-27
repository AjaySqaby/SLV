import PageLayout from "@/components/layout/page-layout"
import MarketplaceContent from "@/components/marketplace/marketplace-content"

export default function MarketplacePage() {
  return (
    <PageLayout activePage="Marketplace" pageTitle="Marketplace">
      <MarketplaceContent />
    </PageLayout>
  )
}
