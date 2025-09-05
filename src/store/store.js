import {configureStore} from '@reduxjs/toolkit'
import authreducer from '../Appwrite/auth/authSlice'

const store=configureStore({
    reducer:{
        authreducer
    }
          
    
})

export default store