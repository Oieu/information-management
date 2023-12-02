import React, { useState, useEffect } from "react";
import { fetchServiceMaterialData } from "./Functions";

const ServiceMatTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchServiceMaterialData(setData);
  }, []);

  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.genServiceName]) {
      acc[item.genServiceName] = [];
    }
    acc[item.genServiceName].push(item.groupedMatName);
    return acc;
  }, {});

  return (
    <div className="container mx-auto rounded-lg p-4 w-full">
      <table className="w-full m-auto bg-white border-4 border-blue-500 text-gray-700 hover:translate-y-[-2px] transition-all">
        <thead>
          <tr className="bg-blue-500 rounded-lg text-3xl max-w-1/3">
            <th className="py-2 px-4 border-b border-r border-black">Service Name</th>
            <th className="py-2 px-4 border-b border-r border-black">Materials Used</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((service, index) => (
            <tr
              key={service}
              className={`border-b border-r border-black ${
                index % 2 == 0 ? "bg-blue-300" : "bg-blue-200"
              }`}
            >
              <td className="py-2 px-4 border-r border-black">{service}</td>
              <td className="py-2 px-4 border-r border-black">
                <ul className="list-none list-inside flex items-center justify-center gap-5">
                  {groupedData[service].map((material) => (
                    <li key={material} className="text-left w-2/3 before:content-['🔹']">
                      {material}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceMatTable;
