import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUsers } from "react-icons/fa";
import { RiUserSharedFill } from "react-icons/ri";
import { FaArrowUpRightDots } from "react-icons/fa6";

export function Headers({ text, year, setYear, setData, fetchData }) {
  return (
    <h2 className="w-[90%] h-[10%] font-bold text-3xl flex mx-auto gap-3 items-center">
      {text}
      <div className="flex items-center gap-2 w-1/4">
        <input
          type="text"
          value={year}
          className="w-1/3 h-full text-lg p-2 rounded-lg bg-gray-500 border-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
  );
}

export function BarCharts({ data }) {
  return (
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
  );
}

export function UserCount({ data }) {
  return (
    <div className="w-full h-1/2 flex p-5 bg-gray-600 rounded-xl hover:bg-gray-700">
      <h2 className="text-gray-200 text-3xl font-bold text-center w-1/2 h-full flex justify-center items-center">
        Total No. of <br></br> Users Registered
      </h2>
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <FaUsers className="w-2/3 h-2/3 m-auto text-gray-200" />
        <h1 className="text-gray-200 text-3xl font-bold text-center w-2/3 h-1/3">
          {data.reduce((acc, curr) => acc + curr.Count, 0)}
        </h1>
      </div>
    </div>
  );
}

export function UserCompare({ months, month, setMonth, data }) {
  const currentMonthUsers = data[months.indexOf(month)].Count;
  const previousMonthUsers = data[months.indexOf(month) - 1]?.Count;

  let percentageChange = Math.round(((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100);
  percentageChange === Infinity ? percentageChange = 100 : percentageChange = percentageChange;
  //percentageChange === NaN ? percentageChange = 100 : percentageChange = percentageChange

  return (
    <div className="w-full h-1/2 bg-gray-600 p-5 rounded-xl hover:bg-gray-700">
      <h2 className="text-gray-200 text-3xl font-bold text-center w-full h-1/2">
        No. of Users <br></br> Month :
        <select
          className="w-1/3 p-2 text-base m-auto rounded-lg ml-3 bg-gray-800"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </h2>
      <div className="h-1/2 w-full flex justify-evenly items-center">
        <div className="flex flex-col w-1/2 justify-center items-center gap-2">
          <div className="w-full h-2/3 flex items-center">
            <RiUserSharedFill className="h-1/3 w-1/4 text-blue-200"/>
            <h1 className="text-blue-400">{data[months.indexOf(month)].Count}</h1>
          </div>
          <h3 className="w-full h-1/3 flex">Previous month: {data[(months.indexOf(month))-1].Count}</h3>
        </div>
        <div className="flex gap-3 items-center h-full">
          {percentageChange > 0 ? (
            <FaArrowUpRightDots className="w-1/2 h-1/2 text-green-400" />
          ) : (
            <FaArrowUpRightDots className="w-full h-1/2 text-red-400 rotate-90" />
          )}
          <h2 className="text-gray-200 text-3xl">{percentageChange}%</h2>
        </div>
      </div>
    </div>
  );
}
