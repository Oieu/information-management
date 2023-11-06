import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../index.css'
import CheckUser from '../controllers/CheckUser';

import { RegisterFormContainer } from './admin/UI/forms/Forms';
import BackToHome from './admin/UI/BackToHome';
import { useAppContext } from '../controllers/auth/AuthContext';
import { TabTitle } from '../utils/GeneralFunctions';

function SignUp() {
  TabTitle('Register', false);
  const { loginStatus, user } = useAppContext();
  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: '',
    profilePicture: null
  });
  const [errors, setErrors] = useState({
    error: '',
    emailError: '',
    passwordError: ''
  });
  const nav = useNavigate();

  axios.defaults.withCredentials = true;

  //INPUT VALIDATION
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    let passwordError = '';
  
    if (!/(?=.*[a-z])/.test(password)) {
      passwordError = 'Password must contain at least one lowercase letter. ';
      return passwordError.trim();
    }
  
    if (!/(?=.*[A-Z])/.test(password)) {
      passwordError = 'Password must contain at least one uppercase letter. ';
      return passwordError.trim();
    }
  
    if (!/(?=.*\W)/.test(password)) {
      passwordError = 'Password must contain at least one special character. ';
      return passwordError.trim();
    }
  
    if (password.length < 8) {
      passwordError = 'Password must be at least 8 characters long. ';
      return passwordError.trim();
    }
  
    return passwordError.trim();
  };  
  function handleFileInputChange(event) {
    const fileInput = event.target;
    
    if (fileInput.files && fileInput.files[0]) {
      const selectedFile = fileInput.files[0];
      console.log(`Selected file: ${selectedFile.name}`);
      
      setValues({ ...values, profilePicture: selectedFile });
    }
  };  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(values.email)) {
      return setErrors({ ...errors, emailError: 'Invalid email format' });
    }

    const pError = validatePassword(values.password);
    if (pError) {
      return setErrors({ ...errors, passwordError: pError });
    }

    const formData = new FormData();
    formData.append('userName', values.userName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('profilePicture', values.profilePicture);

    axios.post('http://localhost:5000/signup', formData)
      .then(res => {
          console.log(res.data.Message);
          nav('/login');
      })
      .catch(err => {
          console.log(err);
          if (err.response && err.response.data && err.response.data.Message) {
              console.log(err.response.data.Message);
              setErrors({ ...errors, emailError: err.response.data.Message });
            }
      });
  };
  
  useEffect(() => {
    CheckUser(loginStatus, user, nav);
  }, [loginStatus, user]);

  return (
    <div className='bg-[url("https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")] h-full w-full flex align-items-center justify-center'>
      <RegisterFormContainer 
        values={values}
        setValues={setValues}
        errors={errors}
        setErrors={setErrors}
        handleSubmit={handleSubmit}
        handleFileInputChange={handleFileInputChange}
      />
      <BackToHome color={"text-white"} nav={nav}/>
    </div>
  )
}

export default SignUp;