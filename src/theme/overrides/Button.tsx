import { Components, Theme } from '@mui/material';

export default function Button(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiButton: {
			styleOverrides: {
				sizeExtraLarge: {}, // this needs to be here to allow size="tiny" prop to register
				root: {
					'&:hover': {
						boxShadow: 'none',
					},
					'&.MuiButton-sizeExtraLarge': {
						// this is how you style it because some reason you cannot style the above sizeTiny:{}
						height: 56,
					},
				},
				sizeLarge: {
					height: 48,
				},
				// contained
				containedInherit: {
					color: theme.palette.grey[800],
					'&:hover': {
						backgroundColor: theme.palette.grey[400],
					},
				},
				// outlined
				outlinedInherit: {
					border: `1px solid ${theme.palette.grey['500']}`,
					'&:hover': {
						backgroundColor: theme.palette.action.hover,
					},
				},
				textInherit: {
					'&:hover': {
						backgroundColor: theme.palette.action.hover,
					},
				},
			},
		},
	};
}
