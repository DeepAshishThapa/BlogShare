import { Box } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ control, name, defaultValue = [defaultValue], label }) {
    return (
        <>
            {label &&
                <Box

                    sx={{
                        display: "inline-block",
                        mb: 1,
                        pl: 1,
                        color: "gray"


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
                        apiKey='7fftz4fxet391uev8nhcagzn9ahsta2yzdx3njpkl6zd3e37'
                        value={value}
                        onEditorChange={onChange}
                        init={{

                            height: 400,
                            menubar: "file edit view insert format tools table help",
                            plugins: [
                                "anchor",
                                "autolink",
                                "charmap",
                                "codesample",
                                "emoticons",
                                "link",
                                "lists",
                                "searchreplace",
                                "table",
                                "visualblocks",
                                "wordcount",
                                "code",
                                "image",
                                "media",
                                "autoresize",
                            ],
                            toolbar:
                                "undo redo | blocks fontfamily fontsize | " +
                                "bold italic underline strikethrough | " +
                                "link image media table | " +
                                "bullist numlist | alignleft aligncenter alignright | " +
                                "outdent indent | codesample code | removeformat",
                            // branding: false,
                            
                            statusbar: true,
                            content_style:
                                "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size:14px; }",
                        }}


                    />
                )}
            />
        </>
    )
}

