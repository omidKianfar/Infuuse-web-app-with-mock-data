import { Components, Theme, alpha, styled, Select as MSelect } from '@mui/material';

export default function Select(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiSelect: {
			styleOverrides: {},
		},
	};
}

export const SelectInput = styled(MSelect)(({ theme }) => ({
	width: '190px',
	height: '40px',
	border: 'none',
	fontSize: '15px',
	borderRadius: 4,
	color: theme.palette.text.primary,
	backgroundColor: theme.palette.background.paper,
	'.MuiSvgIcon-root ': {
		fill: 'white !important',
		fontSize: '25px',
	},
	'.MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.primary.dark,
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.primary.dark,
	},
	'&:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.primary.dark,
	},
}));

export const SelectInputProfile = styled(MSelect)(({ theme }) => ({
	width: '190px',
	height: '40px',
	border: 'none',
	fontSize: '15px',
	borderRadius: 4,
	color: theme.palette.text.primary,
	backgroundColor: theme.palette.background.paper,
	'.MuiSvgIcon-root ': {
		fill: 'gray !important',
		fontSize: '25px',
	},
	'.MuiOutlinedInput-notchedOutline': {
		borderColor: 'gray !important',
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: 'gray !important',
	},
	'&:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: '#008BEF !important',
	},
}));
