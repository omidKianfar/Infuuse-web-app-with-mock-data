import { Box, styled, TextField } from '@mui/material';
import { Editable } from 'slate-react';

export const CustomButton = styled(Box)(({ theme, active }) => ({
	cursor: 'pointer',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	color: active ? theme?.palette?.infuuse?.blue500 : theme?.palette?.infuuse?.blueDark600,
	marginRight: '8px',
}));

export const CustomEditable = styled(Editable)(({ theme }) => ({
	background: theme?.palette?.infuuse?.gray200,
	color: '#000',
	border: `1px solid ${theme?.palette?.infuuse?.blue100}`,
	borderTop: 'none',
	outline: `none`,
	height: '100%',
	minHeight:'100px',
	maxHeight: '150px',
	overflowY: 'auto',
	padding: '8px 32px',
	borderRadius: '0 0 8px 8px',
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '8px',
		height: '32px',
		marginRight: '8px',
		'& .MuiInputBase-input': {
			color: theme?.palette?.infuuse.blueLight400,
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
		},
	},
}));
