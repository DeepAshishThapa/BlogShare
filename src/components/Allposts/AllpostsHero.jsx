// AllpostsHero.jsx
// This component displays a hero section at the top of the "All Posts" page.
// It introduces the TechNest platform with a headline and tagline.

import React from 'react'
import { Container, Typography } from '@mui/material'

function AllpostsHero() {
    return (
        <>
            {/* Outer container centers the content and provides responsive spacing */}
            <Container sx={{ textAlign: "center" }}>
                <Typography
                    variant="overline"

                    sx={{ fontWeight: 'bold', fontSize: "1rem" }}
                >
                    TechNest

                </Typography>

                {/* Main heading for the hero section */}
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
                    Explore the smartest ideas, insights, and stories in tech — all in one place.
                </Typography>

            </Container >
        </>
    )
}

export default AllpostsHero 
