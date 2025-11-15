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
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    {tags.map((tag) => (
                        <Button
                            key={tag}
                            variant={tag == selectedTag ? 'contained' : 'outlined'}   //filled when active
                            onClick={()=>onTagChange(tag)}

                        >
                            {tag}
                        </Button>

                    ))}
                </ButtonGroup>
            </Box>


        </>
    )
}
