import React from 'react'
import { useState, useEffect } from 'react';
import postService from '../../Appwrite/post/api.js'
import MediaCard from '../card/Card.jsx';
import { Container, Box, CircularProgress } from '@mui/material';


function AllpostsSection() {
    const [posts, setPosts] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        postService.getposts()
            .then((res) => {
                console.log("Fetched posts:", res);
                if (res && res.rows) {
                    setPosts(res.rows);
                }
            })
            .finally(() => setloading(false))

    }, []);
    return (
        <>
            <Container maxWidth="md" sx={{ mt: 10 }}>
                {
                    loading ? (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '60vh',
                        }}>
                            <CircularProgress />


                        </Box>


                    ) : posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <MediaCard key={post.$id} post={post} />
                        ))
                    ) : (
                        <div>NO POSTS FOUND</div>
                    )
                }
            </Container>


        </>
    )
}

export default AllpostsSection
