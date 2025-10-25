import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RTE } from "../RTE";
import postService from "../../Appwrite/posts/api";
import { TextField } from "@mui/material";


export default function PostForm({ post }) {

    const { control, register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm(
        {
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || "active"
            }
        }
    )

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)

    const onSubmit = useCallback(async (data) => {

        try {
            if (post) {
                const file = data.image[0] ? await postService.uploadFile(data.image[0]) : null;

                if (file) {
                    postService.deleteFile(post.featuredImage)

                }
                const dbPost = await postService.updatePost({
                    ...data,
                    slug: post.$id,
                    featuredImage: file ? file.$id : undefined,
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
            else {
                const file = await postService.uploadFile(data.image[0])

                if (file) {
                    const fileId = file.$id
                    data.featuredImage = fileId
                    const dbPost = await postService.createFile({
                        ...data,
                        userId: userData.$id

                    })
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`)
                    }
                }

            }








        }



        catch (error) {
            console.log(error)

        }

    }, [])

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField id="outlined-basic" label="title" variant="outlined"
            {...register("title",{required:"title is required"})}
            />


        </form>


    )
}
