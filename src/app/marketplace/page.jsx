import MarketplaceContent from "@/components/marketplace/marketplace-content";
import PageLayout from "@/components/layout/page-layout";

export default function MarketplacePage() {
  return (
    <PageLayout activePage="Marketplace">
      <MarketplaceContent />
    </PageLayout>
  );
}
