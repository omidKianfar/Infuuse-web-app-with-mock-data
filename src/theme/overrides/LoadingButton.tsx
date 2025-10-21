import { Components, Theme } from '@mui/material';

export default function LoadingButton(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiLoadingButton: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
					'&:hover': {
						boxShadow: 'none',
					},
					'&.MuiLoadingButton-root': {
						height: 48,
					},
					'&.MuiLoadingButton-root:active': {
						boxShadow: 'none',
					},
					'&.MuiLoadingButton-text': {
						'& .MuiLoadingButton-startIconPendingStart': {
							marginLeft: 0,
						},
						'& .MuiLoadingButton-endIconPendingEnd': {
							marginRight: 0,
						},
					},
				},
			},
		},
	};
}
