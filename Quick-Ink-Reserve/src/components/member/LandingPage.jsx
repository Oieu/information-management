import React from "react";
import "./NavBar.css";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../controllers/auth/AuthContext";
import Nav from "./Nav";
import MainW from "./MainW";
import Catalog from "./Catalog";
import Location from "./Location";
import Aboutus from "./Aboutus";


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
