import {configureStore} from '@reduxjs/toolkit'
import authreducer from '../Appwrite/auth/authSlice'

const store=configureStore({
    reducer:{
        auth:authreducer
    }
          
    
})

export default store 