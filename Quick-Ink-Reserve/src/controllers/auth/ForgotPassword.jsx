import React, { useState } from 'react';
import axios from 'axios';
import Label from '../../components/admin/UI/forms/formComponents/Label'

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const handleForgotPassword = async () => {
        if(email.trim() === '') {
            return setErrors("Input an email.");
        }
        if (!validateEmail(email)) {
            return setErrors("Invalid email format.");
        }
        try {
            await axios.post('http://localhost:5000/api/forgot-password', { email });
            alert('Check your email to reset your password');
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className='relative w-full h-full flex flex-col items-center justify-center m-auto bg-[url("https://images.unsplash.com/photo-1642025967715-0410af8d7077?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-no-repeat'>
        <div className='w-full h-full bg-black absolute z-[0] opacity-60'></div>
        <div className='w-1/2 h-2/3 bg-gray-200 relative z-1 flex justify-center items-center gap-10 shadow-gray-600 shadow-md rounded-xl'>
            <div className='w-1/2 h-2/3 flex flex-col justify-center items-center gap-10'>
                <h2 className='text-4xl text-gray-600'>Forgot Password</h2>
                <div className='h-4/5 w-full flex flex-col justify-center items-center gap-5'>
                    <div className='w-full flex flex-col items-center gap-3'>
                        <div className='w-2/3 flex'>
                            <Label labelFor='email' title="Email"/>
                        </div>
                        <input 
                            type="email"
                            placeholder='Enter your email...'
                            value={email}
                            onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors('');
                                }
                            }
                            className='text-black w-2/3 bg-slate-200 p-5 shadow-xl rounded-xl border-black border'
                        />
                        {errors && <p className='text-red-500'>{errors}</p>}
                    </div>
                    <button className='w-2/3' onClick={handleForgotPassword}>Reset Password</button>
                </div>
            </div>
            <div className='w-1/2 h-full rounded-r-xl bg-[url("https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-no-repeat'></div>
        </div>
    </div>
  )
}

export default ForgotPassword;