import { ArrowLeft, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

export default function EagleEyeHeader() {
  return (
    <div className="bg-[var(--surface-bg)] border-b border-[var(--border)] py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" className="flex items-center text-[var(--muted-text)] mr-4 p-0 h-auto min-w-0">
          <ArrowLeft size={18} className="mr-1" />
          <span className="text-sm">Back to Rides</span>
        </Button>
        <h1 className="text-xl font-bold">Eagle Eye Live View</h1>
      </div>
      <Button variant="ghost" className="flex items-center border text-[var(--muted-text)] p-0 h-auto min-w-0">
        <RefreshCw size={18} className="mr-1" />
        <span className="text-sm">Refresh</span>
      </Button>
    </div>
  );
} 