import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Profile from './components/Profile'
import Edit from './components/admin/profileComponents/Edit'
import ForgotPassword from './controllers/auth/ForgotPassword'
import { useAppContext } from './controllers/auth/AuthContext'
import ServiceAvail from './components/member/LandingPageComponents/ServiceAvail'
import ResetPassword from './controllers/auth/ResetPassword'

function App() {
  const { loginStatus, user, setLoginStatus, setUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const sessionCookie = document.cookie.split(': ')
      .filter((cookie) => cookie.startsWith('name'));

    if (sessionCookie) {
      axios.get('http://localhost:5000/login')
        .then((response) => {
          if (response.data.loggedIn == true) {
            setLoginStatus(response.data.loggedIn);
            setUser((prev) => ({
              ...prev,
              userID: response.data.user.userID,
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
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setLoginStatus(false);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path = '/service-avail/:genServiceName' element = {<ServiceAvail user={user}/>} />
        <Route path = '/reset/*' element = {<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;