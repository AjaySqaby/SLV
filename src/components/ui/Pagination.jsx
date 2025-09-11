import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

export default function Pagination({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange,
  onItemsPerPageChange 
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) {
    return null;
  }

  const itemsPerPageOptions = [1, 5, 10, 25, 50];

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-[var(--gray-200)]">
      <div className="flex items-center text-sm text-[var(--gray-700)]">
        <span>
          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
          <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{' '}
          of <span className="font-medium">{totalItems}</span> results
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange && onItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--purple)] focus:border-[var(--purple)]"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="text-sm text-[var(--gray-700)]">items per page</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-2 text-sm"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
          
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-2 text-sm"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
