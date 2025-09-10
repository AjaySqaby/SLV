import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

export default function Pagination({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) {
    return null;
  }

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = totalPages <= 7 
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : getVisiblePages();

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
        
        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => (
            page === '...' ? (
              <span 
                key={`dots-${index}`} 
                className="px-3 py-2 text-sm text-[var(--gray-500)]"
              >
                ...
              </span>
            ) : (
              <Button
                key={page}
                onClick={() => onPageChange(page)}
                variant={currentPage === page ? "primary" : "secondary"}
                className={`px-3 py-2 text-sm min-w-[40px] ${
                  currentPage === page 
                    ? "bg-[var(--purple)] text-white border-[var(--purple)]" 
                    : "text-[var(--gray-700)] border-[var(--gray-300)] hover:bg-[var(--gray-50)]"
                }`}
              >
                {page}
              </Button>
            )
          ))}
        </div>
        
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
  );
}
