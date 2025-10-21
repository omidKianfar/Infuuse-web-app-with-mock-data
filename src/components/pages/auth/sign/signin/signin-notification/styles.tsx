import { Stack, styled } from '@mui/material';

export const Cart = styled(Stack)(({ theme }) => ({
	justifyContent: 'center',
	alignItems: 'center',
	width: '100vw',
	height: '100vh',
	padding: '50px 0',
}));

export const CartHeader = styled(Stack)(({ theme }) => ({
	width: '90vw',
	height: '100%',
	maxWidth: '1200px',
	backgroundColor: theme?.palette?.infuuse?.gray300,
	padding: '24px',
	borderRadius: '16px',
}));

export const CartBody = styled(Stack)(({ theme }) => ({
	backgroundColor: theme?.palette?.infuuse?.gray400,
	borderRadius: '16px',
	border: `2px solid ${theme?.palette?.infuuse?.blueLight200}`,
	width: '100%',
	overflow: 'auto',
	height: '100%',
	maxHeight: '500px',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
}));

export const CartBodyDate = styled(Stack)(({ theme }) => ({
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '16px',
}));

export const No_Notification = styled(Stack)(({ theme }) => ({
	justifyContent: 'center',
	alignItems: 'center',
	padding: '24px',
	fontSize: '20px',
	fontWeight: 'bold',
	width: '100%',
	height: '100%',
}));
