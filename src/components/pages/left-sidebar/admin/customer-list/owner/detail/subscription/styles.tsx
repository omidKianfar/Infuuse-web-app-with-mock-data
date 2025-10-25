import { Box, Stack, TableCell, TableRow, TextField, Typography, styled, tableCellClasses } from '@mui/material';

export const MemberContainer = styled(Stack)(({ theme }) => ({
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

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));

export const CheckboxContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
	padding: '4px 16px 4px 8px',
	backgroundColor: theme?.palette?.infuuse?.blue100,
	borderRadius: '16px',
	marginRight: '16px',
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

export const CheckboxFlexContainer = styled(Stack)(({ theme }) => ({
	justifyContent: 'start',
	alignItems: 'center',
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(even)': {
		backgroundColor: theme.palette.action.hover,
	},
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		padding: ' 16px 32px',
		backgroundColor: theme?.palette?.infuuse?.gray400,
	},
	[`&.${tableCellClasses.body}`]: {
		padding: ' 16px 32px',
	},
}));


