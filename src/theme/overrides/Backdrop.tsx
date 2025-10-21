import { Components, Theme, alpha } from '@mui/material/styles';

export default function Backdrop(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiBackdrop: {
			styleOverrides: {
				root: {
					backdropFilter: theme.palette.mode === 'dark' ? 'blur(3px)' : 'none',
					WebkitBackdropFilter: theme.palette.mode === 'dark' ? 'blur(3px)' : 'none', // Fix on Mobile
					backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : alpha('#000', 0.3),
					'&.MuiBackdrop-invisible': {
						// background: 'transparent',
					},
				},
			},
		},
	};
}
