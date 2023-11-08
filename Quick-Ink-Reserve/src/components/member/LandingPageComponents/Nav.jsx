import React from "react";
import "../NavBar.css";
import logo from "../../../assets/logo.png";
import { LogoutButtonMember } from "../../admin/UI/LogoutButton";
import { Link } from "react-router-dom";
import UserWrapper from "../../admin/profileComponents/userComponents/UserWrapper";

function Nav({ handleLogout, user, loginStatus }) {

    return(
        <div className="navbar">
            <div className="w-1/4">
              <img src={logo} alt="Logo" />
            </div>
            <ul className="w-1/2">
              <li className="active">
                <a className="active1 list" href="#home">
                  Home
                </a>
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
            <div className="h-[100%] w-1/4">
              <div className="h-full w-full flex justify-center items-center">
                {loginStatus != false ? (
                  <>
                    <UserWrapper user={user} maxWidth={"75%"} />
                    <div className="w-1/4 flex justify-center items-center">
                      {loginStatus === true ? (
                        <LogoutButtonMember handleLogout={handleLogout} />
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="w-full flex justify-center items-center gap-5">
                    <Link
                      to={`/login`}
                      className="w-1/4 p-3 rounded-lg bg-blue-300 text-black hover:text-white hover:bg-blue-900 hover:translate-y-[-5px] transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="w-1/4 p-3 rounded-lg bg-green-400 text-black hover:text-white hover:bg-green-700 hover:translate-y-[-5px] transition-all"
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