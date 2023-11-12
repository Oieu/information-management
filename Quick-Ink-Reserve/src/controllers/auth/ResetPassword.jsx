import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ResetPassword() {
    const [currPassword, setCurrPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/reset-password')
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
  return (
    <div>
        <h1>Reset Password</h1>
        <form>
            <input type="password" name="currPassword" 
                placeholder='Enter previous password...'
            />
            <input type="password" name="newPassword"
                placeholder='Enter new password...'
            />
            <input type="password" name="confirmPassword"
                placeholder='Confirm new password...'
            />

            <button type='submit'>Reset Password</button>
        </form>
    </div>
  )
}

export default ResetPassword