import React, { useState, useEffect } from "react";
import axios from "axios";

function RecentSales() {
  const [orders, setOrders] = useState([]);
  const month = new Date().getMonth() + 1;

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get(
        "http://localhost:5000/admin/api/order/" + month
      );
      setOrders(res.data);
    };
    getOrders();
  }, []);

  return (
    <div className="w-1/3 h-full bg-[#060641] rounded-lg p-5">
      <h1 className="text-2xl">Recent Sales</h1>
      <div className="w-full overflow-scroll max-h-[400px] my-2">
        <div className="flex justify-between flex-col items-center relative">
          <div className="flex justify-between w-full bg-gray-600 p-2 sticky top-0">
            <div className="flex w-1/2 gap-5">
              <span className="w-2/3 text-left">User Details</span>
            </div>
            <span className="text-green-400">Total Price</span>
          </div>
          {orders.map((order) => (
            <div className="flex justify-between items-center text-gray-700 p-2 w-full bg-gray-300">
              <div className="flex w-1/2 gap-2">
                <div className="w-1/3">
                    <img
                        src={`http://localhost:5000/${order.profilePicture}`}
                        alt="profpic"
                        className="w-10 h-10 rounded-full"
                    />
                </div>
                <span className="w-2/3 text-left">{order.userName}</span>
              </div>
              <span className="text-green-700">₱ {order.totalAmount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentSales;
