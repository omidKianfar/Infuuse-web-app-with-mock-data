import { Components, Theme, alpha } from '@mui/material';

export default function Dialog(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiDialog: {
			styleOverrides: {
				paper: {
					boxShadow: `-40px 40px 80px -8px ${alpha(theme.palette.common.black, 0.24)}`,
					'&.MuiPaper-rounded': {
						borderRadius: Number(theme.shape.borderRadius) * 2,
					},
					'&.MuiDialog-paperFullScreen': {
						borderRadius: 0,
					},
					'&.MuiDialog-paper .MuiDialogActions-root': {
						padding: theme.spacing(3),
					},
					'@media (max-width: 600px)': {
						margin: theme.spacing(2),
					},
					'@media (max-width: 663.95px)': {
						'&.MuiDialog-paperWidthSm.MuiDialog-paperScrollBody': {
							maxWidth: '100%',
						},
					},
				},
				paperFullWidth: {
					width: '100%',
				},
			},
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					padding: theme.spacing(3, 3, 0),
				},
			},
		},
		MuiDialogContent: {
			styleOverrides: {
				root: {
					borderTop: 0,
					borderBottom: 0,
					padding: theme.spacing(3),
				},
			},
		},
		MuiDialogActions: {
			styleOverrides: {
				root: {
					'& > :not(:first-of-type)': {
						marginLeft: theme.spacing(1.5),
					},
				},
			},
		},
	};
}
