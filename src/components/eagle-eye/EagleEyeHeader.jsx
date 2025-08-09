import { ArrowLeft, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function EagleEyeHeader() {
  const router = useRouter();

  const handleBack = () => {
    // Try to go back in browser history first
    if (window.history.length > 1) {
      router.back();
    } else {
      // If no history, go to dashboard
      router.push('/dashboard');
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="bg-[var(--surface-bg)] border-b border-[var(--border)] py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="primary" 
          className="flex items-center bg-[var(--secondary)] text-white mr-4 px-3 py-1 rounded-md text-sm font-semibold transition-all duration-150 border-2 border-transparent hover:opacity-90"
          onClick={handleBack}
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Back</span>
        </Button>
        <h1 className="text-xl font-bold">Eagle Eye Live View</h1>
      </div>
      <Button
        variant="primary"
        className="flex items-center bg-[var(--blue)] text-white px-3 py-1 rounded-md text-sm font-semibold transition-all duration-150 border-2 border-transparent hover:opacity-90"
        onClick={handleRefresh}
      >
        <RefreshCw size={18} className="mr-1" />
        <span>Refresh</span>
      </Button>
    </div>
  );
} 