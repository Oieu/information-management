import React, { useState, useEffect } from "react";
import { fetchData, fetchInactiveData } from "./Functions";
import { months } from "./Functions";
import LoadingComponent from "../../../../utils/LoadingComponent";
import AnalyticsHeader from "./components/AnalyticsHeader";
import UserCountData, { UserStatusCompare } from "./components/UserData";
import { OrderCountData } from "./components/LineGraph";
import ServiceMatTable from "./components/ServiceMatTable";
import { TabTitle } from "../../../../utils/GeneralFunctions";

export default function Analytics() {
  TabTitle("Analytics", false);
  const [data, setData] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);

      try {
        await fetchData(setData, year);
        await fetchInactiveData(setInactiveUsers, year);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchDataAsync();
  }, []);

  if (loading) {
    return <LoadingComponent loading={loading} />;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <AnalyticsHeader />
      <div className="w-full h-auto flex flex-col gap-5">
        <UserCountData
          data={data} 
          month={month} months={months}
          setData={setData} setMonth={setMonth}
          fetchData={fetchData}
        />
        <UserStatusCompare
          inactiveUsers={inactiveUsers}
          fetchInactiveData={fetchInactiveData}
          setInactiveUsers={setInactiveUsers}
        />
        <ServiceMatTable />
        <OrderCountData />
      </div>
    </div>
  );
}
