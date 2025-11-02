import React from 'react'
import PostForm from "../components/post-form/PostForm";
import { Box } from '@mui/material';

function Addposts() {
  return (
    <>
      <Box
        sx={{

          color: 'white',
          py: { xs: 5, sm: 5 },

        }}
      >
        <PostForm />
      </Box>

    </>
  )
}

export default Addposts
