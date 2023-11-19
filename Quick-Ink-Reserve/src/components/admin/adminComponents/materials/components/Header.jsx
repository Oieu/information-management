import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';

function Header({ setIsModalOpen, setOverlayOpen, isModalOpen, setSearch }) {
  return (
    <header className="flex flex-col gap-2 ml-5 h-[10%]">
          <div className="flex items-center gap-10 w-[95%]">
            <div className="w-2/3 flex gap-5">
              <h1 className="text-left">Materials</h1>
              <button
                type="button"
                className="bg-green-400 flex items-center gap-3 text-black font-extrabold w-1/4 border-none hover:bg-green-600 hover:text-white hover:translate-y-[-4px] transition-all"
                onClick={(e) => {
                  setIsModalOpen(true);
                  setOverlayOpen(true);
                }}
                disabled={isModalOpen}
              >
                <FaPlus />
                Add New Material
              </button>
            </div>
            <div className="w-1/3 flex justify-end items-center gap-2">
              <BiSearchAlt className="text-3xl" />
              <input type="text" placeholder="Find item here..."
                className="border-2 border-black rounded-md w-2/3 p-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <p className="text-left">
            This component will allow the admin to see the available materials,
            add new ones to the existing list, and edit the details of existing
            materials.
          </p>
        </header>
  )
}

export default Header