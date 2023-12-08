import React from "react";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BiHome } from "react-icons/bi";

function BackToHome({ color, nav }) {
  return (
    <div className="w-1/7 h-[5%] flex items-center absolute left-0 top-0 bg-blue-700 rounded-lg px-2 py-3">
      <a
        onClick={() => nav("/", {})}
        className={`${color && color} cursor-pointer text-lg p-3 flex items-center justify-center gap-3 bg-transparent hover:text-black border-none`}
      >
        <AiOutlineArrowLeft className="text-2xl"/> <span className="md:before:content-['Back_to_Home']"></span> <BiHome className="text-3xl block md:hidden"/>
      </a>
    </div>
  );
}

export default BackToHome;
