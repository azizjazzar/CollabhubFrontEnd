// PaginationBar.js
import React from "react";

function PaginationBar({ pageNumbers, currentPage, paginate }) {
  const renderPageNumbers = pageNumbers.map((number) => (
    <button
      key={number}
      onClick={() => paginate(number)}
      className={
        currentPage === number
          ? "bg-blue-500 text-white px-4 py-2 mx-1 rounded-full focus:outline-none"
          : "bg-white text-gray-700 px-4 py-2 mx-1 rounded-full hover:bg-gray-200 focus:outline-none"
      }
    >
      {number}
    </button>
  ));

  return <div className="flex justify-center">{renderPageNumbers}</div>;
}

export default PaginationBar;
