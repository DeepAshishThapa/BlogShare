import React from 'react'
import { Paper, Typography, TextField, FormControlLabel,Checkbox, Button} from '@mui/material'
import { Container } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';

function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [remember,setRemember]=useState(false)


    const handlesubmit = (e) => {
        e.preventDefault()
        console.log({email,password,remember})


    }
    return (
        <div>
            <Container maxWidth="sm" sx={{mt:10}}
            >

                <Paper sx={{ padding: 2, textAlign: "center" }} >
                    <LockIcon color="primary" />

                    <Typography variant="h5" sx={{ fontWeight: "bold", my: 1 }}>
                        Log In

                    </Typography>
                    <form onSubmit={handlesubmit}>
                        <TextField id="outlined-basic" label="Enter email" variant="outlined" type='email' required fullWidth sx={{ mb: 2 }} value={email} onChange ={(e)=>setEmail(e.target.value)}/>
                        <TextField id="outlined-basic" label="Enter password" variant="outlined" required fullWidth sx={{ mb: 2 }} value={password} onChange={(e)=>setPassword(e.target.value)}/>

                        {/* <FormControlLabel control={<Checkbox checked={remember} onChange={(e)=>setRemember(e.target.checked)}/>} label="Remember Password" sx={{mb:2}} /> */}
                        <Button type="submit" variant="contained" fullWidth>Log In</Button>

                    </form>

                </Paper>
            </Container>






        </div>
    )
}

export default Login
