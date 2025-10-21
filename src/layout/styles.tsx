import { Stack, TextField, styled, useTheme } from '@mui/material';

export const CustomLayout = styled(Stack)(({ theme }) => ({
	width: '100vw',
	height: '100vh',
	backgroundColor: theme?.palette?.infuuse.gray100,
	maxHeight: '100vh',
	overflow: 'auto',
}));

export const Main = styled(Stack)({
	width: '100%',
	height: '100%',
	paddingBottom: '8px',
	maxHeight: '100vh',
});

export const CustomBaseLayoutChildren = styled(Stack)<{ setting: boolean }>(({ theme, setting }) => ({
	width: '100%',
	height: '100%',
	borderRadius: '16px',
	background: theme?.palette?.infuuse.gray200,
	maxHeight: '87.5vh',
	overflowY: 'auto',
	marginLeft: '8px',
	maxWidth: setting ? 'calc(100vw - 440px)' : 'calc(100vw - 125px)',
}));

export const CustomChatLayoutChildren = styled(Stack)(({ theme }) => ({
	width: '100%',
	height: '100%',
	borderRadius: '16px',
	background: theme?.palette?.infuuse.gray200,
	marginLeft: '8px',
	maxWidth: 'calc(100vw - 440px)',
	maxHeight: '100vh',
	overflowY: 'auto',
	// '&::-webkit-scrollbar': {
	// 	display: 'none',
	// },
	// scrollbarWidth: 'none',
	// scrollbarColor: 'transparent transparent',
}));
export const CustomMainLayoutChildren = styled(Stack)(({ theme }) => ({
	width: '100%',
	height: '100%',
	borderRadius: '16px',
	background: theme?.palette?.infuuse.gray200,
	marginLeft: '8px',
	maxWidth: 'calc(100vw - 440px)',
	maxHeight: '100vh',
	overflowY: 'auto',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
}));

export const ChatPage = styled(Stack)(({ theme }) => ({
	width: '100%',
	height: '100%',
	borderRadius: '16px',
	background: theme?.palette?.infuuse.gray200,
}));
