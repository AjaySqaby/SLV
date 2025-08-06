import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
export default function RouteEditHeader({ onClose }) {
  return (
    <div className="bg-gradient-to-r from-[var(--header-gradient-from)] via-[var(--header-gradient-via)] to-[var(--header-gradient-to)] py-4 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center text-[var(--header-logo)]">
        <Button onClick={onClose} variant="ghost" className="mr-4">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-medium">Edit Route</h1>
      </div>
      <Button variant="secondary" className="bg-[var(--surface-bg)] text-[var(--primary)] px-4 py-2 rounded-full text-sm font-medium shadow-sm">
        Save Changes
      </Button>
    </div>
  );
} 