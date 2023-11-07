import React from "react";
import "./NavBar.css";
import "./LandingPage.css";
import logo from "../../assets/logo.png";
import box from "../../assets/Images/box.jpg";
import UserWrapper from "../admin/profileComponents/userComponents/UserWrapper";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { LogoutButtonMember } from "../admin/UI/LogoutButton";
import { useAppContext } from "../../controllers/auth/AuthContext";
import { MdAdminPanelSettings } from "react-icons/md";

function LandingPage({ handleLogout }) {
  const { loginStatus, user } = useAppContext();
  const nav = useNavigate();
  return (
    <>
      <div id="home">
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
                    className="w-1/4 p-3 rounded-lg bg-orange-300 text-black hover:text-white hover:border-black hover:border-2 hover:bg-orange-500 hover:translate-y-[-5px] transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="w-1/4 p-3 rounded-lg bg-green-400 text-black hover:text-white hover:border-black hover:border-2 hover:bg-green-700 hover:translate-y-[-5px] transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={`Main`}>
            <div className="Welcome">
                <h1>Welcome to Quick-Ink-Reserve</h1>
            </div>
            {user.userRole === "ADMIN" && <div className="fixed z-10 bottom-5 right-5">
              <button className="flex items-center justify-between bg-blue-300 text-black border-2 border-black shadow-sm shadow-white hover:text-white hover:shadow-md hover:shadow-white hover:translate-y-[-3px] hover:bg-blue-500 transition-all" onClick={() => nav('/admin')}>
                <MdAdminPanelSettings className="text-xl"/>
                Go to admin page
              </button>
            </div>}
        </div>
        <div className="Catalog" id="catalog">
          <h2>Here is what we can do for you!</h2>

          <div className="Carousel">
            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>
          </div>
        </div>

        <div className="Loc" id="location">
          <h2>Location</h2>

          <div className="LocCont">
            <div className="MapLoc"></div>

            <div className="StoreLoc">
              <p>Lorem Ipsum</p>
            </div>
          </div>
        </div>

        <div className="About" id="about-us">
          <h1>About us</h1>
          <p>About Quick-Ink-Reserve Lorem Ipsum .,..,.,.</p>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
