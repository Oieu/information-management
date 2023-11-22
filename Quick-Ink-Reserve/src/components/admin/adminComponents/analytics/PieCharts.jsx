import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0088FE", "#FF8042"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieCharts({ data }) {
  return (
    <ResponsiveContainer className="mx-auto" width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="Count"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          formatter={(value, entry) =>
            entry.payload.fill === "#0088FE" ? "Active" : "Inactive"
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function Header({ year, setYear, fetchInactiveData }) {
  return (
    <header className="w-2/5 flex flex-col gap-5">
      <h2 className="text-gray-600 w-full font-bold text-4xl flex gap-3 text-left">
        Active vs Inactive Users
      </h2>
      <div className="flex w-full items-center">
        <div className="flex gap-2 items-center w-2/3">
          <label className="text-3xl text-gray-500" htmlFor="year">
            Year:
          </label>
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
  );
}
