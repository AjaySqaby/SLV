import Button from "@/components/ui/Button";
export default function RouteEditTabs({ activeTab, setActiveTab }) {
  return (
    <div className="bg-[var(--surface-bg)] border-b border-[var(--border)] px-6 mt-4">
      <div className="flex space-x-6">
        {["Route Details", "Route Map"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "primary" : "ghost"}
            className={`py-4 px-2 font-medium text-sm border-b-2 ${activeTab === tab ? "border-[var(--primary)]" : "border-transparent"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>
    </div>
  );
} 