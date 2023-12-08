import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import axios from 'axios';

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const OrderBarChart = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const totalDaysInMonth = getDaysInMonth(currentYear, currentMonth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/api/order/" + currentMonth);
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, [currentMonth]);

  const data = Array.from({ length: totalDaysInMonth }, (_, index) => {
    const dayOfMonth = index + 1;
    const ordersForDay = orders.filter(order => {
      const orderDay = new Date(order.createdAt).getDate();
      return orderDay === dayOfMonth;
    });

    const totalAmount = ordersForDay.reduce((acc, order) => acc + order.totalAmount, 0);

    return {
      day: dayOfMonth.toString(),
      revenue: totalAmount,
    };
  });

  return (
    <div className='w-2/3 h-full bg-[#060641] rounded-lg p-2'>
      <BarChart width={900} height={375} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default OrderBarChart;
