import React from 'react'
import Card from "../components/card/Card.jsx"
import { Box, Typography } from '@mui/material'
import { Container } from '@mui/material'
import { useState } from 'react'
import postService from '../Appwrite/post/api.js'
import { useEffect } from 'react'

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
    <div>
      <Box
        sx={{
          backgroundImage: 'linear-gradient(to right, #0a1f44 0%, #1d3989 50%, #5873bc 80%)',
          color: 'white',
          py: { xs: 5, sm: 5 },

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

      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.$id} post={post} />
        ))
      ) : (
        <p>No posts found.</p>
      )}

    


    </div>
  )
}

export default Allposts
