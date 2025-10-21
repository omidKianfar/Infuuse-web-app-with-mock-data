import { Components, Theme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Accordion(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiAccordion: {
			defaultProps: {
				square: true,
				disableGutters: true,
			},
			styleOverrides: {
				root: {
					borderRadius: 12,
					marginBottom: 18,
					overflow: 'hidden',
					padding: '0px 16px',
					'&.Mui-expanded': {
						boxShadow: 'none',
						backgroundColor: '#FFFFFF',
					},
					'&.Mui-disabled': {
						backgroundColor: 'transparent',
					},
				},
			},
		},
		MuiAccordionSummary: {
			defaultProps: {
				expandIcon: <ExpandMoreIcon fontSize="small" sx={{ color: 'primary.main' }} />,
			},
			styleOverrides: {
				root: {
					fontSize: 16,
					padding: 0,
					color: theme.palette.primary.main,
					'&.Mui-disabled': {
						opacity: 1,
						color: theme.palette.action.disabled,
						'& .MuiTypography-root': {
							color: 'inherit',
						},
					},
				},
				expandIconWrapper: {
					color: 'inherit',
				},
			},
		},
	};
}
