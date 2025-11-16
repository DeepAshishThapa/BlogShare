import React from 'react'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { Controller } from 'react-hook-form';

function TagsSelect({ name, control }) {
    const theme = useTheme();

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
        'others'
        
    ];

    function getStyles(name, selected, theme) {
        return {
            fontWeight: selected.includes(name)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
        };
    }

    return (
        <Controller
            name={name || 'tags'}
            control={control}
            rules={{ required: 'Tags is required' }}
            render={({ field, fieldState: { error } }) => {
                const selected = field.value || [];  // always array

                return (
                    <FormControl sx={{ m: 1, width: 300 }} error={!!error}>
                        <InputLabel id="tags-label">Tags</InputLabel>
                        <Select
                            labelId="tags-label"
                            id="tags"
                            multiple
                            input={<OutlinedInput label="Tags" />}
                            MenuProps={MenuProps}
                            value={selected}
                            onChange={(event) => {
                                const {
                                    target: { value },
                                } = event;
                                const newValue = typeof value === 'string'
                                    ? value.split(',')
                                    : value;

                                // 🔥 Update RHF value
                                field.onChange(newValue);
                            }}
                        >
                            {names.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, selected, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                        {error && <FormHelperText>{error.message}</FormHelperText>}
                    </FormControl>
                );
            }}
        />
    );
}

export default TagsSelect;