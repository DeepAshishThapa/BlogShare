import React from 'react'
import { useState, useEffect } from 'react';
import postService from '../../Appwrite/post/api.js'
import MediaCard from '../card/Card.jsx';
import { Container, Box, CircularProgress } from '@mui/material';


/**
 * AllpostsSection Component
 * ----------------------------------
 * This component fetches and displays all posts from the Appwrite database.
 * It shows a loading spinner while fetching and a list of MediaCard components when done.
 */
function AllpostsSection() {

    const [posts, setPosts] = useState([])             // Stores all fetched posts
    const [loading, setloading] = useState(true)        // Controls the loading spinner visibility



    // ---------- Fetch posts on component mount ----------
    useEffect(() => {
        postService.getposts()
            .then((res) => {
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
