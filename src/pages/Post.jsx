import React, { useEffect, useState } from 'react'
import postService from '@/Appwrite/post/api'
import { Link, useNavigate, useParams } from 'react-router'
import parse from "html-react-parser"
import { useSelector } from 'react-redux'
import {
    Container,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";


function Post() {
    // ---------- Routing & Auth ----------
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)


    // ---------- Local State ----------
    const [post, setpost] = useState(null)       // fetched post object
    const [imgUrl, setImgUrl] = useState(null)     // preview URL for featured image
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);    // delete confirm dialog


    // Only the author should see Edit/Delete
    const isAuthor = post && userData ? post.userid === userData.$id : false;


    // ---------- Effects: Fetch post by slug ----------
    useEffect(() => {
        if (slug) {
            postService.getpost(slug).then((post) => {
                if (post) {
                    setpost(post)
                    console.log(post)
                    console.log(userData)
                }
                else {
                    navigate("/")
                }
            })
        }
    }, [slug, navigate])


    // ---------- Effects: Resolve image preview URL ----------
    useEffect(() => {
        if (!post?.featuredImage) return
        let cancelled = false
            ; (async () => {
                const url = await postService.getfilepreview(post.featuredImage)
                if (!cancelled) setImgUrl(url)
            })()
        return () => { cancelled = true }
    }, [post?.featuredImage])



    // Delete the post (and its file), then navigate away
    const deletepost = () => {
        setOpenDeleteDialog(false);
        postService.deletepost(slug).then((status) => {
            if (status) {
                postService.deletefile(post.featuredImage)
                navigate("/all-posts")
            }
        })

    }

    // Open / Close confirmation dialog
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

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
                    {/* Edit/Delete actions (only visible to author) */}
                    {isAuthor &&
                        <Box
                            sx={{
                                position: 'absolute',
                                right: '2.8%',
                                top: 0,
                                zIndex: 2,
                                display: 'flex',
                                gap: 1.5
                            }}
                        >
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button sx={{ backgroundColor: '#1d0a3d', color: 'white' }}>
                                    Edit
                                </Button>
                            </Link>

                            <Button variant="contained" color="error" onClick={handleOpenDeleteDialog}>
                                Delete
                            </Button>
                        </Box>
                    }

                     {/* Featured image */}
                    <Box
                        component="img"
                        src={imgUrl}
                        alt={post.title}
                    />


                     {/* Title + Content */}
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

            
            {/* ===== Delete Confirmation Dialog ===== */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    {"Are you sure you want to delete this post?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        This action cannot be undone. The post and its image will be
                        permanently deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={deletepost}
                        color="error"
                        variant="contained"
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    ) : null
}

export default Post
