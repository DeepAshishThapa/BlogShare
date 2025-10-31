import React from 'react'
import { Container,Typography } from '@mui/material'

function AllpostsHero() {
    return (
        <>
            <Container sx={{ textAlign: "center" }}>
            <Typography
                variant="overline"

                sx={{ fontWeight: 'bold', fontSize: "1rem" }}
            >
                BlogShare

            </Typography>
            <Typography
                component="h1"
                sx={{
                    mt: 1,
                    fontWeight: 600,
                    fontFamily: ['"Playfair Display"', "Georgia", "serif"].join(","),
                    fontSize: { xs: "20px", sm: "40px" },
                    lineHeight: 1.1,
                }}
            >
                Enjoy millions of blogs at your fingertips.
            </Typography>

        </Container >
    </>
  )
}

export default AllpostsHero 
