import React from "react";
import "./NavBar.css";
import "./LandingPage.css";
import { useAppContext } from "../../controllers/auth/AuthContext";
import Nav from "./Nav";
import MainW from "./MainW";
import Catalog from "./Catalog";
import Location from "./Location";
import Aboutus from "./Aboutus";
import {  Route, Routes } from "react-router-dom";
import { useAppContext } from "../../controllers/auth/AuthContext";
import { AdminAuthWarning } from "../../controllers/auth/AuthComponents";


function LandingPage({ handleLogout }) {
  const { loginStatus, user } = useAppContext();
  return (
    <>
      <div id="home">
        <Nav handleLogout={handleLogout} user={user} loginStatus={loginStatus}/>
        <MainW/>
        <Catalog/>
        <Location/>
        <Aboutus/>
      </div>
      <Routes>
        <Route path="/error-auth-admin" element={<AdminAuthWarning />} />
      </Routes>
    </>
  );
}

export default LandingPage;
