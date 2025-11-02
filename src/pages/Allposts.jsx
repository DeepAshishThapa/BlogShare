import React from 'react'
import {Box} from '@mui/material'
import AllpostsHero from '@/components/Allposts/AllpostsHero.jsx'
import AllpostsSection from '@/components/Allposts/AllpostsSection.jsx'

function Allposts() {


  return (
    <>
      <Box
        sx={{
          backgroundImage: 'linear-gradient(to right, #0a1f44 0%, #1d3989 50%, #5873bc 80%)',
          color: 'white',
          py: { xs: 5, sm: 5 },

        }}
      >
        <AllpostsHero/>
        
        

      </Box>
      <AllpostsSection/>
      
      




    </>
  )
}

export default Allposts
