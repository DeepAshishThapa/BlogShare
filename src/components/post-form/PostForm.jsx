import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RTE } from "../RTE";
import postService from "../../Appwrite/posts/api";
import { Box, TextField, InputLabel, MenuItem, FormControl, Select, Button } from "@mui/material";
import { Controller } from "react-hook-form";



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
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexWrap: "wrap",
            }}
        >
            <Box sx={{ width: "66.66%", px: 2 }}>
                <TextField
                    id="outlined-basic"
                    label="Title"
                    fullWidth
                    sx={{ mb: 2 }}
                    {...register("title", {
                        required: "Title is required",

                    })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    onInput={(e) => {
                        const Slugvalue = slugTransform(e.currentTarget.value)
                        setValue("slug", Slugvalue, { shouldValidate: true })
                    }}



                />
                <TextField
                    id="outlined-basic"
                    label="slug"
                    fullWidth
                    sx={{ mb: 2 }}
                    {...register("slug", {
                        required: "slug is required",

                    })}
                    error={!!errors.slug}
                    helperText={errors.slug?.message}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })

                    }}

                />
                <RTE control={control} name="content" defaultValues={getValue("content")} label="content" />

            </Box>

            <Box sx={{ width: "33.33%", px: 2 }} >
                <TextField
                    id="outlined-basic"
                    type="file"
                    label="Enter Image"
                    sx={{ mb: 4 }}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {
                        required: !post ? "Image is required" : false
                    })}
                />
                {post && (
                    <Box
                        component="img"
                        src={postService.getfilepreview(post.featuredImage)}
                        sx={{
                            width: "100%",
                            mb: 4
                        }}>
                    </Box>

                )
                }
                <Controller
                    name="status"
                    control={control}
                    defaultValue="active"
                    rules={{ required: "Status is required" }}
                    render={({ field }) => (
                        <FormControl fullWidth>
                            <InputLabel id="active-input">Status</InputLabel>
                            <Select
                                {...field}
                                labelId="active-input"
                                id="active"
                                label="Status"
                            >
                                <MenuItem value="active">active</MenuItem>
                                <MenuItem value="inactive">inactive</MenuItem>

                            </Select>
                        </FormControl>

                    )}
                />
                <Button type="submit"
                    variant={post ? "contained" : "outlined"}
                    disabled={isSubmitting}
                    sx={{
                        bgcolor: post ? "primary.main" : "green",
                        color: "white",
                        "&:hover": {
                            bgcolor: post ? "primary.dark" : "darkgreen",
                        },
                    }}

                >
                     {isSubmitting ? "Processing..." : post ? "Update" : "Submit"}

                </Button>




            </Box>





        </Box>




    )
}
