import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Inter } from 'next/font/google';
import { pxToRem, responsiveFontSizes } from 'src/utils';

export const font = Inter({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const typography = {
	fontFamily: font.style.fontFamily,
	fontWeightRegular: 400,
	fontWeightMedium: 500,
	fontWeightBold: 700,
	h1: {
		fontWeight: 700,
		lineHeight: 80 / 64,
		fontSize: pxToRem(40),
		letterSpacing: 2,
		...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
	},
	h2: {
		fontWeight: 700,
		lineHeight: 64 / 48,
		fontSize: pxToRem(32),
		...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
	},
	h3: {
		fontWeight: 500,
		lineHeight: 1.5,
		fontSize: pxToRem(27),
		...responsiveFontSizes({ sm: 20, md: 24, lg: 27 }),
	},
	h4: {
		fontWeight: 700,
		lineHeight: 1.5,
		fontSize: pxToRem(20),
		...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
	},
	h5: {
		fontWeight: 500,
		lineHeight: 1.5,
		fontSize: pxToRem(18),
		...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
	},
	h6: {
		fontWeight: 500,
		lineHeight: 28 / 18,
		fontSize: pxToRem(17),
		...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
	},
	subtitle1: {
		fontWeight: 600,
		lineHeight: 1.5,
		fontSize: pxToRem(13),
	},
	subtitle2: {
		fontWeight: 600,
		lineHeight: 22 / 14,
		fontSize: pxToRem(11),
	},
	body1: {
		lineHeight: 1.5,
		fontSize: pxToRem(15),
	},
	body2: {
		lineHeight: 22 / 14,
		fontSize: pxToRem(13),
	},
	caption: {
		lineHeight: 1.5,
		fontSize: pxToRem(12),
	},
	overline: {
		fontWeight: 700,
		lineHeight: 1.5,
		fontSize: pxToRem(12),
		textTransform: 'uppercase',
	},
	button: {
		fontWeight: 700,
		lineHeight: 24 / 14,
		fontSize: pxToRem(14),
		textTransform: 'capitalize',
	},
} as TypographyOptions;

export default typography;
