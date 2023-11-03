import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Profile from './components/Profile'
import Edit from './components/admin/profileComponents/Edit'
import { useAppContext } from './controllers/auth/AuthContext'

function App() {
  const { loginStatus, user, setLoginStatus, setUser } = useAppContext();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const sessionCookie = document.cookie.split(': ')
    .filter((cookie) => cookie.startsWith('name'));

    if(sessionCookie) {
      axios.get('http://localhost:5000/login').then((response) => {
          if(response.data.loggedIn == true) {
              setLoginStatus(response.data.loggedIn);
              setUser((prev) => ({
                ...prev,
                userEmail: response.data.user.userEmail,
                userName: response.data.user.userName,
                userAddress: response.data.user.userAddress,
                userRole: response.data.user.userRole,
                profilePicture: response.data.user.profilePicture
              }));
            } else {
              setLoginStatus(false);
            }
      })
    } else {
      setLoginStatus(false);
    }
  }, []);

  return (
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='*' element={<Home />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/edit' element={<Edit />}/>
        </Routes>
      </Router>
  )
}

export default App
