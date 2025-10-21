import { Components, Theme } from '@mui/material';

export default function Badge(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiBadge: {
			styleOverrides: {
				dot: {
					width: 10,
					height: 10,
					borderRadius: '50%',
				},
			},
		},
	};
}
