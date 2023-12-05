import React, { useEffect, useState } from "react";
import { RiUserFill } from "react-icons/ri";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { FaClipboardList, FaMoneyBill } from "react-icons/fa";
import axios from "axios";

export function UserCountCards({ data, currentMonthIndex }) {
  const previousMonthIndex = () => {
    if (currentMonthIndex() === 0) {
      return 11;
    } else {
      return currentMonthIndex() - 1;
    }
  };

  const percentIncrease = () => {
    const increase = ((data.Data[currentMonthIndex()].Count -
      data.Data[previousMonthIndex()].Count) /
      data.Data[previousMonthIndex()].Count) *
      100;
   
    const isIncreasePositive = increase > 0;
   
    return (
      <span className={`w-full h-1/5 flex items-center justify-evenly ${isIncreasePositive ? 'bg-green-400 text-green-700' : 'bg-red-300 text-red-700'}`}>
        {isIncreasePositive ? (
          <span className="text-xl w-[90%] text-left">
            + <BsArrowUpRight className="inline-block" />
            {increase.toFixed(2) === "Infinity" && 100}
            % from last month
          </span>
        ) : (
          <span className="text-xl w-[90%] text-left">
            <BsArrowDownRight className="inline-block" />{" "}
            {increase.toFixed(2)}
            % from last month
          </span>
        )}
      </span>
    );
   };
   
  return (
    <div className="h-[40%] w-1/3 bg-[#060641] p-5 pb-10 rounded-lg">
      <div className="flex flex-col w-full h-full bg-blue-200 m-auto">
        <div className="flex w-full h-4/5 bg-blue-200">
          <RiUserFill className="text-9xl m-auto text-blue-500 w-1/2" />
          <h1 className="text-gray-700 text-7xl w-1/2 m-auto">
            +{data.Data[currentMonthIndex()].Count} <br />
            <span className="text-3xl">Users</span>
          </h1>
        </div>
        {percentIncrease()}
      </div>
      <div className="flex justify-between items-center mt-1">
        <h2>Users registered this month</h2>
        <a href="/admin/analytics">
          More info...
          <BsArrowDownRight className="inline-block ml-2" />
        </a>
      </div>
    </div>
  );
}

export function PendingOrderCards({ setLoading }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/orders")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const pendingOrders = data.filter((order) => order.status === "pending");

  return (
    <div className="h-[40%] w-1/3 bg-[#060641] p-5 rounded-lg">
      <div className="flex w-full h-[90%] bg-blue-200 m-auto">
        <h1 className="text-orange-400 w-1/2 h-full">
          <FaClipboardList className="text-8xl m-auto h-full" />
        </h1>
        <p className="text-orange-800 text-7xl w-2/3 m-auto">
          {pendingOrders.length} <br />
          <span className="text-2xl">Pending Orders</span>
        </p>
      </div>
      <div className="flex justify-between items-center mt-1">
        <h2>Pending this month</h2>
        <a href="/admin/orders">
          Manage...
          <BsArrowDownRight className="inline-block ml-2" />
        </a>
      </div>
    </div>
  );
}

export function TotalAmountCards({ setLoading }) {
  const [totalAmountCurrentMonth, setTotalAmountCurrentMonth] = useState(0);
  const [totalAmountPreviousMonth, setTotalAmountPreviousMonth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCurrentMonth = await axios.get(
          `http://localhost:5000/admin/orders/total-amount/current-month`
        );
        const responsePreviousMonth = await axios.get(
          `http://localhost:5000/admin/orders/total-amount/previous-month`
        );

        setTotalAmountCurrentMonth(responseCurrentMonth.data?.total || 0);
        setTotalAmountPreviousMonth(responsePreviousMonth.data?.total || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const percentIncrease = () => {
    return (
    <span className="bg-green-400 w-full h-1/5 flex items-center justify-evenly">
      {totalAmountCurrentMonth > totalAmountPreviousMonth ? (
        <span className="text-green-700 text-xl w-[90%] text-left">
          <BsArrowUpRight className="inline-block" /> +
          {(
            ((totalAmountCurrentMonth - totalAmountPreviousMonth) /
              totalAmountPreviousMonth) *
            100
          ).toFixed(2) === "Infinity" && 100}
          % from last month
        </span>
      ) : (
        <span className="text-red-500">
          <BsArrowDownRight className="inline-block" />{" "}
          {(
            ((totalAmountPreviousMonth - totalAmountCurrentMonth) /
              totalAmountPreviousMonth) *
            100
          ).toFixed(2)}
          %
        </span>
      )}
    </span>)
  };

  return (
    <div className="h-[40%] w-1/3 bg-[#060641] p-5 rounded-lg">
      <div className="flex flex-col w-full h-[90%] bg-blue-200 m-auto">
        <div className="flex w-full h-4/5 bg-blue-200">
          <h1 className="text-green-400 w-1/2 h-full">
            <FaMoneyBill className="text-8xl m-auto h-full rotate-[120deg]" />
          </h1>
          <p className="text-green-800 text-4xl w-3/4 m-auto">
            ₱ {totalAmountCurrentMonth.toFixed(2)} <br />
            <span className="text-2xl">Total Amount</span>
          </p>
        </div>
        {percentIncrease()}
      </div>
      <div className="flex justify-between items-center mt-1">
        <h2>Amount this month</h2>
        <a href="/admin/analytics">
          More info...
          <BsArrowDownRight className="inline-block ml-2" />
        </a>
      </div>
    </div>
  );
}
