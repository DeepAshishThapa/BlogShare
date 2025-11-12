import React from 'react'
import {Box} from '@mui/material'
import AllpostsHero from '@/components/Allposts/AllpostsHero.jsx'
import AllpostsSection from '@/components/Allposts/AllpostsSection.jsx'

function Allposts() {


  return (
    <>
    {/*  Outer container for the hero section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(160deg, #0a0a0f 0%, #0c1445 40%, #111d5e 100%)',
          color: 'white',
          py: { xs: 5, sm: 5 },

        }}
      >

         {/*Main content section — displays all posts */}
        <AllpostsHero/>
        
        

      </Box>
      <AllpostsSection/>
      
      




    </>
  )
}

export default Allposts
