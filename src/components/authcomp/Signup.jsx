import React from 'react'
import { Paper, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material'
import { Container } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import authService from "@/Appwrite/auth/auth"
import { useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { login, logout } from "../../Appwrite/auth/authSlice"
import { useDispatch } from 'react-redux'
import CheckIcon from '@mui/icons-material/Check';



function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

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




    const handlelogout = async () => {
        try {
            await authService.logout()

        }
        catch (error) {
            console.log(error)

        } finally {
            dispatch(logout());
            navigate("/");
        }


    }





    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = await authService.createAccount({ email, password, name })

            dispatch(login(userData));

            setSuccessMsg("Signup successful!");
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
                        Sign Up

                    </Typography>
                    <form onSubmit={handlesubmit}>
                        <TextField id="outlined-basic" label="Enter name" variant="outlined" required fullWidth sx={{ mb: 2 }} value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField id="outlined-basic" label="Enter email" variant="outlined" type='email' required fullWidth sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Enter password" variant="outlined" required fullWidth sx={{ mb: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />


                        <Button type="submit" variant="contained" fullWidth>Sign Up</Button>

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


            <Button variant="contained" onClick={handlelogout}>Logout</Button>



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

export default Signup
