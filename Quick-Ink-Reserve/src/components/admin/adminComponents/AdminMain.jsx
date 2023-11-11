import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";

import UserWrapper from '../profileComponents/userComponents/UserWrapper';
import Dashboard from "./dashboard/Dashboard";
import Materials from "./materials/Materials";
import Services from "./services/Services";
import Users from "./users/Users";

import { useAppContext } from '../../../controllers/auth/AuthContext';
import { MdOutlineRememberMe } from 'react-icons/md';

function AdminMain({ nav }) {
    const { loginStatus, user } = useAppContext();

  return (
    <main className="h-full w-5/6">
        <div className="h-[10%] w-full relative">
          <div className="absolute z-10 top-5 left-5">
            <button className="flex items-center justify-between bg-green-300 text-black border-2 border-black shadow-sm shadow-white hover:text-white hover:shadow-md hover:shadow-white hover:translate-y-[-3px] hover:bg-green-500 transition-all" onClick={() => nav('/')}>
              <MdOutlineRememberMe className='text-xl'/>
              To member page
            </button>
          </div>
          {loginStatus != false && user.userRole === "ADMIN" && (
            <UserWrapper user={user} />
          )}
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/materials/*" element={<Materials nav={nav}/>} />
          <Route path="/services/*" element={<Services nav={nav}/>} />
          <Route path='/users/*' element={<Users nav={nav}/>} />
        </Routes>
      </main>
  )
}

export default AdminMain