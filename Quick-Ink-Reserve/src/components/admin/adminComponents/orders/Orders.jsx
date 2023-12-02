import { TabTitle } from "../../../../utils/GeneralFunctions";
import axios from "axios";
import React, { useState } from "react";
import LoadingComponent from "../../../../utils/LoadingComponent";

function Orders() {
  TabTitle("Orders", false);
  const [orders, Setorders] = useState([]);


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
            </tr>
          </thead>
          <tbody>
            {/* Add your table rows here */}
          </tbody> 
          </table>
        </div>
      </>
    
      
      );
}

export default Orders;
