import { Components, Theme } from '@mui/material';

export default function Typography(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiTypography: {
			styleOverrides: {
				paragraph: {
					marginBottom: theme.spacing(2),
				},
				gutterBottom: {
					marginBottom: theme.spacing(1),
				},
				body2: {
					color: theme.palette.text.secondary,
				},
				subtitle1: {
					color: theme.palette.text.disabled,
				},
			},
			defaultProps: {
				variant: 'body1',
			},
		},
	};
}
