import React from "react";
import { FaUserAlt, FaUserAltSlash } from "react-icons/fa";

export function Card({ icon, data, color, text }) {
  return (
    <div className="w-4/5 h-1/2 flex justify-evenly p-5 rounded-xl bg-zinc-200">
      <div
        className={`bg-${
          color ? color : "bg-gray-500"
        } w-1/3 h-full rounded-xl p-3`}
      >
        <span>{icon}</span>
      </div>
      <div className="w-2/3 h-full">
        <h1 className="text-3xl text-center ml-5 text-gray-700 w-full h-1/2">
          No. of
          <span className={`text-${color} font-bold text-3xl`}> {text} </span>
          Users:
        </h1>
        <h1 className="text-gray-600 h-1/2 w-full">{data.Count}</h1>
      </div>
    </div>
  );
}

export function CardContainer({ inactiveUsers }) {
  return (
    <div className="w-1/3 h-full flex flex-col justify-evenly items-center gap-5">
      <Card
        icon={<FaUserAlt className="w-4/5 h-4/5 m-auto" />}
        data={inactiveUsers[0]}
        text="Active"
        color="blue-500"
      />
      <Card
        icon={<FaUserAltSlash className="w-4/5 h-4/5 m-auto" />}
        data={inactiveUsers[1]}
        text="Inactive"
        color="red-500"
      />
    </div>
  );
}
