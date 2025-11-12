import React from 'react'
import { Box, Button, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import programming from '../assets/programming.svg'
import bulb from '../assets/bulb.svg'
import network from '../assets/network.svg'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router';

function Homepage() {
  const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const navigate=useNavigate()
  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(160deg, #0a0a0f 0%, #0c1445 40%, #111d5e 100%)',
        bgcolor: 'transparent',
        minHeight: "100vh",          // fills full screen height
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        gap: 7
      }}
    >
      <Typography variant="h3" fontWeight={700}
        sx={{
          animation: `${fadeUp} 700ms ease-out both`,
          animationDelay: "0ms",
          textAlign: 'center',
          fontSize: {
            xs: "1.8rem",   //  mobile
            sm: "2.4rem",   //  small screen
            md: "3rem",     //  desktop
          },
        }}
      >
        WELCOME TO TECHNEST
      </Typography>
      <Typography variant="h2" fontWeight={700}
        sx={{
          textAlign: "center",
          animation: `${fadeUp} 700ms ease-out both`,
          animationDelay: "150ms",
          fontSize: {
            xs: "1.8rem",   //  mobile
            sm: "2.4rem",   //  small screen
            md: "3rem",     //  desktop
          },
        }}>
        Explore the smartest ideas, insights, and stories in tech — all in one place.
      </Typography>
      <Button variant="contained"
        sx={{
          bgcolor: "black",
          py: 1.5,
          "&:hover": {
            color: "lightblue",
            scale:1.05
          },
        }}

        onClick={()=>{
          navigate("all-posts")
        }}

      >
        View Posts <ArrowRightIcon />

      </Button>
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: "space-around",
          width: "100%"



        }}
      >

        <Box
          component="img"
          src={programming}
          sx={{
            width: {

              xs: "20%",   // mobile (extra-small)
              sm: "150px",   // small screens

            }

          }}
        />
        <Box
          component="img"
          src={bulb}
          sx={{
            width: {
              xs: "20%",   // mobile (extra-small)
              sm: "150px",   // small screens

            }

          }}
        />
        <Box
          component="img"
          src={network}
          sx={{
            width: {
              xs: "20%",   // mobile (extra-small)
              sm: "150px",   // small screens

            }
          }}
        />
      </Box>



    </Box>
  )
}

export default Homepage
