import { Components, Theme } from '@mui/material';

export default function Tabs(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiTab: {
			styleOverrides: {
				root: {
					padding: 0,
					fontWeight: theme.typography.fontWeightLight,
					borderTopLeftRadius: theme.shape.borderRadius,
					borderTopRightRadius: theme.shape.borderRadius,
					'&.Mui-selected': {
						color: theme.palette.text.primary,
						borderBottomColor: 'red',
					},
					'&:not(:last-of-type)': {
						marginRight: theme.spacing(1),
					},
					'@media (min-width: 600px)': {
						minWidth: 45,
					},
				},
				labelIcon: {
					minHeight: 48,
					flexDirection: 'row',
					'& > *:first-of-type': {
						marginBottom: 0,
						marginRight: theme.spacing(1),
					},
				},
				wrapper: {
					flexDirection: 'row',
					whiteSpace: 'nowrap',
				},
				textColorInherit: {
					opacity: 1,
					color: theme.palette.text.primary,
				},
			},
		},
		MuiTabPanel: {
			styleOverrides: {
				root: {
					padding: 0,
				},
			},
		},
		MuiTabScrollButton: {
			styleOverrides: {
				root: {
					width: 48,
					borderRadius: '50%',
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					' .MuiTabs-indicator': {
						width: '100%',
						backgroundColor: theme.palette.secondary.main,
					},
				},
			},
		},
	};
}
