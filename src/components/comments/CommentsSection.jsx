import { useEffect, useState } from "react"
import commentsService from "@/Appwrite/CommentsService/api"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"



function CommentsSection({ postid }) {
    const userData = useSelector((state) => state.auth.userData)

    const [comments, setcomments] = useState([])
    const [loading, setloading] = useState(true)


    // react-hook-form for new comment
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
        defaultValues: {
            content: "",
        }
    })



    // Load comments when postId changes
    useEffect(() => {
        const fetchcomments = async () => {

            setloading(true)
            const results = await commentsService.getCommentByPost(postid)
            if (results) {
                setcomments(results)
            } else {
                alert("failed to load comments")

            }
            setloading(false)
        }
        fetchcomments();
    }, [postid])



     // Submit new comment (react-hook-form handler)
    const onSubmit = async (data) => {
        if (!userData) {
            alert("login to comment")
            return;
        }
        const content = data.content.trim()

        if (!content){
            return;
        }

        const result = await commentsService.createComment({ postid, userid: userData.$id, username: userData.name, content })

        if (result) {
            setcomments((prev) => [result, ...prev])    // update UI
            reset();     // clear input

        }
        else {
            alert("failed to post comment")
        }
    }
     

     // Delete comment
    const handleDelete=async(commentid)=>{
        result=await commentsService.deleteComment(commentid)
        if (result){
            setcomments((prev)=>prev.filter((c)=>c.$id !== commentid))

        }else{
            alert("failed to delete comments")
        }


    }


    return (
        <>




        </>

    )
}

export default CommentsSection
