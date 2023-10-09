import React from "react";
import "./pagination.css"

const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => {
  return (
    <div className="pagination-container">
      <button onClick={onPrev} disabled={currentPage === 0}>
        Prev
      </button>
      <span>
        Página {currentPage + 1} de {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
