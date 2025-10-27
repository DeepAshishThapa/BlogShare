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
                        display: "inline-block",
                        mb: 1,
                        pl: 1


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
                            plugins: [
                                // Core editing features
                                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                // Your account includes a free trial of TinyMCE premium features
                                // Try the most popular premium features until Nov 10, 2025:
                                'checklist', 'casechange', 'formatpainter', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                            ],
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            mergetags_list: [
                                { value: 'First.Name', title: 'First Name' },
                                { value: 'Email', title: 'Email' },
                            ],
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                            uploadcare_public_key: '78450930a6481309eaa3',
                        }}
                        initialValue="Anything in your mind?"
                    />
                )}
            />
        </>
    )
}

