import React from "react";
import { Link } from "react-router-dom";
import Label from "../formComponents/Label";
import Inputs from "../formComponents/Inputs";
import Errors from "../formComponents/Errors";

function LoginForm({
  user,
  handleEmailChange,
  handlePasswordChange,
  errors,
  handleSubmit,
}) {
  return (
    <form action="" method="post" className="flex gap-5 flex-col">
      <div className="flex flex-col align-items-center justify-center gap-x-4">
        <Label labelFor="email" title="Email" />
        <Inputs 
          type="email"
          placeholder="Enter your email..."
          name="email"
          value={user.email}
          handleChange={handleEmailChange}
          margined={true}
        />
        {errors.emailError && (
          <Errors errors={errors.emailError} />
        )}
      </div>
      <div className="flex flex-col align-items-center justify-center gap-x-4">
        <Label labelFor="password" title="Password" />
        <Inputs 
          type="password"
          placeholder="Enter your password..."
          name="password"
          value={user.password}
          handleChange={handlePasswordChange}
          margined={true}
        />
        {errors.passwordError && (
          <Errors errors={errors.passwordError} />
        )}
      </div>
      <div className="flex justify-end w-2/3 m-auto">
        <a className="text-xs text-red-500 hover:text-red-800 transition-all" href="/forgot-password">Forgot Password?</a>
      </div>
      <button
        className="target:shadow-lg text-black hover:text-white w-1/2 mx-auto p-3 bg-blue-400 hover:bg-blue-800 hover:border-transparent transition duration-500 ease-in-out"
        onClick={handleSubmit}
      >
        Sign In
      </button>
      <h3 className="text-gray-500 text-sm">
        Don't have an account yet? <Link to="/signUp" className="text-green-500 transition-all hover:text-green-700">Register</Link>
      </h3>
    </form>
  );
}

export default LoginForm;
