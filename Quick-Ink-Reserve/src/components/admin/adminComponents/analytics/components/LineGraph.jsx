import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { months } from "../Functions";
import { fetchRevenueData } from "../Functions";
import { Headers } from "./BarCharts";
import { FaMoneyBillWave } from "react-icons/fa";
import { PiHandCoinsFill } from "react-icons/pi";

export function OrderCountData() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchRevenueData(setData, year);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [year]);

  return (
    <div className="w-[95%] h-full mx-auto flex p-4 rounded-xl transition-all bg-gray-800 hover:bg-gray-900 hover:translate-y-[-2px]">
      <div className="h-full w-3/4 flex flex-col gap-5 p-3">
        <Headers
          text="Revenue & Sales per Month"
          year={year}
          setYear={setYear}
          setData={setData}
          fetchData={fetchRevenueData}
        />
        <LineGraph data={data} />
      </div>
      <YearlyRevenue year={year} data={data}/>
    </div>
  );
}

export default function LineGraph({ data }) {
  return (
    <ResponsiveContainer className="mx-auto" width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Month" tickFormatter={(index) => months[index - 1]} />
        <YAxis dataKey="Revenue" tickFormatter={(value) => `₱${value}`} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Revenue"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Sales"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function YearlyRevenue({ year }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchRevenueData(setData, year);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [year]);

  const totalRevenue = data.reduce((acc, monthData) => acc + monthData.Revenue, 0);
  const totalSales = data.reduce((acc, monthData) => acc + monthData.Sales, 0)

  return (
    <div className="w-1/3 h-full flex flex-col gap-2">
      <div className="w-full h-1/2 bg-green-700 rounded-lg p-4">
        <div className="w-full h-full flex justify-evenly items-center bg-green-300 rounded-tr-2xl rounded-bl-2xl shadow-sm shadow-black">
          <div className="w-1/3 h-2/3 flex items-center justify-center rounded-full bg-gray-200">
            <h1><FaMoneyBillWave className="text-green-800 text-9xl rotate-45 p-5"/></h1>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-evenly items-center">
            <h1 className="text-5xl font-semibold text-gray-800">₱{totalRevenue.toFixed(2)}</h1>
            <h1 className="text-xl text-gray-800 font-semibold">Total Revenue <br/> <span className="text-green-800">Year: {year}</span></h1>
          </div>
        </div>
      </div>
      <div className="w-full h-1/2 bg-blue-700 rounded-lg p-4">
        <div className="w-full h-full flex justify-evenly items-center bg-blue-300 rounded-tr-2xl rounded-bl-2xl shadow-sm shadow-black">
          <div className="w-1/3 h-2/3 flex justify-center items-center rounded-full bg-gray-100">
            <h1><PiHandCoinsFill className="text-blue-800 font-semibold text-9xl rotate-[-12deg]"/></h1>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-evenly items-center">
            <h1 className="text-5xl font-semibold text-gray-800">+ {totalSales.toFixed(0)}</h1>
            <h1 className="text-xl font-semibold text-gray-700">Total Sales <br /> <span className="text-blue-800">Year: {year}</span></h1>
          </div>
        </div>
      </div>
    </div>
  )
}
