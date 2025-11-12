import { useEffect, useState } from 'react'

import './App.css'
import { login, logout } from './Appwrite/auth/authSlice'
import { useDispatch } from 'react-redux'
import authService from './Appwrite/auth/auth'

import Login from './components/authcomp/Login'
import AppRoutes from './Routes/Routes'




function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    authService.getAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData)); //  restore session
        } else {
          dispatch(logout());
        }
      })
      .catch(() => dispatch(logout()));
  }, [dispatch]);




  










  return (

    <>

  



      <AppRoutes />
      




      
















    </>
  )
}

export default App
