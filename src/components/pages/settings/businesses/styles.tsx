import { AgencyMemberAssignmentStatus } from '@/graphql/generated';
import { Box, Stack, TableCell, TableRow, TextField, Typography, styled, tableCellClasses } from '@mui/material';

export const BusinessContainer = styled(Stack)(({ theme }) => ({
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

export const HeadComment = styled(Stack)(({ theme }) => ({
	width: '100%',
	padding: '16px',
	overflowY: 'auto',
	backgroundColor: theme?.palette?.infuuse?.gray200,
	borderRadius: '8px',
	marginBottom: '32px',
}));

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));

export const ColorPaletteContainer = styled(Stack)(({ theme }) => ({
	justifyContent: 'start',
	alignItems: 'center',
	width: '100%',
	cursor: 'pointer',
	'&:hover': {
		bgcolor: theme?.palette?.infuuse?.gary500,
		Padding: '8px',
	},
}));

export const ColorPaletteBox = styled(Box)(({ theme }) => ({
	width: '16px',
	height: '16px',
	borderRadius: '360px',
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

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(even)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

export const CutomSatatusTypography = styled(Typography)<{ status: AgencyMemberAssignmentStatus }>(
	({ theme, status }) => ({
		color:
			status === AgencyMemberAssignmentStatus?.Approved
				? theme?.palette?.infuuse?.green200
				: status === AgencyMemberAssignmentStatus?.Canceled
				? theme?.palette?.infuuse?.gary500
				: status === AgencyMemberAssignmentStatus?.Rejected
				? theme?.palette?.infuuse?.red100
				: theme?.palette?.infuuse?.orange100,
	})
);



export const CustomTextField = styled(TextField)(({ theme }) => ({
	// ["@media (max-width:600px)"]: {

	// },

	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '48px',

		'& .MuiInputBase-input': {
			color: theme?.palette?.infuuse.blueLight400,
			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
			// borderRadius: "16px",
		},
	},
}));