import { Components, Theme, alpha } from '@mui/material';

export default function Drawer(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiDrawer: {
			styleOverrides: {
				modal: {
					'&[role="presentation"]': {
						'& .MuiDrawer-paperAnchorLeft': {
							boxShadow: `8px 24px 24px 12px ${alpha(theme.palette.grey[300], 0.16)}`,
						},
						'& .MuiDrawer-paperAnchorRight': {
							boxShadow: `-8px 24px 24px 12px ${alpha(theme.palette.grey[300], 0.16)}`,
						},
					},
				},
			},
		},
	};
}
