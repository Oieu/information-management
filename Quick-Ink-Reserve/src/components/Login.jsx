import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginFormContainer } from "./admin/UI/forms/Forms";
import ImageSide from "./admin/UI/forms/formComponents/ImageSide";
import BackToHome from "./admin/UI/BackToHome";
import { useAppContext } from "../controllers/auth/AuthContext";
import CheckUser from "../controllers/CheckUser";
import { TabTitle } from "../utils/GeneralFunctions";

function Login() {
  TabTitle('Login', false);
  const { loginStatus, user, setLoginStatus, setUser } = useAppContext();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    error: "",
    emailError: "",
    passwordError: "",
  });

  axios.defaults.withCredentials = true;

  //INPUT HANDLERS
  const clearErrors = () => {
    setErrors({
      error: "",
      emailError: "",
      passwordError: "",
    });
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, emailError: "" });
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, passwordError: "" });
  };
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    if (email.trim() === "" || password.trim() === "") {
      if(email.trim() === "") {
        return setErrors({ ...errors, emailError: "Please input all fields." });
      } else {
        return setErrors({ ...errors, passwordError: "Please input all fields." });
      }
    }

    const validationErrors = {};
    if (!validateEmail(email)) {
      return setErrors({ ...errors, emailError: "Invalid email format" });
    }

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:5000/login", { email, password })
        .then((res) => {
          setLoginStatus(res.data.loggedIn);
          setUser(res.data.user);
          if (res.data.user.userRole === "ADMIN") {
            nav("/admin");
          } else {
            nav("/");
          }
        })
        .catch((err) => {
          if (err.response.data.Message) {
            setErrors({ ...errors, error: err.response.data.Message });
          } else if (err.response.data.errorEmailMessage) {
            setErrors({
              ...errors,
              emailError: err.response.data.errorEmailMessage,
            });
          } else if (err.response.data.errorPasswordMessage) {
            setErrors({
              ...errors,
              passwordError: err.response.data.errorPasswordMessage,
            });
          }
        });
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    CheckUser(loginStatus, user, nav);
  }, [loginStatus, user]);

  return (
    <>
      <div className='h-full w-full flex align-items-center relative'>
        <div className='absolute z-[-1] blur-sm opacity-70 bg-[url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2103&q=80")] bg-cover bg-no-repeat h-full w-full '></div>
        <div className="m-auto border-black border shadow-md shadow-gray-200 bg-white w-4/5 md:w-2/3 2xl:w-1/2 h-2/3 rounded-md flex">
          <LoginFormContainer
            user={user}
            errors={errors}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleSubmit}
          />
          <ImageSide
            url={`https://plus.unsplash.com/premium_photo-1682145873665-e196ffa72b97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80`}
          />
        </div>
        <BackToHome color={"text-gray-700"} nav={nav} />
      </div>
    </>
  );
}

export default Login;
