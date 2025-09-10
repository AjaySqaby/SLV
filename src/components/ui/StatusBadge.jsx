import React from 'react';

export default function StatusBadge({ status, fontSize = "text-xs" }) {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
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
        return { backgroundColor: '#bfdbfe', color: '#1e3a8a', border: '1px solid #93c5fd' };
      case 'in-progress':
        return { backgroundColor: '#bfdbfe', color: '#1e3a8a', border: '1px solid #93c5fd' };
        
      // Scheduled/Upcoming states
      case 'scheduled':
        return { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' };
      case 'upcoming':
        return { backgroundColor: '#bfdbfe', color: '#1e3a8a', border: '1px solid #93c5fd' };
        
      // Assignment states
      case 'assigned':
        return { backgroundColor: '#e9d5ff', color: '#581c87', border: '1px solid #d8b4fe' };
      case 'accepted':
        return { backgroundColor: '#bbf7d0', color: '#14532d', border: '1px solid #86efac' };
      case 'unassigned':
        return { backgroundColor: '#e5e7eb', color: '#111827', border: '1px solid #d1d5db' };
      case 'unaccepted':
        return { backgroundColor: '#fed7aa', color: '#9a3412', border: '1px solid #fdba74' };
        
      // Problem states
      case 'delayed':
        return { backgroundColor: '#fecaca', color: '#7f1d1d', border: '1px solid #f87171' };
      case 'late':
        return { backgroundColor: '#fecaca', color: '#7f1d1d', border: '1px solid #f87171' };
      case 'rejected':
        return { backgroundColor: '#fecaca', color: '#7f1d1d', border: '1px solid #f87171' };
      case 'cancelled':
        return { backgroundColor: '#fecaca', color: '#7f1d1d', border: '1px solid #f87171' };
      case 'canceled':
        return { backgroundColor: '#fecaca', color: '#7f1d1d', border: '1px solid #f87171' };
        
      // Other states
      case 'not started':
        return { backgroundColor: '#e5e7eb', color: '#111827', border: '1px solid #d1d5db' };
      case 'substitute needed':
        return { backgroundColor: '#fed7aa', color: '#9a3412', border: '1px solid #fdba74' };
        
      default:
        return { backgroundColor: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1' };
    }
  };

  const statusStyles = getStatusStyles(status);
  
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full ${fontSize} font-semibold`}
      style={{ 
        minHeight: '24px', 
        minWidth: '60px',
        ...statusStyles
      }}
    >
      {status}
    </span>
  );
} 