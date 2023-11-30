import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  OtpRequest,
  ResetComponents,
  ResetPasswordForm,
} from "./ResetComponents";

function ResetPassword() {
  const [state, setState] = useState({
    currPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [authenticated, setAuthenticated] = useState(false);
  const [otpRequest, setOtpRequest] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  let countdown = 3;

  const handleCheckEmail = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:5000/api/reset-password/" + email)
      .then((response) => {
        console.log(response);
        setOtpRequest(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
  };

  const handleSubmitOTP = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/reset-password/" + email, { otp })
      .then((response) => {
        console.log(response);
        setAuthenticated(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
  };

  const handleInputChange = (e) => {
    setError("");
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/reset-password/user/" + email, {
        oldPassword: state.currPassword,
        newPassword: state.newPassword,
        confirmPassword: state.confirmPassword,
      })
      .then((response) => {
        console.log(response);
        setSuccess(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-800 flex justify-center items-center">
      {otpRequest === false && authenticated === false && (
        <ResetComponents
          handleCheckEmail={handleCheckEmail}
          email={email} error={error}
          setEmail={setEmail} setError={setError}
        />
      )}
      {otpRequest === true && authenticated === false && (
        <OtpRequest
          otp={otp}
          setOtp={setOtp}
          handleSubmitOTP={handleSubmitOTP}
        />
      )}
      {authenticated === true && (
        <ResetPasswordForm
          state={state}
          handleInputChange={handleInputChange}
          handlePasswordChange={handlePasswordChange}
          error={error} success={success}
        />
      )}
    </div>
  );
}

export default ResetPassword;
