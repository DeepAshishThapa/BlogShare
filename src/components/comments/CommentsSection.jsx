import { useEffect, useState } from "react"
import commentsService, { CommentsService } from "@/Appwrite/CommentsService/api"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"



function CommentsSection({ postid }) {
    const userData = useSelector((state) => state.auth.userData)

    const [comments, setcomments] = useState([])
    const [loading, setloading] = useState(true)

    const [editingId, seteditingId] = useState(null)
    const [editingValue, seteditingValue] = useState(null)
    const [updating, setupdating] = useState(false)


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

        if (!content) {
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
    const handleDelete = async (commentid) => {
        result = await commentsService.deleteComment(commentid)
        if (result) {
            setcomments((prev) => prev.filter((c) => c.$id !== commentid))

        } else {
            alert("failed to delete comments")
        }
    }

    //start ediding the comment
    const startEdit = (comment) => {
        seteditingId(comment.$id)
        seteditingValue(comment.content)

    }

    //cancel editng
    const closeEdit = () => {
        seteditingId(null)
        seteditingValue(null)
    }

    //handle update of the comments
    const handleEdit = async (commentid) => {
        const trimmed = editingValue.trim();
        if (!trimmed) return;

        setupdating(true);

        const result = await commentsService.updateComment(commentid, trimmed)

        if (result) {
            setcomments((prev) =>
                prev.map((c) => (
                    c.$id == commentid ? { ...c, content: trimmed } : c

                ))
            )
            seteditingId(null);
            seteditingValue("");
        }
        else {
            alert("Failed to update comment.");
        }
        setupdating(false);


    }





    return (
        <>




        </>

    )
}

export default CommentsSection
