import { Stack, TextField, styled } from '@mui/material';

export const ChatPage = styled(Stack)(({ theme }) => ({
	width: '100%',
	height: '100%',
	position: 'relative',
	maxHeight: '100vh',
}));

export const ChatContainer = styled(Stack)(({ theme }) => ({
	width: '100%',
	backgroundColor: theme?.palette?.infuuse?.gray400,
	borderRadius: '8px',
	marginBottom: '8px',
	justifyContent: 'start',
	alignItems: 'center',
	padding: '0 8px',
}));

export const MenuContainer = styled(Stack)(({ theme }) => ({
	position: 'absolute',
	left: '-2px',
	bottom: '32px',
	height: '160px',
	width: '36px',
	zIndex: 10,
	borderRadius: '16px',
	border: `2px solid ${theme?.palette?.infuuse?.gray500}`,
	backgroundColor: theme?.palette?.infuuse?.gray100,
	padding: '8px 0',
}));

export const IconBox = styled(Stack)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
}));

export const CustomTextFieldMessage = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.infuuse?.gray400,
		borderRadius: '8px',
		height: '60px',
		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse?.gray400,
			height: '25px',
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse?.gray400,
			height: '25px',
		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.infuuse?.gray400,
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
