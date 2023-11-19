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

  console.log(inactiveUsers)

  return (
    <div className="w-full h-full flex flex-col">
      <header className="h-[10%] w-full">
        <h1 className="font-bold text-left ml-5">Analytics</h1>
      </header>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="w-full h-1/2 flex flex-col">
          <h2 className="w-[90%] font-bold text-3xl flex mx-auto gap-3 items-center">
            Users Registered | Year :
            <div className="flex items-center gap-2 w-1/4">
              <input
                type="text"
                value={year}
                className="w-1/3 p-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onChange={(e) => setYear(e.target.value)}
              />
              <button
                className="bg-blue-500 text-black p-2 rounded-md w-1/3 transition-all border-none hover:text-gray-200 hover:bg-blue-700 hover:translate-y-[-2px]"
                onClick={fetchData}
              >
                Filter
              </button>
            </div>
          </h2>
          <ResponsiveContainer className="mx-auto" width="100%" height="90%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Month" name="Month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Count"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-4/5 h-full flex gap-5 justify-center items-center mx-auto">
          <header className="w-1/2 flex flex-col gap-5">
            <h2 className="w-full font-bold text-4xl flex mx-auto gap-3 text-left">
              Active vs Inactive Users
            </h2>
            <div className="flex gap-5 w-full items-center justify-center">
                <div className="flex gap-5 w-1/2 items-center">
                  <label className="text-3xl text-left w-1/2" htmlFor="year">Year :</label>
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
                    onClick={() => fetchInactiveData(setInactiveUsers, year)}
                  >
                    Filter
                  </button>
                </div>
              </div>
          </header>
          <PieCharts data={inactiveUsers}/>
        </div>
      </div>
    </div>
  );
}
