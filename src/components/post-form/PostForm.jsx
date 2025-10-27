import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import  RTE  from "../RTE";
import postService from "../../Appwrite/post/api";
import { Box, TextField, InputLabel, MenuItem, FormControl, Select, Button } from "@mui/material";
import { Controller } from "react-hook-form";



export default function PostForm({ post }) {

    const { control, register, handleSubmit, setValue,getValues, formState: { errors, isSubmitting },watch } = useForm(
        {
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || "active"
            }
        }
    )
    const slug = watch("slug")

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)

    const onSubmit = useCallback(async (data) => {

        try {
            if (post) {
                const file = data.image[0] ? await postService.uploadfile(data.image[0]) : null;

                if (file) {
                    postService.deletefile(post.featuredImage)

                }
                const dbPost = await postService.UpdatePost({
                    ...data,
                    slug: post.$id,
                    featuredImage: file ? file.$id : undefined,
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
            else {
                const file = await postService.uploadfile(data.image[0])

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
            <Box sx={{ flexGrow: 2,flexBasis: '500px', px: 2 }}>
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
                    id="outlined-basic"
                    label="slug"
                    fullWidth
                    sx={{ mb: 2 }}
                    {...register("slug")}
                     value={slug || ""}  
                    
                
                    onChange={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })

                    }}

                />
                <RTE control={control} name="content" defaultValues={getValues("content")} label="content" />

            </Box>

            <Box sx={{ flexGrow: 1,flexBasis: '250px', px: 2 }} >
                <TextField
                    id="outlined-basic"
                    type="file"
                    sx={{ mb: 4 }}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {
                        required: !post ? "Image is required" : false
                    })}
                    error={!!errors.image}
                    helperText={errors.image?.message}
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
                    
                    disabled={isSubmitting}
                    sx={{
                        bgcolor: post ? "primary.main" : "green",
                        color: "white",
                        "&:hover": {
                            bgcolor: post ? "primary.dark" : "darkgreen",
                        },
                        mt:2
                    }}

                >
                     {isSubmitting ? "Processing..." : post ? "Update" : "Submit"}

                </Button>




            </Box>





        </Box>




    )
}
