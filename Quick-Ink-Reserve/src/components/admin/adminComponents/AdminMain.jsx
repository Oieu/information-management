import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";

import UserWrapper from '../profileComponents/userComponents/UserWrapper';
import Dashboard from "./dashboard/Dashboard";
import Materials from "./materials/Materials";
import Services from "./services/Services";
import { useAppContext } from '../../../controllers/auth/AuthContext';
import CheckUser, { CheckAdmin } from '../../../controllers/CheckUser';

function AdminMain({ nav }) {
    const { loginStatus, user } = useAppContext();

    useEffect(() => {
      CheckUser(loginStatus, user, nav);
      if(CheckAdmin(user) === false) nav('/error-auth-admin');
    }, []);

  return (
    <main className="h-full w-5/6">
        <div className="h-[10%] w-full">
          {loginStatus != false && user.userRole === "ADMIN" && (
            <UserWrapper user={user} />
          )}
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/materials/*" element={<Materials nav={nav}/>} />
          <Route path="/services/*" element={<Services nav={nav}/>} />
        </Routes>
      </main>
  )
}

export default AdminMain