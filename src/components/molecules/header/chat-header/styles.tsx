import { Box, Stack, TextField, styled } from '@mui/material';

export const DrawerLayout = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'end',
	alignItems: 'center',
	width: '35px',
	backgroundColor: theme?.palette?.infuuse?.gray100,
	cursor: 'pointer',
	padding: '4px 0',
	borderRadius: '50px 0 0 50px',
}));

export const IconContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
	marginRight: '24px',
	cursor: 'pointer',
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.infuuse?.gray200,
		borderRadius: '16px',
		height: '25px',
		width: '220px',
		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,

			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse?.gray200,
			height: '25px',

			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse?.gray200,
			height: '25px',

			// borderRadius: "16px",
		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.infuuse?.gray200,
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
