import React, { useEffect, useState } from "react";
import { TabTitle } from "../../../../utils/GeneralFunctions";
import LoadingComponent from "../../../../utils/LoadingComponent";
import { getUserData, currentMonthIndex } from "./Functions";
import { UserCountCards } from "./Cards";

function Dashboard() {
  TabTitle("Dashboard", false);

  const [data, setData] = useState([]);
  const [materialData, setMaterialData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData(setData, setError, setLoading);
  }, []);

  //console.log(data);
  if(loading) return <LoadingComponent loading={loading} />

  return (
    <div className="w-full h-[90%] relative overflow-hidden">
      <h1 className="mb-5">Dashboard</h1>
      <div className="w-[95%] h-full flex justify-evenly gap-5 m-auto bg-[#090975] rounded-t-xl overflow-y-scroll p-12">
        <UserCountCards 
          data={data}
          currentMonthIndex={currentMonthIndex}
        />
        <div className="h-[40%] w-[40%] bg-[#060641] p-5 rounded-lg">
          <h1 className="text-white">Materials</h1>
          <p className="text-white">{data.Data[1].Count}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
