import { Components, Theme } from '@mui/material';

export default function Menu(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiMenuItem: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						backgroundColor: theme.palette.action.selected,
						'&:hover': {
							backgroundColor: theme.palette.action.hover,
						},
					},
				},
			},
		},
	};
}
