import { Components, Theme } from '@mui/material';

export default function Paper(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiPaper: {
			defaultProps: {
				elevation: 0,
			},

			variants: [
				{
					props: { variant: 'outlined' },
					style: { borderColor: theme.palette.grey[500] },
				},
			],

			styleOverrides: {
				root: {
					backgroundImage: 'none',
					boxShadow: 'none !important',
				},
			},
		},
	};
}
