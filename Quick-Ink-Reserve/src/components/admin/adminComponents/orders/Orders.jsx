import { TabTitle } from "../../../../utils/GeneralFunctions";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingComponent from "../../../../utils/LoadingComponent";
import "./Order.css";
import { createColumns } from "./functions";
import DataTable from "react-data-table-component";
import { styles } from "../users/TableData";
import { StyleSheetManager } from "styled-components";

function Orders() {
  TabTitle("Orders", false);
  const [orders, Setorders] = useState([]);
  const [UpdateStatus, setUpdateStatus] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/orders");

        if (Array.isArray(response.data)) {
          Setorders(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/updateStatus/${selectedOrder.orderID}`,
        {
          status: selectedStatus,
        }
      );

      console.log("Status updated successfully", response.data.message);
      setUpdateStatus(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdatePopup = (order) => {
    setUpdateStatus(true);
    setSelectedOrder(order);
  };

  const handleUpdatePopupClose = () => {
    setUpdateStatus(false);
    setSelectedOrder(null);
    setSelectedStatus("");
  };

  if (loading) {
    return <LoadingComponent loading={loading} />;
  }

  return (
    <div className="w-full h-[90%] flex flex-col gap-5">
      <header className="flex flex-col gap ml-5 h-[10%] text-white">
        <div className="flex items-center gap-5 w-[90%]">
          <h1 className="text-left">Orders</h1>
        </div>
        <p className="text-left">
          This component will allow the admin to see orders made by the users.
          Here they can also update the status of the order.
        </p>
      </header>
      <div className="w-full h-full">
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
            style={styles}
            scrollX
          />
        </StyleSheetManager>
      </div>
      {UpdateStatus && selectedOrder && (
        <div className="popup-container">
          <div className="popup-content">
            <form onSubmit={handleSubmit}>
              <label htmlFor="status">Update Status:</label>
              <select
                id="status"
                name="status"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="">Select Status</option>
                <option value="pending">pending</option>
                <option value="on-going">on-going</option>
                <option value="completed">completed</option>
              </select>
              <button className="submit-button" type="submit">
                Update
              </button>
            </form>
            <button className="close-button" onClick={handleUpdatePopupClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
