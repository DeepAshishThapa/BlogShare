import React from 'react'
import { Paper, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material'
import { Container } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import authService from '@/Appwrite/auth/auth';
import { login } from '../../Appwrite/auth/authSlice.js'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CheckIcon from '@mui/icons-material/Check';

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [Error, setError] = useState("")
    const [openError, setopenError] = useState(false)

    const [successMsg, setSuccessMsg] = useState("");
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;

        }
        setopenError(false)
    }

    const handleCloseSuccess = (event, reason) => {
        if (reason === "clickaway") {
            return;

        }
        setOpenSuccess(false);


    };



    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
           const userData = await authService.login({ email, password })
            dispatch(login(userData))
            setSuccessMsg("Login successful!");
            setOpenSuccess(true)
            setTimeout(() => navigate("/"), 1000);

        }
        catch (error) {
            console.log(error)
            setError(error.message)
            setopenError(true)
        }


    }
    return (
        <div>
            <Container maxWidth="sm" sx={{ mt: 10 }}
            >

                <Paper sx={{ padding: 2, textAlign: "center" }} >
                    <LockIcon color="primary" />

                    <Typography variant="h5" sx={{ fontWeight: "bold", my: 1 }}>
                        Log In

                    </Typography>
                    <form onSubmit={handlesubmit}>
                        <TextField id="outlined-basic" label="Enter email" variant="outlined" type='email' required fullWidth sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Enter password" variant="outlined" required fullWidth sx={{ mb: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />

                        {/* <FormControlLabel control={<Checkbox checked={remember} onChange={(e)=>setRemember(e.target.checked)}/>} label="Remember Password" sx={{mb:2}} /> */}
                        <Button type="submit" variant="contained" fullWidth>Log In</Button>

                    </form>

                </Paper>
            </Container>
            <Snackbar
                open={openError}
                autoHideDuration={4000}
                onClose={handleCloseError}


            >
                <Alert onClose={handleCloseError} severity="error" variant="filled" sx={{ width: "100%" }}>
                    {Error}
                </Alert>
            </Snackbar>

            <Snackbar
                open={openSuccess}
                autoHideDuration={2500}
                onClose={handleCloseSuccess}

            >
                <Alert
                    onClose={handleCloseSuccess}
                    severity="success"
                    icon={<CheckIcon fontSize="inherit" />}
                    sx={{ width: "100%" }}
                >
                    {successMsg}
                </Alert>
            </Snackbar>







        </div>
    )
}

export default Login
