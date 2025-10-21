import { useTheme } from '@mui/material';
import { FirebaseError } from "firebase/app";
import { ResponseStatus } from "src/graphql/generated";
import useResponsive from "src/hooks/useResponsive";
import config from "../../config";
import { FirebaseErrorCatalogs } from "./constants/firebase-catalog";

export function randomString(length: number) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export function remToPx(value: string) {
	return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
	return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: any) {
	return {
		'@media (min-width:600px)': {
			fontSize: pxToRem(sm),
		},
		'@media (min-width:900px)': {
			fontSize: pxToRem(md),
		},
		'@media (min-width:1200px)': {
			fontSize: pxToRem(lg),
		},
	};
}


export function useWidth() {
	const theme = useTheme();
	const keys = [...theme.breakpoints.keys].reverse();
	return (
		// @ts-ignore
		keys.reduce((output, key) => {
			const matches = useResponsive('up', key);
			return !output && matches ? key : output;
		}, null) || 'xs'
	);
}


export function GetFontValue(variant: TypographyType) {
	const theme = useTheme();
	const breakpoints = useWidth();

	const key = theme.breakpoints.up(breakpoints === 'xl' ? 'lg' : breakpoints);

	const hasResponsive =
		variant === 'h1' ||
		variant === 'h2' ||
		variant === 'h3' ||
		variant === 'h4' ||
		variant === 'h5' ||
		variant === 'h6';

	const getFont =
		// @ts-ignore
		hasResponsive && theme.typography[variant][key] ? theme.typography[variant][key] : theme.typography[variant];

	const fontSize = remToPx(getFont.fontSize);
	// @ts-ignore
	const lineHeight = Number(theme.typography[variant].lineHeight) * fontSize;
	// @ts-ignore
	const { fontWeight } = theme.typography[variant];
	// @ts-ignore
	const { letterSpacing } = theme.typography[variant];

	return { fontSize, lineHeight, fontWeight, letterSpacing };
}

export function getFullImageUrl(url?: string | undefined | null) {
	if (url) {
		if (url?.startsWith?.('https') || url?.startsWith?.('http')) {
			return url;
		}
		return url && `${config.CDN_URL}${url}`;
	}
}

export function responseDestructure<T>(data: any) {
	const [apiName] = Object.keys(data);

	const subField = data?.[apiName];
	return { result: subField?.result as T, status: subField?.status as ResponseStatus };
}

export function getResponseErrorMessage(error: any) {
	if (error instanceof FirebaseError) return FirebaseErrorCatalogs[error?.code];
	else error;
}
