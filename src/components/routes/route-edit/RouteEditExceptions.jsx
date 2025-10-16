"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { Calendar, Plus, Trash2 } from "lucide-react";

export default function RouteEditExceptions() {
  const [exceptions, setExceptions] = useState([]);
  const [exceptionDate, setExceptionDate] = useState("");
  const [exceptionType, setExceptionType] = useState("No School");
  const [exceptionNotes, setExceptionNotes] = useState("");

  const addException = () => {
    if (!exceptionDate || !exceptionType) return;
    setExceptions(prev => [...prev, { date: exceptionDate, type: exceptionType, notes: exceptionNotes }]);
    setExceptionDate("");
    setExceptionType("No School");
    setExceptionNotes("");
  };

  const removeException = (idx) => {
    setExceptions(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--heading)' }}>Exceptions</h3>
      <p className="text-sm mb-4" style={{ color: 'var(--muted-text)' }}>Add dates when this route should not run (holidays, teacher work days, etc.)</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <label className="block text-xs text-[var(--muted-text)] mb-1">Date</label>
          <div className="relative">
            <Input type="date" value={exceptionDate} onChange={(e)=>setExceptionDate(e.target.value)} className="pl-10" />
            <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--gray-400)]" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-[var(--muted-text)] mb-1">Type</label>
          <Select
            value={exceptionType}
            onChange={(e)=>setExceptionType(e.target.value)}
            options={[
              { value: "No School", label: "No School" },
              { value: "Holiday", label: "Holiday" },
              { value: "Teacher Work Day", label: "Teacher Work Day" },
              { value: "Weather", label: "Weather" },
              { value: "Other", label: "Other" },
            ]}
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--muted-text)] mb-1">Notes</label>
          <Input type="text" value={exceptionNotes} onChange={(e)=>setExceptionNotes(e.target.value)} placeholder="Optional notes" />
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <Button className="flex items-center gap-2 text-sm" onClick={addException}>
          <Plus size={16} />
          Add Exception
        </Button>
      </div>

      {exceptions.length > 0 && (
        <div className="mt-4 border rounded-md" style={{ borderColor: 'var(--gray-200)' }}>
          {exceptions.map((ex, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border-b last:border-b-0" style={{ borderColor: 'var(--gray-200)' }}>
              <div className="text-sm">
                <div className="font-medium" style={{ color: 'var(--heading)' }}>{ex.date} • {ex.type}</div>
                {ex.notes && <div className="text-[var(--muted-text)]">{ex.notes}</div>}
              </div>
              <button className="text-red-600 hover:text-red-700" onClick={()=>removeException(idx)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}


