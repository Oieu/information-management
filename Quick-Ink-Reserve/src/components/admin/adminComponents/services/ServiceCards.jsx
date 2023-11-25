import React from "react";
import {
  AiOutlineStar,
  AiFillStar,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import { handleReadServices, openDeleteModal } from "./Functions";

function ServiceCards({
  service,
  setIsDeleteModalOpen,
  setReadMaterial,
  setOverlayOpen,
  setIsReadModalOpen,
  setId, setLoading
}) {
  return (
    <div
      className="bg-gray-800 w-[300px] h-[300px] rounded-lg p-5 relative overflow-hidden cursor-pointer text-zinc-400 shadow-zinc-400 shadow-sm border-white hover:shadow-blue-400 hover:shadow-lg transition-all"
    >
      <div className="absolute z-10 right-5">
        <span>
          {service.featured === "false" ? (
            <AiOutlineStar className="text-3xl text-yellow-200 hover:text-yellow-300 hover:scale-125 transition-all" />
          ) : (
            <AiFillStar className="text-3xl text-yellow-200 hover:text-yellow-300 hover:scale-125 transition-all" />
          )}
        </span>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-4/5 bg-cover bg-center hover:scale-150 transition-all"
        onClick={(e) =>
          handleReadServices(
            e,
            setReadMaterial,
            setOverlayOpen,
            setIsReadModalOpen,
            service,
            setLoading
          )
        }
      >
        <img
          className="rounded-lg w-[100%] h-[100%] absolute top-0 left-0"
          src={`http://localhost:5000/${service.genServiceImageUrl}`}
          alt="Image"
        />
        <div className="bg-gradient-to-b from-zinc-400 to-black w-full h-full absolute top-0 left-0 bg-cover bg-center rounded-lg opacity-80"></div>
      </div>
      <div className="text-lg absolute z-1 top-[85%] flex items-center justify-between w-[85%]">
        <span className="flex w-3/4 hover:text-white">
          {service.genServiceName}
        </span>
        <div className="w-1/4 flex justify-end gap-3 text-xl">
          <span>
            <AiFillEdit className="text-blue-300 hover:text-blue-600" />
          </span>
          <span>
            <AiFillDelete
              onClick={(e) =>
                openDeleteModal(
                  e,
                  service.genServicesID,
                  setOverlayOpen,
                  setIsDeleteModalOpen,
                  setId
                )
              }
              className="text-red-300 hover:text-red-600"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ServiceCards;
