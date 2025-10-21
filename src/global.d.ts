import { EmotionCache } from '@emotion/cache';
import { Theme } from '@mui/material';
import { Analytics } from 'firebase/analytics';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { UserDto } from 'src/graphql/generated';

declare global {
	type SocialProviders =
		| 'APPLE'
		| 'EMAIL'
		| 'GOOGLE'
		| 'GITHUB'
		| 'TWITTER'
		| 'FACEBOOK'
		| 'LINKEDIN'
		| 'DYNAMIC_LINK';

	type ThemeOverrideType = Theme;

	type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
		getLayout?: (page: ReactElement) => ReactNode;
	};

	type AppPropsWithLayout = AppProps & {
		emotionCache?: EmotionCache;
		Component: NextPageWithLayout;
	};

	type DocumentProps = NextPage & {
		emotionStyleTags?: JSX.Element[];
	};

	type GraphqlResponseType = {
		code: number;
		description: string;
		value: 'Success' | string;
	};

	type AuthLoading =
		| 'SIGN_OUT'
		| 'INITIALIZING'
		| 'RESET_PASSWORD'
		| 'SIGN_UP_WITH_EMAIL'
		| 'SIGN_IN_WITH_EMAIL'
		| 'SIGN_IN_WITH_GOOGLE'
		| 'SIGN_IN_WITH_FACEBOOK'

	type AuthContextActionType = 'INITIALIZE' | 'IS_LOADING' | 'ERROR';

	type AuthContextStateType = {
		error?: string;
		user?: UserDto | null;
		isInitialized?: boolean;
		isAuthenticated?: boolean;
		analytics?: Analytics | null;
		isLoading?: AuthLoading | null;
	};

	type SignUpInput = {
		email: string;
		password: string;
		name: string;
		type: UserType;
	};

	type AuthContextType = AuthContextStateType & {
		logout: () => void;
		resetPassword: (email: string) => void;
		signInWithEmail: (email: string, password: string) => void;
		signUpWithEmail: (input: SignUpInput) => void;
		signInWithGoogle: (type:UserType) => void;
		signInWithFacebook: () => void;
		signupStepCounter: number;
		setSignupStepCounter: React.Dispatch<React.SetStateAction<number>>;
		changePassword: (password: string) => void;
	};

	type FirebaseToken = {
		aud: string;
		exp: number;
		iat: number;
		iss: string;
		sub: string;
		email: string;
		user_id: string;
		auth_time: number;
		email_verified: boolean;
		firebase: {
			identities: { email?: Array<string> };
			sign_in_provider: 'password' | string;
		};
	};

	type ColorType = 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

	type TypographyType =
		| 'body1'
		| 'body2'
		| 'button'
		| 'caption'
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'inherit'
		| 'overline'
		| 'subtitle1'
		| 'subtitle2';

	type LocalFileType = File & {
		preview: string;
		description?: string;
	};
}
