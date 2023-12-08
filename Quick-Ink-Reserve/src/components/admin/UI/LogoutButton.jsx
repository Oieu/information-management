import React from "react";
import { BsBoxArrowLeft } from "react-icons/bs";

function LogoutButton({ handleLogout }) {

  return (
    <div className="flex w-[100%] items-end justify-center h-1/3 mb-5">
      <button
        onClick={handleLogout}
        className="transition-all ml-5 w-1/2 bg-red-500 hover:bg-red-700 hover:-translate-y-1 flex justify-center items-center gap-3"
      >
        <BsBoxArrowLeft />
        Logout
      </button>
    </div>
  );
}

export function LogoutButtonMember({ handleLogout }) {
  
    return (
      <div className="flex w-[75%] items-center justify-center h-1/3">
        <button
          onClick={handleLogout}
          className="text-black hover:text-white transition-all w-full bg-red-500 hover:bg-red-700 hover:-translate-y-1 flex justify-center items-center gap-3"
        >
          <BsBoxArrowLeft />
          Logout
        </button>
      </div>
    );
}


export default LogoutButton;
