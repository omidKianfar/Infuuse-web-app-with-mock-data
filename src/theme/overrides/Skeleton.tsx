import { Components, Theme } from '@mui/material';

export default function Skeleton(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiSkeleton: {
			defaultProps: {
				animation: 'wave',
			},
			styleOverrides: {
				root: {
					backgroundColor:
						theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.background.neutral,
				},
			},
		},
	};
}
