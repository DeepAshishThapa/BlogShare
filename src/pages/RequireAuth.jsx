import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import { Alert, Container } from "@mui/material";


function RequireAuth() {
    const authStatus = useSelector((s) => s.auth.status)

    if (!authStatus) {
        // Block protected content and show a small banner on that route.
        return (
            <div>
                <Container maxWidth="md" sx={{ py: 6 }}>
                    <Alert severity="warning" variant="filled">
                        You need to log in to access this page.
                    </Alert>
                </Container>


            </div>
        )


    }
     // Logged in → render the actual protected page(s)
    return <Outlet />;

}

export default RequireAuth
