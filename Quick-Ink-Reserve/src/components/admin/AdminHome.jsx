import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../App.css";

import AdminNavbar from "./UI/adminNavbarComponents/AdminNavbar";
import AdminMain from "./adminComponents/AdminMain";
import CheckUser, { CheckAdmin } from "../../controllers/CheckUser";
import { useAppContext } from "../../controllers/auth/AuthContext";
import { TabTitle } from "../../utils/GeneralFunctions";

function AdminHome({ nav }) {
  TabTitle("Admin", true);
  const { loginStatus, user } = useAppContext();
  const location = useLocation();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    CheckUser(loginStatus, user, nav, location);
    if(CheckAdmin(user) === false) nav("/");
  }, []);

  function CheckPath() {
    const location = useLocation();

    switch (location.pathname) {
      case "/admin":
        return "Dashboard";
      case "/admin/materials":
        return "Materials";
      case "/admin/services":
        return "Services";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex h-full w-full bg-[#000122] overflow-x-hidden relative">
      <AdminNavbar defaultActive={CheckPath()} nav={nav} />
      <AdminMain nav={nav}/>
    </div>
  );
}

export default AdminHome;
