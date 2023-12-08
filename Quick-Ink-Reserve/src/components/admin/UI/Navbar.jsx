import React from "react";
import axios from "axios";

import { BsFillDoorOpenFill } from "react-icons/bs";
import EditNavbar from "./adminNavbarComponents/editComponents/EditNavbar";
import { useAppContext } from "../../../controllers/auth/AuthContext";

function Navbar({ nav, name }) {
  const { loginStatus, user, setLoginStatus, setUser } = useAppContext();
  const handleLogout = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/logout")
      .then((response) => {
        if (response.status === 200) {
            setUser('');
          setLoginStatus(false);
          nav("/login");
        } else {
          console.error("Logout error:", response);
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      <div className="w-1/6 h-full flex flex-col items-center justify-center bg-blue-950 rounded-lg">
        <div className="w-full h-1/3 flex justify-center items-center flex-col gap-2">
          <img src={`http://localhost:5000/${user.profilePicture}`} alt="Profile Picture" 
            className="h-20 w-20 lg:h-40 lg:w-40 rounded-full border-2 shadow-sm shadow-white border-white p-2"
          />
          <h1 className="text-3xl">{user.userName}</h1>
        </div>
        <EditNavbar 
            handleLogout={handleLogout}
            Icon={<BsFillDoorOpenFill />}
            name={name}
        />
      </div>
    </>
  );
}

export default Navbar;
