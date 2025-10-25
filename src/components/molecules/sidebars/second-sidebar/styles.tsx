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

export const SidebarContainer = styled(Stack)({
	width: '100%',
	height: '100%',
	maxHeight: '80vh',
	overflowY: 'auto',
	paddingTop: '16px',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
});


export const AdminInternalChatSidebarContainer = styled(Stack)({
	width: '100%',
	height: '100%',
	maxHeight: '68vh',
	overflowY: 'auto',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
});

export const CallSidebarContainer = styled(Stack)({
	width: '100%',
	maxHeight: '100vh',
	padding: '16px',
	overflow: 'auto',
	position: 'absolute',
	top: 0,
	left: 0,
	zIndex: 10000,
});

export const AllChannelContainer = styled(Stack)({
	width: '100%',
	height: '100%',
	maxHeight: '70vh',
	overflowY: 'auto',
	paddingTop: '16px',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
});