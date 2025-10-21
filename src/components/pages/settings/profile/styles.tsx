import { Box, Stack, styled } from '@mui/material';

export const ProfileContainer = styled(Stack)(({ theme }) => ({
	width: '100%',
	height: '70vh',
	overflow: 'auto',
	backgroundColor: theme?.palette?.common?.white,
	borderRadius: '16px',
	padding: '16px',
	position: 'relative',
}));

export const EditAvatarContainer = styled(Box)(({ theme }) => ({
	width: '32px',
	height: '32px',
	borderRadius: '8px',
	backgroundColor: theme?.palette?.infuuse?.orange100,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'absolute',
	right: 0,
	top: '70%',
	zIndex: 2,
	cursor: 'pointer',
}));

export const ButtonContainer = styled(Stack)(({ theme }) => ({
	width: '32px',
	height: '32px',
	borderRadius: '16px',
	backgroundColor: theme?.palette?.infuuse?.orange100,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'absolute',
	right: 0,
	top: '70%',
	zIndex: 2,
	cursor: 'pointer',
}));
