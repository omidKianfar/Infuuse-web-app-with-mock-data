import { Box, Stack, TableCell, TableRow, TextField, Typography, styled, tableCellClasses } from '@mui/material';

export const MemberContainer = styled(Stack)(({ theme }) => ({
	width: '100%',
	height: '100%',
	overflow: 'auto',
	backgroundColor: theme?.palette?.common?.white,
	borderRadius: '16px',
	padding: '16px',
	position: 'relative',
}));




export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));



export const Footer = styled(Stack)(({ theme }) => ({
	position: 'absolute',
	left: 0,
	bottom: '24px',
	width: '100%',
	justifyContent: 'end',
	alignItems: 'center',
}));

export const FooterComment = styled(Stack)(({ theme }) => ({
	width: '97%',
	justifyContent: 'start',
	alignItems: 'center',
	padding: '16px',
	overflowY: 'auto',
	marginTop: '16px',
	backgroundColor: theme?.palette?.infuuse?.gray200,
	borderRadius: '8px',
}));



