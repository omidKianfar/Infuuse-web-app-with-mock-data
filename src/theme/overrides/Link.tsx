import { Components, Theme } from '@mui/material';

export default function Link(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiLink: {
			defaultProps: {
				underline: 'hover',
			},
		},
	};
}
