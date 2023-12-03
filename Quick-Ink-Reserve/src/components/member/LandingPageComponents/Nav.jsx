import React, { useState } from "react";
import "../NavBar.css";
import logo from "../../../assets/logo.png";
import smlogo from "../../../assets/smlogo.png";
import { LogoutButtonMember } from "../../admin/UI/LogoutButton";
import { Link } from "react-router-dom";
import UserWrapper from "../../admin/profileComponents/userComponents/UserWrapper";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseFill } from "react-icons/ri";

function Nav({ handleLogout, user, loginStatus }) {
  const [openMenu, setOpenMenu] = useState(true);

  function toggleMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <div
      className={`navbar ${openMenu ? "navbar-height open" : "navbar-height"}`}
    >
      <img src={logo} alt="" className="w-1/4 h-full"/>
      <div className="w-full h-1/6 p-5 relative visible md:hidden">
        {openMenu === false ? (
          <RiCloseFill
            id="close"
            className={`absolute w-1/4 text-6xl top-5 left-2 z-10 text-gray-800 rotate`}
            onClick={toggleMenu}
          />
        ) : (
          <GiHamburgerMenu
            id="open"
            className={`absolute w-1/4 text-4xl top-0 left-2 z-10 text-gray-800 rotate open`}
            onClick={toggleMenu}
          />
        )}
      </div>
      <div
        className={`w-1/4 md:w-0 flex justify-center items-center ${
          openMenu ? "hide-on-open" : "hide-on-open open"
        }`}
      >
      </div>
      <ul
        className={`md:w-1/2 w-full ${
          openMenu ? "hide-on-open open" : "hide-on-open"
        }`}
      >
        <li className="active">
          <Link to="/" className="active1 list">
            Home
          </Link>
        </li>
        <li>
          <a href="#catalog" className="active1 list">
            Services
          </a>
        </li>
        <li>
          <a className="active1 list" href="#location">
            Location
          </a>
        </li>
        <li>
          <a className="active1 list" href="#about-us">
            About Us
          </a>
        </li>
      </ul>
      <div className="h-full w-2/3 md:w-1/4 flex flex-col justify-center">
        <img src={logo} alt="Logo" className={`hidden w-full logo transition-opacity ${openMenu === true ? "opacity-100 duration-[1500ms]" : "opacity-0"}`}/>
        <div className="h-auto w-full flex flex-col lg:flex-row justify-center items-center">
          {loginStatus != false ? (
            <>
              <UserWrapper user={user} maxWidth={"75%"} />
              <div className="md:w-1/4 flex justify-center items-center">
                {loginStatus === true ? (
                  <LogoutButtonMember handleLogout={handleLogout} />
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <div className="w-3/4 flex justify-center items-center gap-5">
              <Link
                to={`/login`}
                className={`md:w-1/4 w-1/2 p-3 rounded-lg bg-blue-300 text-black hover:text-white hover:bg-blue-900 hover:translate-y-[-5px] transition-all
                ${openMenu ? "hide-on-open open" : "hide-on-open"}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`md:w-1/4 w-1/2 p-3 rounded-lg bg-green-400 text-black hover:text-white hover:bg-green-700 hover:translate-y-[-5px] transition-all
                ${openMenu ? "hide-on-open open" : "hide-on-open"}`}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
