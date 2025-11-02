import React from 'react'
import { useEffect, useState } from 'react'
import postService from '@/Appwrite/post/api'
import { Link, useNavigate, useParams } from 'react-router'
import parse from "html-react-parser"
import { useSelector } from 'react-redux'
import { Container, Box } from '@mui/material'





function Post() {
    const { slug } = useParams()
    const [post, setpost] = useState(null)
    const navigate = useNavigate()
    const [imgUrl, setImgUrl] = useState('')    

    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            postService.getpost(slug).then((post) => {
                if (post) {
                    setpost(post)

                }
                else {
                    navigate("/")
                }



            })
        }

    }, [slug, navigate])

    useEffect(() => {
        if (!post?.featuredImage) return
        let cancelled = false
            ; (async () => {
                const url = await postService.getfilepreview(post.featuredImage)
                if (!cancelled) setImgUrl(url)
            })()
        return () => { cancelled = true }
    }, [post?.featuredImage])



    const deletepost = () => {
        postService.deletepost(slug).then((status) => {
            if (status) {
                postService.deletefile(post.featuredImage)
                navigate("/")
            }
        })

    }








    return post ? (
        <>
            <Container maxWidth="md">
                <Box
                    component="img"
                    src={imgUrl}
                    alt={post.title}
                >



                </Box>
                <Box>
                    <Box>
                        {post.title}
                    </Box>
                    <Box>
                       { parse(post.content)}
                    </Box>
                </Box>

            </Container>


        </>
    ) : null
}

export default Post
