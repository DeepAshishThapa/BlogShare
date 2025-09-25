import React from 'react'
import MediaCard from "../components/card/Card.jsx"
import { Box, Typography } from '@mui/material'
import { Container } from '@mui/material'

function Allposts() {
  return (
    <div>
      <Box
        sx={{
          backgroundImage: 'linear-gradient(to right, #0a1f44 0%, #1d3989 50%, #5873bc 80%)',
          color: 'white',
          py: { xs: 5, sm: 5},

        }}
      >
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

        </Container>

      </Box>


      <MediaCard />

    </div>
  )
}

export default Allposts
