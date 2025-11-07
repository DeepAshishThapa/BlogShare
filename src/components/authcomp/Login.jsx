import React from 'react'
import { Paper, Typography, TextField, Button, Container, Alert, Snackbar, InputAdornment, IconButton } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import authService from '@/Appwrite/auth/auth';
import { login } from '../../Appwrite/auth/authSlice.js'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


/**
 * Login Component
 * --------------------------------------------
 * Handles user login using Appwrite authentication.
 * Includes form validation, password visibility toggle,
 * success/error feedback via Snackbars, and Redux state update.
 */

function Login() {
    // ---------- React Hook Form setup ----------
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting } } = useForm()


    const navigate = useNavigate()       // To redirect after successful login
    const dispatch = useDispatch()      // To store user data in Redux


    const [Error, setError] = useState("")               // Stores error message
    const [openError, setopenError] = useState(false)   // Controls error Snackbar visibility

    const [successMsg, setSuccessMsg] = useState("");           // Stores success message
    const [openSuccess, setOpenSuccess] = useState(false);      // Controls success Snackbar visibility

    const [showPassword, setShowPassword] = useState(false);    // Toggles password visibility


    // ---------- Snackbar handlers ----------
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


    // ---------- Submit handler ----------
    const onSubmit = async (data) => {

        try {
            // Attempt login via Appwrite
            const userData = await authService.login(data)


            // Save user data to Redux store
            dispatch(login(userData))

            // Show success message
            setSuccessMsg("Login successful!");
            setOpenSuccess(true)

            // Redirect to All Posts page after short delay
            setTimeout(() => navigate("/all-posts"), 1200);

        }
        catch (error) {
            // Show error message if login fails
            setError(error.message)
            setopenError(true)
        }

    }
    return (
        <div>
            {/* ---------- Login Form ---------- */}
            <Container maxWidth="sm" sx={{ mt: 10 }}>

                <Paper sx={{ padding: 2, textAlign: "center" }} >
                    <LockIcon color="primary" />

                    <Typography variant="h5" sx={{ fontWeight: "bold", my: 1 }}>
                        Log In
                    </Typography>

                    {/* ---------- Form ---------- */}
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
                        <TextField id="outlined-basic2" label="Enter password" variant="outlined" fullWidth sx={{ mb: 2 }}
                            {...register("password", {
                                required: "Password is required",

                            })}
                            type={showPassword ? "text" : "password"}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword((v) => !v)}
                                                edge="end"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}

                        />

                        {/* Submit Button */}
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

            {/* ---------- Error Snackbar ---------- */}
            <Snackbar
                open={openError}
                autoHideDuration={4000}
                onClose={handleCloseError}


            >
                <Alert onClose={handleCloseError} severity="error" variant="filled" sx={{ width: "100%" }}>
                    {Error}
                </Alert>
            </Snackbar>


            {/* ---------- Success Snackbar ---------- */}
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
