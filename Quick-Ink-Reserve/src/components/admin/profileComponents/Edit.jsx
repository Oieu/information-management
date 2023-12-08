import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../UI/Navbar";
import { BsBoxArrowLeft, BsClipboard2CheckFill, BsPhoneFill } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiFillUnlock, AiFillLock } from "react-icons/ai";
import { useAppContext } from "../../../controllers/auth/AuthContext";
import { BiPhoneCall } from "react-icons/bi";
import { MdFormatAlignCenter } from "react-icons/md";

function Edit() {
  const { loginStatus, user, setLoginStatus, setUser } = useAppContext();
  const [values, setValues] = useState({
    newUsername: "",
    currPassword: "",
    newPassword: "",
    confirmPassword: "",
    newProfilePicture: "",
    newNumber: "",
  });
  const [error, setError] = useState("");
  const [currPassError, setCurrPassError] = useState("");
  const [success, setSuccess] = useState("");
  const nav = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5000/profile")
      .then((response) => {
        if (response.data.loggedIn === true) {
          setUser(response.data.user);
          setValues((prevValues) => ({
            ...prevValues,
            email: response.data.user.userEmail,
            newUsername: response.data.user.userName,
            newProfilePicture: response.data.user.profilePicture,
            newNumber: response.data.user.userNumber,
          }));
          setLoginStatus(response.data.loggedIn);
        } else {
          nav("/login");
        }
      })
      .catch((error) => {
        nav("/login");
      });
  }, [nav]);

  function clearError() {
    setError("");
    setCurrPassError("");
  }

  function checkNewPassword(confirmPassword, newPassword) {
    return confirmPassword === newPassword;
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    if (
      values.currPassword === "" &&
      values.newPassword === "" &&
      values.confirmPassword === ""
    ) {
      return setCurrPassError("Please input new values!");
    }

    if (!checkNewPassword(values.confirmPassword, values.newPassword)) {
      return setError("Passwords do not match! Please input same values.");
    }

    axios
      .post("http://localhost:5000/profile/reset", values)
      .then((response) => {
        const form = document.getElementById("editForm");
        form.style.display = "none";
        setSuccess(response.data.Message);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data.passMessage) {
            setCurrPassError(error.response.data.passMessage);
          } else {
            setError(error.response.data.Message);
          }
        }
      });
  };

  const handleReturn = (e) => {
    e.preventDefault();
    if (user.userRole === "ADMIN") {
      nav("/admin");
    } else {
      nav("/");
    }
  };

  return (
    <>
      <div className="flex w-full m-auto h-full bg-gray-700 relative">
        <Navbar nav={nav} name={"edit"} />
        <div className="w-4/5 h-4/5 m-auto flex flex-col justify-center items-center">
          <h1 className="h-2/5 flex items-center">Edit Profile Information</h1>
          <div className="w-full h-4/5">
            <form
              id="editForm"
              className="m-auto flex gap-5 w-4/5 h-full items-center justify-start"
            >
              <div className="w-full h-full flex flex-col justify-evenly">
                <div className="w-full h-full">
                  <div className="w-full flex flex-col justify-start">
                    <h1 className="text-left text-3xl mb-3 flex items-center gap-3">
                      <FaCircleUser /> Username
                    </h1>
                    <input
                      type="text"
                      className={`bg-gray-900 p-5 w-[95%] rounded-md  ${
                        values.newUsername ? "text-white" : ""
                      }`}
                      value={values.newUsername}
                      onChange={(e) =>
                        setValues({ ...values, newUsername: e.target.value })
                      }
                      name="newUsername"
                      placeholder="Enter new username..."
                    />
                  </div>
                  <div className="w-full flex flex-col justify-start">
                    <h1 className="text-left text-3xl mb-3 flex items-center gap-3">
                      <BiPhoneCall /> New Number
                    </h1>
                    <input
                      type="number"
                      className={`bg-gray-900 p-5 w-[95%] rounded-md  ${
                        values.newNumber ? "text-white" : ""
                      }`}
                      value={values.newNumber}
                      onChange={(e) =>
                        setValues({ ...values, newNumber: e.target.value })
                      }
                      name="newNumber"
                      placeholder="Enter new number..."
                      maxLength="11"
                    />
                  </div>
                  <div className="w-full flex flex-col justify-start">
                    <h1 className="text-left text-3xl mb-3 flex items-center gap-3">
                      <BsFillShieldLockFill /> Current Password
                    </h1>
                    <input
                      type="password"
                      className={`bg-gray-900 p-5 w-[95%] rounded-md  ${
                        values.currPassword ? "text-white" : ""
                      }`}
                      value={values.currPassword}
                      onChange={(e) => {
                        setValues({ ...values, currPassword: e.target.value });
                        clearError();
                      }}
                      name="currPassword"
                      placeholder="Enter current password..."
                    />
                    <h3 className="text-sm text-red-500">
                      {currPassError && (
                        <div className="text-red-600 text-sm">
                          {currPassError}
                        </div>
                      )}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-5 items-baseline">
                <div className="w-full flex flex-col justify-start">
                  <h1 className="text-left text-3xl mb-3 flex items-center gap-3">
                    <AiFillUnlock /> New Password
                  </h1>
                  <input
                    type="password"
                    className={`bg-gray-900 p-5 w-[95%] rounded-md  ${
                      values.newPassword ? "text-white" : ""
                    }`}
                    value={values.newPassword}
                    onChange={(e) =>
                      setValues({ ...values, newPassword: e.target.value })
                    }
                    name="newPassword"
                    placeholder="Enter new password..."
                  />
                </div>
                <div className="w-full flex flex-col justify-start">
                  <h1 className="text-left text-3xl mb-3 flex items-center gap-3">
                    <AiFillLock /> Confirm Password
                  </h1>
                  <input
                    type="password"
                    className={`bg-gray-900 p-5 rounded-md w-[95%] ${
                      values.confirmPassword ? "text-white" : ""
                    }`}
                    value={values.confirmPassword}
                    onChange={(e) => {
                      setValues({ ...values, confirmPassword: e.target.value });
                      clearError();
                    }}
                    name="confirmPassword"
                    placeholder="Enter confirm password..."
                  />
                  <h3 className="text-sm text-red-500">
                    {error && (
                      <div className="text-red-600 text-sm">{error}</div>
                    )}
                  </h3>
                </div>
                <div className="w-full flex">
                  <button
                    type="submit"
                    onClick={(e) => handleEditSubmit(e)}
                    className="transition w-[95%] ease-in-out delay-150 bg-blue-400 hover:-translate-y-1 hover:scale-100 hover:bg-blue-600 hover:text-white duration-300 p-5 flex justify-center items-center gap-5 rounded-lg text-gray-900 text-2xl"
                  >
                    <BsClipboard2CheckFill />
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <h1 className="m-auto text-3xl">
              {success && (
                <div className="text-3xl" id="success">
                  {success}
                </div>
              )}
            </h1>
          </div>

          <div className="flex justify-end absolute top-5 right-5">
            <button
              onClick={() => handleReturn}
              className="flex gap-2 items-center justify-end transition ease-in-out delay-150 bg-green-400 hover:-translate-y-1 hover:scale-100 hover:bg-green-600 hover:text-white duration-300 p-5 rounded-lg text-gray-900"
            >
              <BsBoxArrowLeft />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
