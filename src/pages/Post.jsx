import React from 'react'
import { useEffect, useState } from 'react'
import postService from '@/Appwrite/post/api'
import { Link, useNavigate, useParams } from 'react-router'
import parse from "html-react-parser"
import { useSelector } from 'react-redux'
import { Container, Box } from '@mui/material'
import { Button } from '@mui/material'




function Post() {
    const { slug } = useParams()
    const [post, setpost] = useState(null)
    const navigate = useNavigate()
    const [imgUrl, setImgUrl] = useState(null)

    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userid === userData.$id : false;

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


            <Box
                sx={{

                    color: 'white',
                    py: { xs: 5, sm: 5 },

                }}
            >
                <Container maxWidth="md"
                    sx={{
                        py: 5,
                        display: "flex",
                        flexDirection: 'column',
                        gap: 10,
                        position: 'relative'

                    }}
                >
                    {isAuthor &&
                        <Box
                            sx={{
                                position: 'absolute',
                                right: '2.8%',
                                top: 0,
                                zIndex: 2,
                            }}
                        >
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button sx={{ backgroundColor: '#1d0a3d', color:'white'}}>
                                    Edit

                                </Button>
                            </Link>


                        </Box>
                    }
                    <Box
                        component="img"
                        src={imgUrl}
                        alt={post.title}
                    >



                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            color: 'text.primary'
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: '2.5rem',
                                fontWeight: 1000,
                                
                            }}
                        >
                            {post.title}
                        </Box>
                        <Box>
                            {parse(post.content)}
                        </Box>
                    </Box>

                </Container>

            </Box>
        </>
    ) : null
}

export default Post
