import React, { useState, useEffect } from "react";
import { createColumns } from "../functions";
import DataTable from "react-data-table-component";
import { styles } from "../../users/TableData";
import { StyleSheetManager } from "styled-components";
import { BsSearch } from "react-icons/bs";
import JsPDF from "jspdf";
import "jspdf-autotable";

export function OrdersTable({ orders, handleUpdatePopup }) {
  return (
    <div className="w-full max-h-[800px]">
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
        <DataTable
          columns={createColumns(handleUpdatePopup)}
          data={orders}
          pagination
          paginationRowsPerPageOptions={[10, 20, 30]}
          className="w-full bg-white border border-gray-300 shadow-md"
          noDataComponent={<span>No orders found.</span>}
          defaultSortField="userName"
          defaultSortAsc={true}
          highlightOnHover
          paginationComponentOptions={{
            rowsPerPageText: "No. of rows per page:",
            rangeSeparatorText: "of",
            noRowsPerPage: false,
            selectAllRowsItem: false,
          }}
          customStyles={styles}
          scrollX
          overflowY
        />
      </StyleSheetManager>
    </div>
  );
}

export function Actions({ data, setFilter}) {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setFilter(data.filter((order) => {
      const matchesSearch = (
        order.userName.toLowerCase().includes(search.toLowerCase()) ||
        order.uniqueNum.toLowerCase().includes(search.toLowerCase())
      );
  
      const matchesDateRange = (
        (!startDate || new Date(order.createdAt) >= new Date(startDate)) &&
        (!endDate || new Date(order.createdAt) <= new Date(endDate))
      );
  
      return matchesSearch && matchesDateRange;
    }));
  }, [search, startDate, endDate]);  

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new JsPDF(orientation, unit, size);

    doc.setFontSize(12);

    const title = "Orders Report";
    const headers = [["Order No.", "Username", "Material", "Service", "Amount"]];
    const filter = data.map((elt) => [elt.uniqueNum, elt.userName, elt.matName, elt.genServiceName, elt.totalAMount]);

    let content = {
      startY: 50,
      head: headers,
      body: filter,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("orders-report.pdf");
  };

  return (
    <div className="flex items-end gap-5 w-full bg-gray-950 h-20 p-2">
      <div className="flex items-center w-1/4 gap-2">
        <label className="text-xl" htmlFor="search"><BsSearch /></label>
        <input
          className="border border-gray-300 rounded-md p-2 w-4/5"
          type="text"
          id="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-1/5">
        <select
          className="border border-gray-300 rounded-md p-2 w-full bg-gray-300 text-gray-700"
          name="status"
          id="status"
          onChange={(e) => setFilter(data.filter((order) => order.status === e.target.value))}
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="on-going">On-going</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="w-1/3 flex gap-2">
        <div className="w-1/2 flex flex-col items-end">
          <label className="text-left w-4/5" htmlFor="start">Start Date:</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-4/5 bg-gray-300 text-gray-700"
            type="date"
            id="start-date"
            name="start-date"
            placeholder="Start Date"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <label className="text-left" htmlFor="end">End Date:</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-4/5 bg-gray-300 text-gray-700"
            type="date"
            id="end-date"
            name="end-date"
            placeholder="End Date"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <button className="w-1/6 bg-blue-400 hover:bg-blue-600 transition-all border-0 hover:translate-y-[-2px]" onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default OrdersTable;
