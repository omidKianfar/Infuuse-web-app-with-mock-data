import { Components, Theme, alpha } from '@mui/material/styles';

export default function Chip(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 4,
					width: 104,
				},
			},
		},
	};
}
