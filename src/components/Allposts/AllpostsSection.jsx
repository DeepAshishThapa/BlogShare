import React from 'react'
import { useState, useEffect } from 'react';
import postService from '../../Appwrite/post/api.js'
import MediaCard from '../card/Card.jsx';
import { Container, Box, CircularProgress } from '@mui/material';
import TagsButtons from './TagsButtons.jsx';


/**
 * AllpostsSection Component
 * ----------------------------------
 * This component fetches and displays all posts from the Appwrite database.
 * It shows a loading spinner while fetching and a list of MediaCard components when done.
 */
function AllpostsSection() {

    const [posts, setPosts] = useState([])             // Stores all fetched posts
    const [loading, setloading] = useState(true)        // Controls the loading spinner visibility
    const [selectedTag, setselectedTag] = useState('All')  //stores the current active tag

    const tags = [
        'All',
        'Career & Learning',
        'Project Building',
        'Roadmap',
        'Resume',
        'Web development',
        'AI & Data',
        'Remote Jobs',
        'Portfilio',
        'Job Search',
        'Cloud & Devops',
        'others'
    ]



    // ---------- Fetch posts whenever selectedTag changes ----------
    useEffect(() => {
        async function fetchposts() {
            setloading(true)

            try {
                let res
                if (selectedTag == 'All') {

                    // fetch all posts
                    res = await postService.getposts()
                }
                else {
                    // fetch posts by single tag
                    res = await postService.gettagsposts(selectedTag)
                }

                if (res && res.rows) {
                    setPosts(res.rows)
                }
                else {
                    setPosts([]);
                }
            }
            finally {
                setloading(false)
            }

        }
        fetchposts();
    }, [selectedTag]);

    return (
        <>

            <Container maxWidth="md" sx={{ mt: 10 }}>

                {/* Tag buttons */}
                <TagsButtons
                    tags={tags}
                    selectedTag={selectedTag}
                    onTagChange={setselectedTag}
                />

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
