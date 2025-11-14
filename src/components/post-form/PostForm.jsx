import { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import RTE from "../RTE";   // custom rich text editor component
import postService from "../../Appwrite/post/api";    // Appwrite service for CRUD operations
import { Box, TextField, InputLabel, MenuItem, FormControl, Select, Button } from "@mui/material";

import TagsSelect from "./TagsSelect";



export default function PostForm({ post }) {


    // Initialize react-hook-form with default values (used for both create and edit)
    const { control, register, handleSubmit, setValue, getValues, formState: { errors, isSubmitting }, watch } = useForm(
        {
            defaultValues: {
                title: post?.title || "",
                slug: post?.$id || "",
                content: post?.content || "",
                status: post?.status || "active"
            }
        }
    )


    const slug = watch("slug")                                   // Watch for slug changes in real-time
    const navigate = useNavigate();                              // Used for navigation after submit or cancel
    const userData = useSelector((state) => state.auth.userData) // Get logged-in user data from Redux
    const [imgUrl, setImgUrl] = useState("");                    // For previewing uploaded image


    // Load preview image when editing an existing post
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (post?.featuredImage) {
                    const url = await postService.getfilepreview(post.featuredImage);
                    if (alive) setImgUrl(url || "");
                } else {
                    if (alive) setImgUrl("");
                }
            } catch (e) {
                console.error("preview error:", e);
                if (alive) setImgUrl("");
            }
        })();
        return () => {
            alive = false;        // cleanup when component unmounts
        };
    }, [post?.featuredImage]);


    // Handle form submission (create or update)
    const onSubmit = useCallback(async (data) => {
        try {
            if (post) {
                // --- Editing an existing post ---
                const file = data.image?.[0] ? await postService.uploadfile(data.image[0]) : null;


                // Delete old image if a new one is uploaded
                if (file) {
                    postService.deletefile(post.featuredImage)
                }


                // Update the existing post in database
                const dbPost = await postService.UpdatePost({
                    ...data,
                    slug: post.$id,
                    featuredImage: file ? file.$id : post?.featuredImage,
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)       // Redirect to updated post
                }
            }
            else {
                // --- Creating a new post --
                const file = await postService.uploadfile(data.image[0])
                if (file) {
                    const fileId = file.$id
                    data.featuredImage = fileId
                    const dbPost = await postService.CreatePost({
                        ...data,
                        userId: userData.$id

                    })
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`)    // Redirect to created post
                    }
                }

            }
        }
        catch (error) {
            console.log(error)
        }
    }, [])


    // Function to automatically generate slug from title
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")       // replace special chars with "-"
                .replace(/\s/g, "-");                   // replace spaces with "-"

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
            <Box sx={{ flexGrow: 2, flexBasis: '500px', px: 2 }}>
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
                    onChange={(e) => {
                        const Slugvalue = slugTransform(e.currentTarget.value)
                        setValue("slug", Slugvalue, { shouldValidate: true })
                    }}



                />
                <TextField
                    id="outlined-basic2"
                    label="slug"
                    fullWidth
                    sx={{ mb: 2 }}
                    {...register("slug")}
                    value={slug || ""}


                    onChange={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })

                    }}

                />
                <RTE control={control} name="content" label="content:" />

            </Box>

            <Box sx={{ flexGrow: 1, flexBasis: '250px', px: 2 }} >
                <TextField
                    id="outlined-basic"
                    type="file"
                    sx={{ mb: 4 }}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {
                        required: !post ? "Image is required" : false,
                        onChange: (e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setImgUrl("");
                            } else {
                                if (post?.featuredImage) setImgUrl(imgUrl);
                            }
                        },
                    })}

                    error={!!errors.image}
                    helperText={errors.image?.message}
                />
                {post && imgUrl && (
                    <Box
                        component="img"
                        src={imgUrl}
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

                    rules={{ required: "Status is required" }}
                    render={({ field }) => (
                        <FormControl fullWidth>
                            <InputLabel id="active-input">Status</InputLabel>
                            <Select
                                {...field}
                                labelId="active-input"
                                id="active"
                                label="Status"
                                sx={{mb:2}}
                            >
                                <MenuItem value="active">active</MenuItem>
                                <MenuItem value="inactive">inactive</MenuItem>

                            </Select>
                        </FormControl>

                    )}
                />

                <TagsSelect name="tags" control={control}/>

                
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mt: 2

                    }}
                >
                    <Button type="submit"

                        disabled={isSubmitting}
                        sx={{
                            bgcolor: isSubmitting ? "grey" : "#1d0a3d",   //  change color while submitting
                            color: isSubmitting ? "black" : "white",
                            "&:hover": {
                                bgcolor: "black",

                            },



                        }}

                    >
                        {isSubmitting ? "Processing..." : post ? "Update" : "Submit"}

                    </Button>
                    <Button variant="contained" color="error"
                        onClick={() => {
                            post ? navigate(`/post/${post.$id}`) : navigate("/all-posts")
                        }}
                    >
                        Cancel
                    </Button>
                </Box>




            </Box>





        </Box>




    )
}
