import React from "react";
import "./NavBar.css";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../controllers/auth/AuthContext";
import Nav from "./LandingPageComponents/Nav";
import MainW from "./LandingPageComponents/MainW";
import Catalog from "./LandingPageComponents/Catalog";
import Location from "./LandingPageComponents/Location";
import Aboutus from "./LandingPageComponents/Aboutus";


function LandingPage({ handleLogout }) {
  const { loginStatus, user } = useAppContext();
  const nav = useNavigate();
  return (
    <>
      <div id="home">
        <Nav handleLogout={handleLogout} user={user} loginStatus={loginStatus}/>
        <MainW user={user} nav={nav}/>
        <Catalog/>
        <Location/>
        <Aboutus/>
      </div>
    </>
  );
}

export default LandingPage;
