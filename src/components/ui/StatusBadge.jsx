import React from 'react';
import { CheckCircle, Loader2, Clock, UserPlus, UserCheck, AlertTriangle, XCircle, PauseCircle, User } from 'lucide-react';

export default function StatusBadge({ status, fontSize = "text-xs", lateMinutes, showIcon = true }) {
  const normalizeStatus = (value) => {
    if (!value && value !== 0) return '';
    return String(value).trim().toLowerCase();
  };

  const getStatusStyles = (status) => {
    switch (normalizeStatus(status)) {
      // Existing cases
      case 'active':
        return { backgroundColor: '#8b5cf6', color: 'white', border: '1px solid #7c3aed' };
      case 'inactive':
        return { backgroundColor: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1' };
      case 'on leave':
        return { backgroundColor: '#fed7aa', color: '#9a3412', border: '1px solid #fdba74' };
      case 'pending':
        return { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' };
        
      // Completed states
      case 'completed':
        return { backgroundColor: '#bbf7d0', color: '#14532d', border: '1px solid #86efac' };
      case 'complete':
        return { backgroundColor: '#bbf7d0', color: '#14532d', border: '1px solid #86efac' };
        
      // In Progress states  
      case 'in progress':
        return { backgroundColor: 'var(--blue-100)', color: 'var(--blue-800)', border: '1px solid var(--blue-600)' };
      case 'in-progress':
        return { backgroundColor: 'var(--blue-100)', color: 'var(--blue-800)', border: '1px solid var(--blue-600)' };
        
      // Scheduled/Upcoming states
      case 'scheduled':
        return { backgroundColor: 'var(--amber-100)', color: 'var(--warning-dark)', border: '1px solid var(--warning)' };
      case 'upcoming':
        return { backgroundColor: 'var(--blue-100)', color: 'var(--blue-800)', border: '1px solid var(--blue-600)' };
        
      // Assignment states
      case 'assigned':
        return { backgroundColor: 'var(--primary-bg)', color: 'var(--purple-700)', border: '1px solid var(--purple-600)' };
      case 'accepted':
        return { backgroundColor: 'var(--green-100)', color: 'var(--success-dark)', border: '1px solid var(--green-600)' };
      case 'unassigned':
        return { backgroundColor: 'var(--gray-100)', color: 'var(--gray-700)', border: '1px solid var(--gray-300)' };
      case 'unaccepted':
        return { backgroundColor: 'var(--amber-100)', color: 'var(--warning-dark)', border: '1px solid var(--warning)' };
      
      // Driver presence states
      case 'ready now':
      case 'ready':
        return { backgroundColor: 'var(--green-100)', color: 'var(--success-dark)', border: '1px solid var(--green-600)' };
      case 'on active ride':
        return { backgroundColor: 'var(--blue-100)', color: 'var(--blue-800)', border: '1px solid var(--blue-600)' };
      case 'offline':
        return { backgroundColor: 'var(--gray-100)', color: 'var(--gray-700)', border: '1px solid var(--gray-300)' };
        
      // Problem states
      case 'delayed':
        return { backgroundColor: 'var(--red-100)', color: 'var(--red-800)', border: '1px solid var(--red-600)' };
      case 'late':
        return { backgroundColor: 'var(--red-100)', color: 'var(--red-800)', border: '1px solid var(--red-600)' };
      case 'rejected':
        return { backgroundColor: '#fecaca', color: '#7f1d1d', border: '1px solid #f87171' };
      case 'cancelled':
        return { backgroundColor: '#fecaca', color: '#7f1d1d', border: '1px solid #f87171' };
      case 'canceled':
        return { backgroundColor: '#fecaca', color: '#7f1d1d', border: '1px solid #f87171' };
        
      // Other states
      case 'not started':
        return { backgroundColor: 'var(--gray-100)', color: 'var(--gray-700)', border: '1px solid var(--gray-300)' };
      case 'substitute needed':
        return { backgroundColor: 'var(--amber-100)', color: 'var(--warning-dark)', border: '1px solid var(--warning)' };
        
      default:
        return { backgroundColor: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1' };
    }
  };

  const getStatusIcon = (status) => {
    const s = normalizeStatus(status);
    switch (s) {
      case 'completed':
      case 'complete':
        return CheckCircle;
      case 'in progress':
      case 'in-progress':
        return Loader2;
      case 'scheduled':
      case 'upcoming':
        return Clock;
      case 'assigned':
        return UserPlus;
      case 'accepted':
        return UserCheck;
      case 'unassigned':
        return User;
      case 'unaccepted':
      case 'substitute needed':
        return AlertTriangle;
      case 'late':
      case 'delayed':
        return AlertTriangle;
      case 'rejected':
      case 'canceled':
      case 'cancelled':
        return XCircle;
      case 'not started':
        return PauseCircle;
      case 'ready now':
      case 'ready':
        return UserCheck;
      case 'on active ride':
        return Loader2;
      case 'offline':
        return PauseCircle;
      default:
        return null;
    }
  };

  // Decide if the thin status bar should be rendered (only for active trip states)
  const shouldShowBar = () => {
    const s = normalizeStatus(status);
    const activeBarStatuses = new Set([
      'assigned', 'non assigned', 'non-assigned', 'unassigned',
      'accepted', 'unaccepted', 'not started', 'substitute needed',
      'in progress', 'in-progress', 'active', 'scheduled', 'upcoming',
      'on active ride', 'ready now'
    ]);
    if (s === 'rejected' || s === 'canceled' || s === 'cancelled' || s === 'completed' || s === 'complete') return false;
    return activeBarStatuses.has(s);
  };

  const getBarStyle = (status) => {
    const s = normalizeStatus(status);
    const base = { height: 4, borderRadius: 9999, marginTop: 6 };
    switch (s) {
      case 'in progress':
      case 'in-progress':
        return {
          ...base,
          backgroundImage: 'repeating-linear-gradient(45deg, var(--blue-800) 0, var(--blue-800) 10px, var(--blue-100) 10px, var(--blue-100) 20px)',
          backgroundSize: '40px 100%',
          animation: 'slv-progress-slide 1s linear infinite'
        };
      case 'assigned':
        return { ...base, backgroundColor: 'var(--purple)' };
      case 'non assigned':
      case 'non-assigned':
      case 'unassigned':
        return { ...base, backgroundColor: 'var(--gray-300)' };
      case 'accepted':
        return { ...base, backgroundColor: 'var(--success)' };
      case 'unaccepted':
        return { ...base, backgroundColor: 'var(--warning)' };
      case 'not started':
        return { ...base, backgroundColor: 'var(--gray-300)' };
      case 'substitute needed':
        return { ...base, backgroundColor: 'var(--warning)' };
      case 'scheduled':
      case 'upcoming':
        return { ...base, backgroundColor: 'var(--blue-600)' };
      default:
        return { ...base, backgroundColor: 'var(--gray-300)' };
    }
  };

  const statusStyles = getStatusStyles(status);
  const IconComp = showIcon ? getStatusIcon(status) : null;

  // Normalize Late/Delayed display text
  const normalized = normalizeStatus(status);
  let displayText = status;
  if (normalized === 'late' || normalized === 'delayed') {
    const mins = Number(lateMinutes);
    if (Number.isFinite(mins) && mins > 0) {
      displayText = `${mins} min Late`;
    } else {
      displayText = 'Late';
    }
  }
  
  return (
    <span className="inline-flex flex-col items-start w-max">
      <span 
        className={`inline-flex items-center px-3 w-max py-1 rounded-full ${fontSize} font-semibold`}
        style={{ 
          minHeight: '24px', 
          minWidth: '87px',
          ...statusStyles
        }}
      >
        {IconComp ? <IconComp className="w-3.5 h-3.5 mr-1.5" /> : null}
        {displayText}
      </span>
      {shouldShowBar() && (
        <span style={{ width: '100%', ...getBarStyle(status) }} aria-hidden="true" />
      )}
    </span>
  );
} 