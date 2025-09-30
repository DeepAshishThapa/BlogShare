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


function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    const pwd = watch("password")



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
            const { confirmPassword, ...formData } = data;
            const userData = await authService.createAccount(formData)

            dispatch(login(userData));
            setSuccessMsg("Signup successful!");
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
            <Container maxWidth="sm" sx={{ mt: 10 }}>

                <Paper sx={{ padding: 2, textAlign: "center" }} >
                    <LockIcon color="primary" />

                    <Typography variant="h5" sx={{ fontWeight: "bold", my: 1 }}>
                        Sign Up

                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField id="outlined-basic" label="Enter name" variant="outlined" fullWidth sx={{ mb: 2 }}
                            {...register("name", { required: "Name is required" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
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
                            {...register("password", { required: "Password is required" })}
                            error={!!errors.password}
                            helperText={errors.password?.message}

                        />
                        <TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth sx={{ mb: 2 }}
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (v) => v === pwd || "Passwords do not match",
                            })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />


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

export default Signup
