import { Components, Theme, darken, lighten } from '@mui/material';

export default function Autocomplete(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	const lightColor = '#F5F5F5',
		darkColor = theme.palette.primary.dark,
		isLightMode = theme.palette.mode == 'light';

	return {
		MuiAutocomplete: {
			styleOverrides: {
				root: {
					overflow: 'hidden',
					'& .MuiOutlinedInput-root': {
						borderRadius: '5px 5px 0 0',
						backgroundColor: `${isLightMode ? lightColor : darkColor} !important`,
					},
					'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
						border: 'none !important',
					},
				},
				paper: {
					backgroundColor: `${isLightMode ? lightColor : darkColor} !important`,
					border: `1px solid ${isLightMode ? darken(lightColor, 0.1) : lighten(darkColor, 0.1)} !important`,
				},
				listbox: {
					padding: theme.spacing(1, 1),
					'& .MuiAutocomplete-option': {
						padding: theme.spacing(1),
						margin: theme.spacing(1, 0),
						borderRadius: theme.shape.borderRadius,
					},
				},
			},
		},
	};
}
