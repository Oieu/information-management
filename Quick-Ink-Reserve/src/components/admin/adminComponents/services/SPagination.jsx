import React from "react";

function SPagination({ pageNumbers, setCurrentPage, currentPage }) {
  return (
    <div className="w-3/4 flex justify-end items-center">
      <ul className="pagination">
        {pageNumbers > 1 &&
          Array.from({ length: pageNumbers }, (_, i) => (
            <li
              key={i}
              className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
            >
              <button
                onClick={() => setCurrentPage(i + 1)}
                className={`${
                  i + 1 === currentPage
                    ? "font-bold underline text-white"
                    : "text-blue-600 hover:text-blue-900"
                } cursor-pointer`}
              >
                {i + 1}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SPagination;
