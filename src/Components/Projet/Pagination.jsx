import React from 'react';

const Pagination = ({ onPageChange, currentPage, projects, pageSize }) => {
  // Safeguard against projects being undefined
  const totalPages = projects ? Math.ceil(projects.length / pageSize) : 0;

  const renderPaginationLinks = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
      <li className={pageNumber === currentPage ? "activerPagination" : ""} key={pageNumber}>
        <button onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
      </li>
    ));
  };

  return (
    <ul className='pagination my-8 flex gap-1'>
      <li>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
      </li>
      {renderPaginationLinks()}
      <li>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
