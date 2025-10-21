import { Box, Stack, styled } from '@mui/material';

export const Cart = styled(Stack)(({ theme }) => ({
	width: '100%',
	height: '100%',
	marginBottom: '16px',
	border: `1px solid ${theme?.palette?.infuuse?.gray400}`,
	padding: '8px 16px',
	borderRadius: '8px',
	cursor: 'pointer',
}));

export const CartBody = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
	marginRight: '32px',
	padding: '4px',
	borderRadius: '8px',
}));
