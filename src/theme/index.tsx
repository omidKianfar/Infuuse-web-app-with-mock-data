import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MUIThemeProvider, Theme, ThemeOptions } from '@mui/material/styles';
import React from 'react';

import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import palette from './palette';
import typography from './typography';

export function ThemeProvider({ children }: React.PropsWithChildren) {

	const themeOptions = React.useMemo(
		() =>
			({
				typography,
				breakpoints,
				palette: palette.light,
				shape: { borderRadius: 5 },
			}) as ThemeOptions,
		[palette.light]
	);

	const theme = createTheme(themeOptions);
	theme.components = componentsOverride(theme as Theme);

	return (
		<MUIThemeProvider theme={theme}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			{children}
		</MUIThemeProvider>
	);
}
