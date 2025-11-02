import React from 'react'
import PostForm from '@/components/post-form/PostForm'
import { Box } from '@mui/material'
import { useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router'
import postService from '@/Appwrite/post/api'




function Editpost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            postService.getpost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }


    }, [slug, navigate])

    return post ? (
        <>
            <Box
                sx={{

                    color: 'white',
                    py: { xs: 5, sm: 5 },

                }}
            >
                <PostForm post={post}/>
            </Box>



        </>
    ):null
}

export default Editpost
