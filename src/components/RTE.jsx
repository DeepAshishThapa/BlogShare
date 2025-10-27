import { Box } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ control, name, defaultValue = "", label }) {
    return (
        <>
            {label &&
                <Box
                    component="label"
                    sx={{
                        display:"inline-block",
                        mb:1,
                        pl:1


                    }}

                >
                    {label}
                </Box>

            }
            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (

                    <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        value={value}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount"
                            ],
                            toolbar:
                                "undo redo | formatselect | " +
                                "bold italic backcolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </>
    )
}

