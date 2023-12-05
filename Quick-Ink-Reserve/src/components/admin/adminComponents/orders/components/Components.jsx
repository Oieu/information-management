import React from "react";
import { createColumns } from "../functions";
import DataTable from "react-data-table-component";
import { styles } from "../../users/TableData";
import { StyleSheetManager } from "styled-components";

export function OrdersTable({ orders, handleUpdatePopup }) {
  return (
    <div className="w-auto h-full">
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
        />
      </StyleSheetManager>
    </div>
  );
}

export default OrdersTable;
