import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import postService from '../../Appwrite/post/api';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
export default function MediaCard({ post }) {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const url = await postService.getfilepreview(post.featuredImage);
      if (!cancelled) setImgUrl(url);
    })();
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
        <Typography variant="body2"
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

        <Button size="small" sx={{backgroundColor:"#1d0a3d", color:'white'}}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
