import React, { useEffect, useState } from "react";
import ImageSide from "../../components/admin/UI/forms/formComponents/ImageSide";

export function ResetComponents({
  handleCheckEmail,
  email,
  setEmail,
  error,
  setError,
}) {
  return (
    <div className="w-1/2 h-2/3 bg-zinc-300 rounded-xl border-black border-2 shadow-lg shadow-white flex items-center">
      <div className="w-1/2 h-2/3 flex flex-col gap-5 p-5 justify-center items-center">
        <h2 className="text-gray-700 flex justify-center items-center text-4xl">
          Enter your email
        </h2>
        <form
          className="h-1/2 flex flex-col items-center w-full gap-5"
          onSubmit={(e) => handleCheckEmail(e)}
        >
          <div className="w-full flex justify-center flex-col items-center">
            <label className="w-2/3 flex justify-start items-center text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              className="placeholder:text-gray-400 text-black w-2/3 bg-slate-200 p-5 shadow-xl rounded-xl border-black border"
              required
            />
          </div>
          <button
            className="bg-blue-400 text-black border-gray-500 transition-all w-2/3 hover:translate-y-[-2px] hover:text-gray-300 hover:border-black hover:bg-blue-600"
            type="submit"
          >
            Check OTP
          </button>
        </form>
        {error && <p className="text-red-200 text-lg flex justify-center items-center w-full h-12 bg-red-800 rounded-lg">{error}</p>}
      </div>
      <div className="w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1609358905581-e5381612486e?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover"></div>
    </div>
  );
}

export function OtpRequest({ otp, setOtp, handleSubmitOTP }) {
  return (
    <div className="w-1/2 h-2/3 bg-zinc-300 rounded-lg flex">
      <div className="w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1609358905581-e5381612486e?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover"></div>
      <div className="w-1/2 h-full flex flex-col p-5 justify-center">
        <h1 className="text-gray-700 flex justify-center items-center h-1/3">
          Enter your OTP
        </h1>
        <form
          onSubmit={handleSubmitOTP}
          className="w-full h-2/3 flex flex-col items-center gap-5"
        >
          <input
            type="text"
            name="otp"
            placeholder="123456..."
            value={otp}
            onChange={(e) => {
              e.preventDefault();
              setOtp(e.target.value);
            }}
            className="placeholder:text-gray-400 text-black w-2/3 bg-slate-200 p-5 shadow-xl rounded-xl border-black border"
            required
          />
          <button
            className="bg-gray-800 transition-all w-2/3 text-gray-300 hover:bg-gray-950 border-none hover:translate-y-[-1px]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export function ResetPasswordForm({
  state,
  handleInputChange,
  handlePasswordChange,
  error, success
}) {
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    let countdown;
    if (timer > 0 && success) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && success) {
      window.location.href = "/login";
    }
    return () => clearInterval(countdown);
  }, [timer, success]);

  return (
    <div className="w-1/2 h-2/3 bg-gray-300 rounded-lg flex">
      <div className="w-1/2 h-full flex flex-col gap-5 p-5 justify-center">
        <h1 className="text-5xl text-gray-700">Reset Your Password</h1>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => handlePasswordChange(e)}
        >
          <section className="flex flex-col w-full items-center">
            <label
              className="w-4/5 text-left text-lg text-gray-700"
              htmlFor="old"
            >
              Old Password
            </label>
            <input
              type="password"
              name="currPassword"
              placeholder="Enter previous password..."
              value={state.currPassword}
              onChange={(e) => handleInputChange(e)}
              className="text-gray-100 bg-zinc-500 p-2 w-4/5 rounded-lg focus:border-black"
            />
          </section>
          <section className="flex flex-col w-full items-center">
            <label
              className="w-4/5 text-left text-lg text-gray-700"
              htmlFor="new"
            >
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password..."
              value={state.newPassword}
              onChange={(e) => handleInputChange(e)}
              className="text-gray-100 bg-zinc-500 p-2 w-4/5 rounded-lg focus:border-black"
            />
          </section>
          <section className="flex flex-col w-full items-center">
            <label
              className="w-4/5 text-left text-lg text-gray-700"
              htmlFor="confirm"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password..."
              value={state.confirmPassword}
              onChange={(e) => handleInputChange(e)}
              className="text-gray-100 bg-zinc-500 p-2 w-4/5 rounded-lg focus:border-black"
            />
          </section>
          <button className="m-auto w-1/2 bg-red-500 text-gray-800 border-none transition-all hover:text-gray-200 hover:bg-red-700 hover:translate-y-[-1px]" type="submit">Reset Password</button>
        </form>
        {error && <p className="w-full h-12 flex justify-center items-center bg-red-700 text-red-300">{error}</p>}
        {success && <p className="w-full h-12 flex justify-center items-center bg-green-700 text-green-300">{success}. Redirecting in {timer}</p>}
      </div>
      <ImageSide url="https://plus.unsplash.com/premium_photo-1681487746049-c39357159f69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
  );
}
