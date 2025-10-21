import { Stack, styled, useTheme } from '@mui/material';

export const CustomSidebarLayout = styled(Stack)({
	width: '316px',
	height: '100%',
	padding: '8px',
});

export const Sidebar = styled(Stack)(({ theme }) => ({
	width: '100%',
	minWidth: '300px',
	height: '100%',
	borderRadius: '16px',
	background: theme?.palette?.infuuse.gray200,
	padding: '16px',
}));
