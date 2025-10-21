import { GlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import React, { useRef } from 'react';
import { font } from 'src/theme/typography';

function SnackbarStyles() {
	const theme = useTheme();

	return (
		<GlobalStyles
			styles={{
				'#__next': {
					'& .SnackbarContent-root': {
						width: '100%',
						boxShadow: 'none',
						padding: theme.spacing(1),
						margin: theme.spacing(0.25, 0),
						color: theme.palette.grey[100],
						borderRadius: theme.shape.borderRadius,
						[theme.breakpoints.up('md')]: {
							minWidth: 240,
						},
					},
					'& .SnackbarItem-message': {
						padding: '8px !important',
						fontFamily: font.style.fontFamily,
						fontWeight: theme.typography.fontWeightMedium,
					},
					'& .SnackbarItem-action': {
						marginRight: 0,
						color: theme.palette.action.active,
						'& svg': { width: 20, height: 20 },
					},
				},
			}}
		/>
	);
}

export function NotistackProvider({ children }: React.PropsWithChildren) {
	const notistackRef = useRef<SnackbarProvider>();

	return (
		<>
			<SnackbarStyles />

			<SnackbarProvider
				maxSnack={3}
				preventDuplicate
				autoHideDuration={3000}
				ref={notistackRef as any}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			>
				{children}
			</SnackbarProvider>
		</>
	);
}
