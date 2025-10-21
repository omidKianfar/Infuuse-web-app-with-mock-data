import { Stack, TextField, styled } from '@mui/material';

export const ChatContainer = styled(Stack)(({ theme }) => ({
	width: '100%',
	backgroundColor: theme?.palette?.infuuse?.gray400,
	borderRadius: '8px',
	marginBottom: '8px',
	justifyContent: 'start',
	alignItems: 'center',
	padding: '0 8px',
}));

export const IconBox = styled(Stack)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
}));
