import { Components, Theme, alpha } from '@mui/material/styles';

export default function Card(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiCard: {
			styleOverrides: {
				root: {
					position: 'relative',
					borderRadius: Number(theme.shape.borderRadius) * 2,
					zIndex: 0, // Fix Safari overflow: hidden with border radius
					boxShadow: `0 0 2px 0 ${alpha(theme.palette.grey[500], 0.2)}, 0 12px 24px -4px ${alpha(
						theme.palette.grey[500],
						0.12
					)}`,
				},
			},
		},
		MuiCardHeader: {
			defaultProps: {
				titleTypographyProps: { variant: 'h6' },
				subheaderTypographyProps: { variant: 'body2', marginTop: theme.spacing(0.5) },
			},
			styleOverrides: {
				root: {
					padding: theme.spacing(3, 3, 0),
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: theme.spacing(3),
				},
			},
		},
	};
}
