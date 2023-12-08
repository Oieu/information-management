import React, { useEffect, useState } from "react";
import { TabTitle } from "../../../../utils/GeneralFunctions";
import LoadingComponent from "../../../../utils/LoadingComponent";
import { getUserData, currentMonthIndex } from "./Functions";
import { PendingOrderCards, TotalAmountCards, UserCountCards } from "./Cards";
import RecentSales from "./RecentSales";
import OrderBarChart from "./OrderBarChart";

function Dashboard() {
  TabTitle("Dashboard", false);

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData(setData, setError, setLoading);
  }, []);

  if (loading) return <LoadingComponent loading={loading} />;

  return (
    <div className="w-full h-[90%] relative overflow-hidden">
      <h1 className="mb-5">Dashboard</h1>
      <div className="w-[95%] h-full flex flex-col gap-5 justify-evenly m-auto bg-[#090975] rounded-t-xl overflow-hidden p-10">
        <div className="w-full h-[40%] flex m-auto gap-5">
          <UserCountCards data={data} currentMonthIndex={currentMonthIndex} />
          <PendingOrderCards setLoading={setLoading} />
          <TotalAmountCards setLoading={setLoading} />
        </div>
        <div className="w-full h-[60%] flex gap-5">
          <OrderBarChart />
          <RecentSales />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
