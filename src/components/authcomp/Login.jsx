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
import { useForm } from 'react-hook-form';

function Login() {
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting } } = useForm()

    const navigate = useNavigate()
    const dispatch = useDispatch()



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



    const onSubmit = async (data) => {
        
        try {
            const userData = await authService.login(data)
            dispatch(login(userData))
            setSuccessMsg("Login successful!");
            setOpenSuccess(true)
            setTimeout(() => navigate("/"), 1500);

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField id="outlined-basic" label="Enter email" variant="outlined" fullWidth sx={{ mb: 2 }}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },

                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}

                        />
                        <TextField id="outlined-basic" label="Enter password" variant="outlined" fullWidth sx={{ mb: 2 }}
                            {...register("password", {
                                required: "Email is required",

                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}

                        />

                        {/* <FormControlLabel control={<Checkbox checked={remember} onChange={(e)=>setRemember(e.target.checked)}/>} label="Remember Password" sx={{mb:2}} /> */}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isSubmitting}     
                        >
                           {isSubmitting ? "Submitting..." : "LogIn"}
                        </Button>

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
