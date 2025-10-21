import { Stack, TextField, styled } from '@mui/material';

export const MenuContainer = styled(Stack)(({ theme }) => ({
	position: 'absolute',
	left: '-2px',
	bottom: '50px',
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
