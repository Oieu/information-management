import React from "react";
import { AiFillRead, AiFillEdit, AiFillDelete } from "react-icons/ai";

export function TableHead({ title }) {
  return (
    <th className="text-center font-extrabold text-2xl border border-r-1 border-white">
      {title}
    </th>
  );
}

export function TableCol({ width, title }) {
  return <col style={{ width }}>{title}</col>;
}

export function ColGroup({ filter }) {
  return (
    <colgroup>
      {filter.length === 0 || !filter ? (
        <TableCol width="100%" content={null} />
      ) : (
        <>
          <TableCol width="10%" content={null} />
          <TableCol width="10%" content={null} />
          <TableCol width="10%" content={null} />
          <TableCol width="10%" content={null} />
          <TableCol width="10%" content={null} />
          <TableCol width="10%" content={null} />
          <TableCol width="10%" content={null} />
          <TableCol width="20%" content={null} />
          <TableCol width="10%" content={null} />
        </>
      )}
    </colgroup>
  );
}

export function THead({ filter }) {
  return (
    <thead>
      <tr>
        {filter.length === 0 || !filter ? (
          <td className="text-center">
            <h1 className="text-4xl text-yellow-500">
              No Materials in the table.
            </h1>
          </td>
        ) : (
          <>
            <TableHead title="Image" />
            <TableHead title="Name" />
            <TableHead title="Size" />
            <TableHead title="Count" />
            <TableHead title="Quantity" />
            <TableHead title="Collection" />
            <TableHead title="Color" />
            <TableHead title="Description" />
            <TableHead title="Actions" />
          </>
        )}
      </tr>
    </thead>
  );
}

export function TBody({
  currentMaterials,
  ShortenDescription,
  handleReadMaterial,
  openDeleteModal,
  openEditModal
}) {
  return (
    <tbody>
      {currentMaterials.map((material, index) => {
        return (
          <tr
            key={material.matID}
            className={`h-5 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
          >
            <td className="text-left text-black p-2 border border-gray-300">
              <img
                src={`http://localhost:5000/${material.matImageUrl}`}
                alt="Material"
                className="h-[100px] w-[100px] rounded-lg border border-slate-700 m-auto"
              />
            </td>
            <td className="text-left text-black p-2 border border-gray-300">
              {material.matName}
            </td>
            <td className="text-center text-black p-2 border border-gray-300">
              {material.matSize}
            </td>
            <td className="text-center text-black p-2 border border-gray-300">
              {material.matCount} per {material.matUnit}
            </td>
            <td className="text-center text-black p-2 border border-gray-300">
              {material.matQty}
            </td>
            <td className="text-center text-black p-2 border border-gray-300">
              {material.matUnit}
            </td>
            <td className="text-center text-black p-2 border border-gray-300">
              {material.color}
            </td>
            <td className="text-left text-black p-2 border border-gray-300">
              {ShortenDescription(material.description)}{" "}
              {material.description.length > 50 && (
                <button
                  onClick={() => {
                    handleReadMaterial(material.matID);
                  }}
                  className="bg-transparent p-0 border-none text-blue-600 hover:text-blue-900"
                >
                  ...more
                </button>
              )}
            </td>
            <td className="text-left text-sm p-2 border border-gray-300 flex flex-col gap-3 items-center justify-center h-full">
              <button
                className="flex items-center justify-center bg-yellow-400 text-black font-extrabold w-5/6 border-none hover:bg-yellow-600 hover:text-white hover:translate-y-[-4px] transition-all group"
                onClick={() => {
                  handleReadMaterial(material.matID);
                }}
              >
                <span className="flex items-center space-x-2 button-content">
                  <span className="group-hover:hidden">
                    <AiFillRead />
                  </span>
                  <span className="hidden group-hover:inline-block m-auto">
                    Read
                  </span>
                </span>
              </button>
              <button
                className="flex items-center justify-center bg-blue-400 text-black font-extrabold w-5/6 border-none hover:bg-blue-600 hover:text-white hover:translate-y-[-4px] transition-all group"
                onClick={(e) => openEditModal(e, material.matID)}
              >
                <span className="flex items-center space-x-2 button-content">
                  <span className="group-hover:hidden">
                    <AiFillEdit />
                  </span>
                  <span className="hidden group-hover:inline-block m-auto">
                    Update
                  </span>
                </span>
              </button>
              <button
                className="flex items-center justify-center text-center bg-red-400 text-black font-extrabold w-5/6 border-none hover:bg-red-600 hover:text-white hover:translate-y-[-4px] transition-all group"
                onClick={(e) => openDeleteModal(e, material.matID)}
              >
                <span className="flex items-center space-x-2 button-content">
                  <span className="group-hover:hidden">
                    <AiFillDelete />
                  </span>
                  <span className="hidden group-hover:inline-block">
                    Delete
                  </span>
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
