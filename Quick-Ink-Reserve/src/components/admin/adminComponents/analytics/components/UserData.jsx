import React, { useEffect, useState } from "react";
import { Headers, BarCharts, UserCount, UserCompare } from "./BarCharts";
import PieCharts, { Header } from "./PieCharts";
import { CardContainer } from "./Cards";
import LineGraph from "./LineGraph";
import { fetchRevenueData } from "../Functions";

function UserCountData({
  setData,
  fetchData,
  data,
  months,
  month,
  setMonth,
}) {
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <div className="w-[95%] h-full mx-auto flex p-3 rounded-xl transition-all bg-gray-800 hover:bg-gray-900 hover:translate-y-[-2px]">
      <div className="h-full w-3/4 flex flex-col gap-5 p-3">
        <Headers
          text="User Count per Month"
          year={year}
          setYear={setYear}
          setData={setData}
          fetchData={fetchData}
        />
        <BarCharts data={data} />
      </div>
      <div className="w-1/4 h-full flex flex-col p-3 gap-3">
        <UserCount data={data} />
        <UserCompare
          months={months}
          month={month}
          setMonth={setMonth}
          data={data}
        />
      </div>
    </div>
  );
}

export function UserStatusCompare({ inactiveUsers, setInactiveUsers }) {

  return (
    <div className="w-[95%] h-full flex bg-gray-200 mx-auto p-5 rounded-xl transition-all hover:bg-gray-100 hover:translate-y-[-2px]">
      <div className="w-2/3 h-full flex gap-5 justify-center items-center">
        <Header
          setInactiveUsers={setInactiveUsers}
        />
        <div className="h-full w-1/2">
          <PieCharts data={inactiveUsers} />
        </div>
      </div>
      <CardContainer inactiveUsers={inactiveUsers} />
    </div>
  );
}

export default UserCountData;
