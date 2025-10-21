import { Components, Theme, alpha } from '@mui/material/styles';

export default function Popover(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiPopover: {
			styleOverrides: {
				paper: {
					borderRadius: Number(theme.shape.borderRadius) * 1.5,
					boxShadow: `0 0 2px 0 ${alpha(theme.palette.grey[500], 0.24)}, -20px 20px 40px -4px ${alpha(
						theme.palette.grey[500],
						0.24
					)}`,
				},
			},
		},
	};
}
