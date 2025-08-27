import Tabs from "@/components/ui/Tabs";

export default function CampusTabs({ tabs, activeTab, onChange }) {
  return (
    <Tabs tabs={tabs} activeTab={activeTab} onChange={onChange} />
  );
} 