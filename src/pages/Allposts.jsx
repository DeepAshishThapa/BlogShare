import React from 'react'
import {Box} from '@mui/material'
import { useState } from 'react'
import postService from '../Appwrite/post/api.js'
import { useEffect } from 'react'
import AllpostsHero from '@/components/Allposts/AllpostsHero.jsx'
import AllpostsSection from '@/components/Allposts/AllpostsSection.jsx'

function Allposts() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    postService.getposts()
      .then((res) => {
        console.log("Fetched posts:", res);
        if (res && res.rows) {
          setPosts(res.rows);
        }
      })

  }, []);

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
