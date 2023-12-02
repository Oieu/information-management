import React from "react";
import { RiUserFill } from "react-icons/ri";
import { BsArrowDownRight } from "react-icons/bs";

export function UserCountCards({ data, currentMonthIndex }) {
  return (
    <div className="h-[40%] w-[40%] bg-[#060641] p-5 pb-10 rounded-lg">
      <div className="flex w-full h-full bg-blue-200 m-auto">
        <RiUserFill className="text-9xl m-auto text-blue-500 w-1/2" />
        <h1 className="text-gray-700 text-7xl w-1/2 m-auto">
          {data.Data[currentMonthIndex()].Count} <br /> Users
        </h1>
      </div>
      <div className="flex justify-between items-center mt-1">
        <h2>Users registered this month</h2>
        <a href="/admin/analytics">
          More info...
          <BsArrowDownRight className="inline-block ml-2" />
        </a>
      </div>
    </div>
  );
}
