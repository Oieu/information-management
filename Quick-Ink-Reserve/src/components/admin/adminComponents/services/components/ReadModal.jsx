import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function ReadModal({
  readMaterial,
  setIsReadModalOpen,
  setOverlayOpen,
  serviceMaterials,
  materials,
}) {
  const matchingMaterials = [];
  const materialContent = [];

  serviceMaterials.forEach((element) => {
    if (element.serviceID === readMaterial.genServicesID) {
      matchingMaterials.push(element);
    }
  });

  matchingMaterials.forEach((element) => {
    materials.forEach((material) => {
      if (element.matID === material.matID) {
        materialContent.push(material);
      }
    });
  });

  materialContent.sort((a, b) => {
    return a.matName - b.matName;
  });

  return (
    <div className="absolute z-30 h-5/6 w-1/2 flex justify-center items-center">
      <div className="p-5 h-full w-full bg-white rounded-lg absolute m-5 flex flex-col justify-center items-stretch gap-3">
        <AiFillCloseCircle
          onClick={(e) => {
            e.preventDefault();
            setIsReadModalOpen(false);
            setOverlayOpen(false);
          }}
          className="text-4xl text-red-500 hover:text-red-700 cursor-pointer absolute top-5 right-5"
        />
        <h1 className="text-4xl text-red-600">Service Details</h1>
        <ul className="text-black flex flex-col gap-5 border-2 rounded-lg border-black">
          <li className={`bg-gray-700 bg-cover rounded-t-lg w-full border-black border-2`}>
            <img
              src={`http://localhost:5000/${readMaterial.genServiceImageUrl}`}
              alt="Material"
              className="h-[200px] w-[200px] rounded-full border-4 border-black m-auto"
            />
          </li>
          <li className="flex justify-center p-2 w-full">
            <div className="w-1/3 flex justify-center gap-3 items-center">
              <span className="text-2xl">Name: </span>
              <span className="text-xl underline">
                {readMaterial.genServiceName}
              </span>
            </div>
            <div className="w-1/3 flex gap-3 justify-center items-center">
              <span className="text-2xl">Status: </span>
              <span className="text-xl underline">{readMaterial.status}</span>
            </div>
            <div className="w-1/3 flex gap-3 justify-center items-center">
              <span className="text-2xl">Rate Units: </span>
              <span className="text-xl underline">{readMaterial.rateUnit}</span>
            </div>
          </li>
          <li className="m-auto border-t-4 border-black p-2 w-full max-h-52 overflow-ellipsis">
            <div className="flex gap-5">
              <span className="text-2xl w-1/5">Description: </span>
              <span className="w-4/5 text-xl text-left p-3 bg-gray-200 rounded-lg">
                {readMaterial.genServiceDesc}
              </span>
            </div>
          </li>
          <li className="border-t-2 border-black overflow-y-scroll w-full max-h-52">
            <div className="flex flex-col">
              {materialContent.length === 0 ? (
                <h1 className="text-center text-4xl">
                  No materials found
                </h1>
              ) : (
                <table className="w-full h-1/3">
                  <thead className="sticky top-[-1px] left-0">
                    <tr className="text-gray-100">
                      <th className="bg-gray-600 border border-black">
                        Material ID
                      </th>
                      <th className="bg-blue-950 border border-black">
                        Material Name
                      </th>
                      <th className="bg-amber-950 border border-black">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materialContent.map((material, index) => (
                      <tr key={index}>
                        <td
                          className={`${
                            index % 2 == 0 ? "bg-gray-300" : "bg-gray-50"
                          } border border-black`}
                        >
                          {material.matID}
                        </td>
                        <td
                          className={`${
                            index % 2 == 0 ? "bg-blue-300" : "bg-blue-100"
                          } border border-black`}
                        >
                          {material.matName}
                        </td>
                        <td
                          className={`${
                            index % 2 == 0 ? "bg-yellow-200" : "bg-yellow-100"
                          } border border-black`}
                        >
                          {material.matSize}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReadModal;
