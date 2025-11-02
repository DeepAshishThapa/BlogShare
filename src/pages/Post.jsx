import React from 'react'
import { useEffect, useState } from 'react'
import postService from '@/Appwrite/post/api'
import { Link, useNavigate, useParams } from 'react-router'
import parse from "html-react-parser"
import { useSelector } from 'react-redux'




function Post() {
    const { slug } = useParams()
    const [post, setpost] = useState(null)
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    



    return (
        <>

        </>
    )
}

export default Post
