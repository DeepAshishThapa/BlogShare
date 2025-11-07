import * as React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';

import postService from '../../Appwrite/post/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import parse from 'html-react-parser';


/**
 * MediaCard Component
 * --------------------------------------------------
 * Displays a single post in a styled MUI Card.
 * Shows:
 *  - Featured image (fetched from Appwrite Storage)
 *  - Post title
 *  - Short preview of post content (3-line clamp)
 *  - "Learn More" button that navigates to full post
 */


export default function MediaCard({ post }) {
  const [imgUrl, setImgUrl] = useState("");      // holds the Appwrite file preview URL
  const navigate = useNavigate()                 // to navigate to detailed post page


  // ---------- Fetch featured image preview URL ----------
  useEffect(() => {
    let cancelled = false;

    // async IIFE to fetch preview URL for post image
    (async () => {
      const url = await postService.getfilepreview(post.featuredImage);
      if (!cancelled) setImgUrl(url);
    })();


    // cleanup function to prevent memory leaks
    return () => { cancelled = true; };
  }, [post.featuredImage]);


  
  return (
    <Card
      elevation={8}
      sx={{
        maxWidth: '100%',
        mb: 10,
        px: 1,
        py: 2


      }}>
      <CardMedia
        component="img"
        sx={{
          height: 400,
          objectFit: 'cover',

        }}
        image={imgUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography
          component="div"
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,

          }}>
          {parse(post.content || '')}
        </Typography>
      </CardContent>
      <CardActions>

        <Button
          size="small"
          sx={{ backgroundColor: "#1d0a3d", color: 'white' }}
          onClick={() => { navigate(`/post/${post.$id}`) }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
