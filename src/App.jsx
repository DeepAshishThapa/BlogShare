import { useEffect, useState } from 'react'

import './App.css'
import { login, logout } from './Appwrite/auth/authSlice'
import { useDispatch } from 'react-redux'
import authService from './Appwrite/auth/auth'

import { AppBar, Box, Grid } from '@mui/material'


import Login from './components/authcomp/Login'
import AppRoutes from './Routes/Routes'




function App() {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true)
  // const dispatch = useDispatch()

  // useEffect(() => {

  //   authService.getAccount()
  //     .then((userData) => {
  //       if (userData) {
  //         dispatch(login(userData))

  //       }
  //       else {
  //         dispatch(logout())
  //       }


  //     })
  //     .finally(() => setLoading(false))





  // }, [])


  useEffect(() => {
    authService.getAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData)); // ✅ restore session
        } else {
          dispatch(logout());
        }
      })
      .catch(() => dispatch(logout()));
  }, [dispatch]);




  










  return (

    <>

      {/* <AppBar position='sticky'>
          <Toolbar>My App</Toolbar>
          
        </AppBar> */}



      <AppRoutes />
      




      
















    </>
  )
}

export default App
