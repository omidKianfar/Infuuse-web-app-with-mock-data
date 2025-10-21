import { Box, Stack, styled, useTheme } from '@mui/material';
export const CustomSidebarLayout = styled(Stack)({
	width: '100%',
	height: '100%',
	maxWidth: '100px',
	minWidth: '100px',
	padding: ' 8px',
});

export const Sidebar = styled(Stack)(({ theme }) => ({
	width: '100%',
	height: '100%',
	maxWidth: '90px',
	borderRadius: '16px',
	background: theme?.palette?.infuuse.gray200,
	padding: '16px 2px',
}));

export const UserActive = styled(Box)({
	width: '12px',
	height: '12px',
	borderRadius: '16px',
	position: 'absolute',
	bottom: '-16px',
	left: '36%',
});

export const IconBox = styled(Box)(({ theme }) => ({
	width: '42px',
	height: '42px',
	borderRadius: '16px',
	background: theme?.palette?.common.white,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginBottom: '16px',
	cursor: 'pointer',
}));

export const IconBoxBadge = styled(Box)(({ theme }) => ({
	width: '20px',
	height: '20px',
	borderRadius: '360px',
	background: theme?.palette?.infuuse.red300,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'absolute',
	right: '-8px',
	top: '-8px',
}));

export const IconBoxActive = styled(Box)(({ theme }) => ({
	width: '4px',
	height: '32px',
	borderRadius: '50px',
	background: theme?.palette?.infuuse.blue200,
	position: 'absolute',
	left: '-16px',
	top: '4px',
}));
