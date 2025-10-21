import { Box, Stack, Typography, styled } from '@mui/material';

export const ContainerAuth = styled(Stack)(({ theme }) => ({
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
	minHeight: '100vh',
	maxHeight: '100vh',
	overflow: 'auto',
	width: '100%',
	backgroundColor: theme?.palette?.infuuse.blueDark200,
}));

export const CenterSection = styled(Stack)({
	justifyContent: 'center',
	alignItems: 'start',
	height: '100vh',
	overflowY: 'auto',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
});

export const MainSection = styled(Stack)({
	height: '100%',
	position: 'relative',
	width: '500px',
	'@media (max-width:600px)': {
		width: '95vw',
	},
});

export const MainCenterSection = styled(Stack)({
	width: '100%',
	height: '100%',
	position: 'absolute',
	left: 0,
	top: 210,
	zIndex: 2,
	'@media (max-width:600px)': {
		top: '200px',
	},
});

export const FooterSection = styled(Stack)(({ theme }) => ({
	position: 'absolute',
	top: '32px',
	left: 0,
	zIndex: 2,
	backgroundColor: theme?.palette?.infuuse.gray100,
	width: '100%',
	height: '50px',
	borderRadius: '16px',
}));

// -------------------------------sign
export const SignContainer = styled(Stack)(({ theme }) => ({
	width: '100%',
	height: '100%',
	backgroundColor: theme?.palette?.infuuse.gray100,
	borderRadius: '0 0 16px 16px',
	padding: '16px',
	position: 'relative',
}));

export const ForgotPassword = styled(Box)({
	position: 'absolute',
	top: '86px',
	right: 0,
	cursor: 'pointer',
});

export const DownButtonContainer = styled(Box)({
	position: 'absolute',
	bottom: '-16px',
	left: 0,
	direction: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	zIndex: 3,
});

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));
