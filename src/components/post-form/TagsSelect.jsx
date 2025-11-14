import React from 'react'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

function TagsSelect({ name, control }) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    // Available tags
    const names = [
        'Career & Learning',
        'Project Building',
        'Roadmap',
        'Resume',
        'Web development',
        'AI & Data',
        'Remote Jobs',
        'Portfilio',
        'Job Search',
        'Cloud & Devops',
    ];

    function getStyles(name, personName, theme) {
        return {
            fontWeight: personName.includes(name)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
        };
    }

    // Handles selecting/unselecting tags
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            <Controller
                name={name || "tags"}
                control={control}
                rules={{ required: "Tags is required" }}

                render={({ field }) => (
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
                        <Select
                            {...field}
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tags" />}
                            MenuProps={MenuProps}

                        >
                            {names.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personName, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                )}





            />


        </>
    )
}

export default TagsSelect
