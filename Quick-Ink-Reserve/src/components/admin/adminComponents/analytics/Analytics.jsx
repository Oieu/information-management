import React, { useState, useEffect } from "react";
import { fetchData, fetchInactiveData } from "./Functions";
import PieCharts, { Header } from "./PieCharts";
import { CardContainer } from "./Cards";
import { BarCharts, Headers, UserCompare, UserCount } from "./BarCharts";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { months } from "./Functions";

export default function Analytics() {
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
        //setTimeout(() => {
        setLoading(false);
        // }, 1000);
      }
    };

    fetchDataAsync();
  }, []);

  if (loading) {
    return (
      <div className="w-2/5 h-2/5 m-auto p-5 bg-gray-500 relative rounded-xl">
        <ClimbingBoxLoader
          color={"#ffffff"}
          loading={loading}
          size={30}
          aria-label="Loading Ladder"
          className="absolute top-1/4 left-[40%]"
        />
        <h1 className="absolute text-center left-1/4 top-[70%]">
          Fetching data...
        </h1>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full flex flex-col">
      <header className="h-[10%] w-full">
        <h1 className="font-bold text-left ml-5 mb-5">Analytics</h1>
      </header>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="w-[95%] h-full mx-auto flex p-3 rounded-xl transition-all bg-gray-800 hover:bg-gray-900 hover:translate-y-[-2px]">
          <div className="h-full w-2/3 flex flex-col gap-5 p-3">
            <Headers
              text="User Count per Month | Year : "
              year={year}
              setYear={setYear}
              setData={setData}
              fetchData={fetchData}
            />
            <BarCharts data={data} />
          </div>
          <div className="w-1/3 h-full flex flex-col p-3 gap-3">
            <UserCount data={data} />
            <UserCompare 
              months={months} month={month} 
              setMonth={setMonth} 
              data={data} 
            />
          </div>
        </div>
        <div className="w-[95%] h-full flex bg-gray-200 mx-auto p-5 rounded-xl transition-all hover:bg-gray-100 hover:translate-y-[-2px]">
          <div className="w-2/3 h-full flex gap-5 justify-center items-center">
            <Header
              year={year}
              setYear={setYear}
              fetchInactiveData={fetchInactiveData}
            />
            <div className="h-full w-1/2">
              <PieCharts data={inactiveUsers} />
            </div>
          </div>
          <CardContainer inactiveUsers={inactiveUsers} />
        </div>
      </div>
    </div>
  );
}
