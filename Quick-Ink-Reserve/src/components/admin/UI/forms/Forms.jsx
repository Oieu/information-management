import React from "react";
import FormHeader from "./formComponents/FormHeaders";
import LoginForm from "./loginComponents/LoginForm";
import RegisterForm from "./signupComponent/RegisterForm";
import ImageSide from "./formComponents/ImageSide";

export function LoginFormContainer({
  user,
  errors,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
}) {
  return (
    <div className="m-auto bg-white w-full md:w-1/2 rounded-md flex gap-5 flex-col">
      <FormHeader text={"Login"} />
      <LoginForm
        user={user}
        errors={errors}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export function RegisterFormContainer({
  values,
  setValues,
  errors,
  setErrors,
  handleSubmit,
  handleFileInputChange,
}) {
  return (
    <div className="w-4/5 md:w-2/3 2xl:w-1/2 h-4/5 bg-white rounded-2xl m-auto flex border-black border shadow-sm shadow-gray-200">
      <ImageSide
        url={`https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80`}
      />
      <div className="m-auto bg-white w-full xl:w-1/2 rounded-md flex gap-5 flex-col">
        <FormHeader text={"Register"} />
        <RegisterForm
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          handleSubmit={handleSubmit}
          handleFileInputChange={handleFileInputChange}
        />
      </div>
    </div>
  );
}
