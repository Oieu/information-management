import React, { useEffect, useState } from "react";
import { TabTitle } from "../../../../utils/GeneralFunctions";
import LoadingComponent from "../../../../utils/LoadingComponent";
import { getUserData, currentMonthIndex } from "./Functions";
import { PendingOrderCards, TotalAmountCards, UserCountCards } from "./Cards";

function Dashboard() {
  TabTitle("Dashboard", false);

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData(setData, setError, setLoading);
  }, []);

  if(loading) return <LoadingComponent loading={loading} />

  return (
    <div className="w-full h-[90%] relative overflow-hidden">
      <h1 className="mb-5">Dashboard</h1>
      <div className="w-[95%] h-full flex justify-evenly m-auto bg-[#090975] rounded-t-xl overflow-y-scroll p-10">
        <UserCountCards 
          data={data}
          currentMonthIndex={currentMonthIndex}
        />
        <PendingOrderCards setLoading={setLoading}/>
        <TotalAmountCards setLoading={setLoading}/>
      </div>
    </div>
  );
}

export default Dashboard;
