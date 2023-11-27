import React from "react";
import { FaPlus } from "react-icons/fa";

function AddButton({ isModalOpen, setIsModalOpen, setOverlayOpen, setSelectedItems }) {
  return (
    <div className="w-1/4">
      <button
        type="button"
        className="bg-green-400 flex items-center gap-3 text-black font-extrabold border-none hover:bg-green-600 hover:text-white hover:translate-y-[-4px] transition-all"
        onClick={(e) => {
          setIsModalOpen(true);
          setOverlayOpen(true);
          setSelectedItems([]);
        }}
        disabled={isModalOpen}
      >
        <FaPlus />
        Add New Service
      </button>
    </div>
  );
}

export default AddButton;
