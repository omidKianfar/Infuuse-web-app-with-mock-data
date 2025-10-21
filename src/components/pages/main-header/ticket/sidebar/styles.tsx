import { TextField } from "@/components/atoms/Form";
import { styled, Typography } from "@mui/material";

export const Label = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme?.palette?.infuuse.blueLight500,
    marginBottom: '4px',
}));

export const CustomDescription = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme?.palette?.common?.white,
        borderRadius: '16px',
        height: '100px',

        '& .MuiInputBase-input': {
            color: theme?.palette?.infuuse.blueLight400,
            // borderRadius: "16px",
        },
        '& fieldset': {
            borderColor: theme?.palette?.infuuse.blue100,
            // borderRadius: "16px",
        },
        '&.Mui-focused fieldset': {
            borderColor: theme?.palette?.infuuse.blue100,
            // borderRadius: "16px",
        },
    },
}));


export const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme?.palette?.common?.white,
        borderRadius: '16px',

        '& .MuiInputBase-input': {
            color: theme?.palette?.common?.black,

            // borderRadius: "16px",
        },
        '& fieldset': {
            borderColor: theme?.palette?.common?.white,

            // borderRadius: "16px",
        },
        '&.Mui-focused fieldset': {
            borderColor: theme?.palette?.common?.white,

            // borderRadius: "16px",
        },
        '&:hover fieldset': {
            borderColor: theme?.palette?.common?.white,
        },
    },
    '& label.Mui-focused': {
        color: theme?.palette?.common?.black,
        fontSize: '14px',
    },
    '&.MuiFormLabel-root .Mui-disabled': {
        color: theme?.palette?.common?.black,
        fontSize: '14px',
    },
    '& label.Mui-root': {
        color: theme?.palette?.common?.black,
        fontSize: '14px',
    },
}));