import React from "react";
import { handleDeleteService } from "../Functions";

function DeleteModal({
  id,
  setServices,
  setOverlayOpen,
  setIsDeleteModalOpen,
}) {
  return (
    <div className="absolute z-30 h-1/4 w-1/2 flex justify-center items-center">
      <div className="h-full w-full bg-white rounded-lg absolute m-5 flex flex-col justify-evenly items-stretch">
        <h1 className="text-4xl text-red-600">Confirm Delete</h1>
        <div className="flex justify-evenly items-center">
          <h2 className="text-black text-left text-xl">
            Are you sure you want to delete this?
          </h2>
          <div className="flex gap-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsDeleteModalOpen(false);
                setOverlayOpen(false);
              }}
              className="bg-gray-500 border-none"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                handleDeleteService(
                  e,
                  id,
                  setServices,
                  setOverlayOpen,
                  setIsDeleteModalOpen
                );
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
