import { Search } from "lucide-react";
import { useState } from "react";
import Input from "@/components/ui/Input";

// Simplified header search only; removed All/District/School/Partners buttons and dropdowns
export default function SearchFilters() {
  const [query, setQuery] = useState("");

  return (
    <div className="pb-4 w-full">
      <div className="relative w-full">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--muted-text)]" />
        <Input
          type="text"
          placeholder="Search district, campus, driver..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>
    </div>
  );
} 