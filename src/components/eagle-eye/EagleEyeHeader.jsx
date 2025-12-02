import { ArrowLeft, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function EagleEyeHeader() {
  const router = useRouter();

  const handleBack = () => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      router.push('/dashboard');
      return;
    }
    // Try to go back in browser history first
    if (window.history.length > 1) {
      router.back();
    } else {
      // If no history, go to dashboard
      router.push('/dashboard');
    }
  };

  const handleRefresh = () => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-3xl font-bold mb-8">Eagle Eye Live View</h1>
      <Button
        className="text-sm flex items-center justify-center font-medium gap-2 bg-gradient-to-r from-[var(--purple-600)] to-[var(--blue)] hover:from-[var(--purple-700)] hover:to-[var(--blue-600)] whitespace-nowrap transition-all duration-200 hover:shadow-md"
        onClick={handleRefresh}
      >
        <RefreshCw size={18} />
        <span>Refresh</span>
      </Button>
    </div>
  );
} 