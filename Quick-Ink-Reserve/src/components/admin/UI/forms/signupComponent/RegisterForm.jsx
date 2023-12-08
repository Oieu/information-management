import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Label from "../formComponents/Label";
import Inputs from "../formComponents/Inputs";
import Errors from "../formComponents/Errors";

function RegisterForm({ handleSubmit, handleFileInputChange, values, setValues, errors }) {

  return (
    <form onSubmit={handleSubmit} className="flex gap-5 flex-col">
      <div className="flex flex-col align-items-center justify-center gap-x-4">
        <Label labelFor="userName" title="Username" />
        <Inputs 
          type="text"
          placeholder="Enter your user name..."
          name="userName"
          value={values.userName}
          handleChange={(e) => setValues({ ...values, userName: e.target.value })}
          margined={true}
        />
      </div>
      <div className="flex flex-col align-items-center justify-center gap-x-4">
        <Label labelFor="email" title="Email" />
        <Inputs 
          type="email"
          placeholder="Enter your email..."
          name="email"
          value={values.email}
          handleChange={(e) => setValues({ ...values, email: e.target.value }, { ...errors, emailError: "" })}
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
          value={values.password}
          handleChange={(e) => setValues({ ...values, password: e.target.value })}
          margined={true}
        />
        {errors.passwordError && (
          <Errors errors={errors.passwordError} />
        )}
      </div>
      <div className="flex flex-col align-items-center justify-center gap-x-4">
        <Label labelFor="number" title="Contact Number" />
        <input 
          type="text"
          placeholder="Enter your contact number..."
          name="number"
          value={values.number}
          onChange={(e) => setValues({ ...values, number: e.target.value })}
          className="bg-gray-300 p-2 w-2/3 m-auto rounded-md placeholder:text-gray-400 text-gray-900"
          maxLength="11"
        />
        {errors.error && (
          <Errors errors={errors.error} />
        )}
      </div>
      <div className="m-auto flex flex-col gap-5 justify-center items-center outline-dashed outline-black outline-offset-2 h-32 w-2/3">
        {!values.profilePicture && (
          <label htmlFor="" className="text-gray-500">
            Upload your profile picture
          </label>
        )}
        {values.profilePicture && (
          <img
            src={URL.createObjectURL(values.profilePicture)}
            alt="Profile Preview"
            className="max-w-[45%] max-h-[50%] rounded-full"
          />
        )}
        <div className="w-[70%] flex justify-center items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            name="profilePicture"
            className="text-black cursor-pointer"
          />
        </div>
      </div>
      <button className="target:shadow-lg text-black hover:text-white w-1/2 mx-auto p-3 bg-green-400 hover:bg-green-800 hover:border-transparent transition duration-500 ease-in-out">
        Sign Up
      </button>
      <div>
        <span className="text-gray-500 text-sm">Already have an account? </span>
        <Link to="/login" className="text-sm">
          Login
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
