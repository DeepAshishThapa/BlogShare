import React from 'react'
import { useState,useEffect } from 'react';
import postService from '../../Appwrite/post/api.js'
import MediaCard from '../card/Card.jsx';


function AllpostsSection() {
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
            {posts && posts.length > 0 ? (
                posts.map((post) => (
                    <MediaCard key={post.$id} post={post} />
                ))

            ) : (
                <div>NO POSTS FOUND</div>

            )}


        </>
    )
}

export default AllpostsSection
