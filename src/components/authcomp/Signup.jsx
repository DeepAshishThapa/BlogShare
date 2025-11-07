import React from 'react'
import { Paper, Typography, TextField, Button, Container, Alert, Snackbar } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import authService from "@/Appwrite/auth/auth"
import { useNavigate } from 'react-router';
import { login, logout } from "../../Appwrite/auth/authSlice"
import { useDispatch } from 'react-redux'
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/**
 * Signup Component
 * --------------------------------------------------------
 * Allows new users to register an account using Appwrite.
 * Includes:
 *  - Form validation (name, email, password, confirm password)
 *  - Password visibility toggle
 *  - Success & error Snackbars
 *  - Automatic login + redirect after signup
 */


function Signup() {
    // ---------- Redux & Router ----------
    const dispatch = useDispatch();             // Dispatch Redux actions
    const navigate = useNavigate()              // Navigate after signup


    const [showPassword, setShowPassword] = useState(false);  // Toggle password visibility


    // Snackbar states (for success / error feedback)
    const [Error, setError] = useState("")
    const [openError, setopenError] = useState(false)
    const [successMsg, setSuccessMsg] = useState("");
    const [openSuccess, setOpenSuccess] = useState(false);


    // ---------- React Hook Form Setup ----------
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()


    // Watch password field to validate confirm password
    const pwd = watch("password")



    // ---------- Snackbar Handlers ----------
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



    // ---------- Form Submit Handler ----------
    const onSubmit = async (data) => {

        try {
            // Remove confirmPassword before sending to API
            const { confirmPassword, ...formData } = data;

            // Create account using Appwrite
            const userData = await authService.createAccount(formData)

            // Automatically log user in and update Redux state
            dispatch(login(userData));

            // Show success message
            setSuccessMsg("Signup successful!");
            setOpenSuccess(true)

            // Redirect to homepage after short delay
            setTimeout(() => navigate("/"), 1500);


        }

        catch (error) {

            setError(error.message)
            setopenError(true)
        }

    }
    return (
        <div>
            {/* ---------- Signup Form ---------- */}
            <Container maxWidth="sm" sx={{ mt: 10 }}>

                <Paper sx={{ padding: 2, textAlign: "center" }} >
                    <LockIcon color="primary" />

                    <Typography variant="h5" sx={{ fontWeight: "bold", my: 1 }}>
                        Sign Up

                    </Typography>


                    {/* ---------- Form ---------- */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField id="outlined-basic" label="Enter name" variant="outlined" fullWidth sx={{ mb: 2 }}
                            {...register("name", { required: "Name is required" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                        {/* Email Field */}
                        <TextField id="outlined-basic2" label="Enter email" variant="outlined" fullWidth sx={{ mb: 2 }}
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


                        {/* Password Field */}
                        <TextField id="outlined-basic" label="Enter password" variant="outlined" fullWidth sx={{ mb: 2 }}
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: "Password is required" })}
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


                        {/* Confirm Password Field */}
                        <TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth sx={{ mb: 2 }}
                            type={showPassword ? "text" : "password"}
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (v) => v === pwd || "Passwords do not match",
                            })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
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
                            disabled={isSubmitting}     // ⬅️ disabled while submitting
                        >
                            {isSubmitting ? "Submitting..." : "SignUp"}
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

export default Signup
