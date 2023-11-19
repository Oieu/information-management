import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchData, fetchInactiveData } from "./Functions";
import PieCharts from "./PieCharts";

export default function Analytics() {
  const [data, setData] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    fetchData(setData, year);
    fetchInactiveData(setInactiveUsers, year);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <header className="h-[10%] w-full">
        <h1 className="font-bold text-left ml-5 mb-5">Analytics</h1>
      </header>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="w-[95%] h-full mx-auto p-3 rounded-xl flex flex-col transition-all bg-gray-800 hover:bg-gray-900 hover:translate-y-[-2px]">
          <h2 className="w-[90%] font-bold text-3xl flex mx-auto gap-3 items-center">
            Users Registered | Year :
            <div className="flex items-center gap-2 w-1/4">
              <input
                type="text"
                value={year}
                className="w-1/3 h-full text-lg p-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onChange={(e) => setYear(e.target.value)}
              />
              <button
                className="bg-blue-500 text-lg text-black p-2 rounded-md w-1/3 h-full transition-all border-none hover:text-gray-200 hover:bg-blue-700 hover:translate-y-[-2px]"
                onClick={(e) => fetchData(setData, year)}
              >
                Filter
              </button>
            </div>
          </h2>
          <ResponsiveContainer className="mx-auto" width="95%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Month" name="Month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="Count"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-[95%] h-full bg-gray-200 mx-auto p-5 rounded-xl transition-all hover:bg-gray-100 hover:translate-y-[-2px]">
          <div className="w-full h-full flex gap-5 justify-center items-center mx-auto">
            <header className="w-2/5 flex flex-col gap-5">
              <h2 className="text-gray-600 w-1/2 font-bold text-4xl flex gap-3 text-left">
                Active vs Inactive Users
              </h2>
              <div className="flex w-full items-center">
                  <div className="flex gap-2 items-center">
                    <label className="text-3xl text-gray-500" htmlFor="year">Year:</label>
                    <input
                      type="text"
                      value={year}
                      className="w-1/2 p-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                  <div className="w-1/3">
                    <button
                      className="bg-blue-500 text-black p-2 rounded-md w-full transition-all border-none hover:text-gray-200 hover:bg-blue-700 hover:translate-y-[-2px]"
                      onClick={(e) => fetchInactiveData(setInactiveUsers, year)}
                    >
                      Filter
                    </button>
                  </div>
                </div>
            </header>
            <div className="h-full w-1/2">
              <PieCharts data={inactiveUsers}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
