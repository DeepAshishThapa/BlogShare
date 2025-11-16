import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';



export default function TagsButtons({ tags, selectedTag, onTagChange }) {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "center",
                    flexWrap:"wrap",
                    '& > *': {
                        m: 1,
                    },
                }}
            >
                
                    {tags.map((tag) => (
                        <Button
                            key={tag}
                            variant={tag == selectedTag ? 'contained' : 'outlined'}   //filled when active
                            onClick={()=>onTagChange(tag)}

                        >
                            {tag}
                        </Button>

                    ))}
                
            </Box>


        </>
    )
}
