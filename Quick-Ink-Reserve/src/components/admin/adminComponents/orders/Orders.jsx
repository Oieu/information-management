import { TabTitle } from "../../../../utils/GeneralFunctions";
import axios from "axios";
import React, { useState,  useEffect } from "react";
import LoadingComponent from "../../../../utils/LoadingComponent";
import "./Order.css";

function Orders() {
  TabTitle("Orders", false);
  const [orders, Setorders] = useState([]);
  const [UpdateStatus, setUpdateStatus] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

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
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  

    
    try {
      // Assuming your API endpoint for updating status is '/api/updateStatus'
      const response = await axios.post(`http://localhost:5000/updateStatus/${selectedOrder.orderID}`, {
        status: selectedStatus,
        // Add any other data you need to send in the request body
      });
      
      console.log("Status updated successfully", response.data.message);
      setUpdateStatus(false);
      window.location.reload();
    } catch (error) {
      // Handle the error
      console.error("Error updating status:", error);
      // Display an error message or take appropriate action
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

  return (
      <>
        <div>Orders</div>
        <div>
          <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Unique Order ID</th>
              <th>Custom Print Image URL</th>
              <th>Total Amount</th>
              <th>Ink Type</th>
              <th>Status</th>
              <th>Material</th>
              <th>Service</th>
              <th>Order Date</th>
              <th>User Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {orders.map(order => (
              <tr key={order.orderID}>
                <td>{order.orderID}</td>
                <td>{order.uniqueNum}</td>
                <td><a href ={`http://localhost:5000/${order.submissionURL}`} target="_blank">{order.submissionURL}</a></td>
                <td>{order.totalAMount} Php</td>
                <td>{order.inkType}</td>
                <td>{order.status}</td>
                <td>{order.matName}</td>
                <td>{order.genServiceName}</td>
                <td>{order.createdAt}</td>
                <td>{order.userName}</td>
                <td> <button onClick={() => handleUpdatePopup(order)}>Update status</button></td>
              </tr>
            ))}
          </tbody> 
          </table>
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
    </>
  );
}

export default Orders;