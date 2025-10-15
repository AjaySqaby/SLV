"use client";

import { useState, useMemo } from "react";
import { X, MapPin, Route, Edit2, Plus, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function RouteConfirmModal({ isOpen, onClose, routeDraft, onConfirm }) {
  const [pickup, setPickup] = useState(routeDraft?.customPickupAddress || "");
  const [dropoff, setDropoff] = useState(routeDraft?.customDropoffAddress || "");
  const [waypoints, setWaypoints] = useState(() => {
    const stops = routeDraft?.additionalStops || [];
    return [
      { type: "pickup", label: "Pickup", address: pickup || "Pickup Address" },
      ...stops.map((s, i) => ({ type: "stop", label: `Stop ${i+1}`, address: s.address || s.name || "Stop" })),
      { type: "dropoff", label: "Dropoff", address: dropoff || "Dropoff Address" }
    ];
  });
  const [newWaypoint, setNewWaypoint] = useState("");

  if (!isOpen) return null;

  const moveWaypoint = (index, dir) => {
    const target = index + (dir === 'up' ? -1 : 1);
    if (target < 0 || target >= waypoints.length) return;
    const next = [...waypoints];
    const tmp = next[index];
    next[index] = next[target];
    next[target] = tmp;
    setWaypoints(next);
  };

  const removeWaypoint = (index) => {
    if (waypoints[index].type === 'pickup' || waypoints[index].type === 'dropoff') return;
    setWaypoints(prev => prev.filter((_, i) => i !== index));
  };

  const addWaypoint = () => {
    if (!newWaypoint.trim()) return;
    const insertIdx = Math.max(1, waypoints.length - 1);
    const next = [...waypoints];
    next.splice(insertIdx, 0, { type: 'stop', label: `Stop ${insertIdx}`, address: newWaypoint.trim() });
    setWaypoints(next);
    setNewWaypoint("");
  };

  const effectivePickup = pickup || waypoints[0]?.address || "";
  const effectiveDropoff = dropoff || waypoints[waypoints.length-1]?.address || "";

  const handleConfirm = () => {
    const payload = {
      ...routeDraft,
      customPickupAddress: effectivePickup,
      customDropoffAddress: effectiveDropoff,
      adjustedWaypoints: waypoints.map(w => ({ type: w.type, address: w.address })),
    };
    onConfirm?.(payload);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden flex flex-col" onClick={(e)=>e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--gray-200)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
              <Route className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>Confirm Route</h2>
              <p className="text-sm" style={{ color: 'var(--muted-text)' }}>Review and adjust route details before finalizing</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors">
            <X className="w-6 h-6 text-[var(--gray-500)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 grid grid-cols-12 gap-4 p-6 overflow-auto">
          {/* Map Preview */}
          <div className="col-span-12 lg:col-span-7">
            <Card className="p-0 overflow-hidden">
              <div className="h-[60vh] bg-[var(--surface-muted)] relative">
                {/* Placeholder map embed */}
                <iframe
                  title="route-map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212270.7411321579!2d-84.56068880277875!3d33.76804936776367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5045d6993098d%3A0x66fede2f990b630b!2sAtlanta%2C%20GA!5e0!3m2!1sen!2sus!4v1621361323087!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
                {/* Overlay route line placeholder */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full">
                    <path d="M 100 150 Q 300 80 500 140 Q 700 200 900 260" stroke="var(--blue)" strokeWidth="4" fill="none" strokeDasharray="8,4" />
                  </svg>
                </div>
              </div>
            </Card>
          </div>

          {/* Route Info & Editing */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3" style={{ color: 'var(--heading)' }}>Route Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[var(--muted-text)]">Route ID</span><span className="font-medium">{routeDraft?.routeId || '—'}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted-text)]">Type</span><span className="font-medium">{routeDraft?.routeType === 'oneWay' ? 'One Way' : 'Round Trip'}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted-text)]">Days</span><span className="font-medium">Mon–Fri</span></div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--heading)' }}>
                <MapPin className="w-4 h-4" /> Pickup / Dropoff
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-[var(--muted-text)] mb-1">Pickup Address</label>
                  <Input value={pickup} onChange={(e)=>setPickup(e.target.value)} placeholder="Enter custom pickup address" />
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted-text)] mb-1">Dropoff Address</label>
                  <Input value={dropoff} onChange={(e)=>setDropoff(e.target.value)} placeholder="Enter custom dropoff address" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--heading)' }}>
                <Edit2 className="w-4 h-4" /> Adjust Driving Route
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input value={newWaypoint} onChange={(e)=>setNewWaypoint(e.target.value)} placeholder="Add waypoint address" />
                  <Button className="px-3" onClick={addWaypoint}><Plus className="w-4 h-4" /></Button>
                </div>
                <div className="border rounded-md divide-y" style={{ borderColor: 'var(--gray-200)' }}>
                  {waypoints.map((wp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded ${wp.type==='pickup' ? 'bg-green-100 text-green-700' : wp.type==='dropoff' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{wp.label}</span>
                        <span className="text-sm" style={{ color: 'var(--heading)' }}>{wp.address}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="w-8 h-8 rounded hover:bg-[var(--hover-bg)] flex items-center justify-center" onClick={()=>moveWaypoint(idx, 'up')}><ChevronUp className="w-4 h-4" /></button>
                        <button className="w-8 h-8 rounded hover:bg-[var(--hover-bg)] flex items-center justify-center" onClick={()=>moveWaypoint(idx, 'down')}><ChevronDown className="w-4 h-4" /></button>
                        {wp.type==='stop' && (
                          <button className="w-8 h-8 rounded hover:bg-[var(--hover-bg)] flex items-center justify-center" onClick={()=>removeWaypoint(idx)}><Trash2 className="w-4 h-4 text-red-600" /></button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t" style={{ borderColor: 'var(--gray-200)' }}>
          <Button variant="secondary" onClick={onClose}>Back</Button>
          <Button onClick={handleConfirm}>Confirm & Create</Button>
        </div>
      </div>
    </div>
  );
}


