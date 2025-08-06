import { DollarSign } from "lucide-react";
import Input from "@/components/ui/Input";

export default function RouteEditPaymentInfo() {
  return (
    <div className="bg-[var(--surface-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)] flex items-center">
        <DollarSign size={16} className="mr-2 text-[var(--muted-text)]" />
        <h2 className="font-medium text-[var(--heading)]">Payment Information</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              label="Driver Payment ($)"
              placeholder="Amount to pay driver"
              icon={<span className="absolute left-0 pl-3 text-[var(--muted-text)]">$</span>}
              className="pl-8"
            />
          </div>
          <div>
            <Input
              type="text"
              label="District Charge ($)"
              placeholder="Amount to charge district"
              icon={<span className="absolute left-0 pl-3 text-[var(--muted-text)]">$</span>}
              className="pl-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
