import React from "react";

function MaterialPagination({ servicesPerPage, setServicesPerPage, pageNumbers, handlePageChange, currentPage, setCurrentPage }) {
  return (
    <div className="w-11/12 mx-auto flex items-center h-16">
      <div className="w-1/4 h-full items-center flex gap-3">
        <label className="text-right" htmlFor="ServicePerPage">
          No. of rows per page:{" "}
        </label>
        <select
          id="servicePerPage"
          className="w-1/5 text-center h-10 border-2 border-black rounded-md cursor-pointer"
          value={servicesPerPage}
          onChange={(e) => setServicesPerPage(e.target.value)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
      <ul className="flex justify-end gap-4 w-3/4">
        {pageNumbers > 1 &&
          Array.from({ length: pageNumbers }, (_, i) => (
            <li key={i}>
              <button
                onClick={() => handlePageChange(i + 1, setCurrentPage)}
                className={`bg-gray-700 ${
                  i + 1 === currentPage
                    ? "font-bold underline text-white"
                    : "text-sky-400 hover:text-blue-500"
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

export default MaterialPagination;
