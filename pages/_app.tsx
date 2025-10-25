import SocialMessageProvider from '@/providers/socialMessageProvider';
import TwilioContextProvider from '@/providers/Twilio/provider';
import { CacheProvider } from '@emotion/react';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import ProgressBar from 'src/components/atoms/ProgressBar';
import { NotistackProvider } from 'src/providers/NotistackProvider';
import { ThemeProvider } from 'src/theme';
import { createEmotionCache } from 'src/utils/createEmotionCache';
import '../public/global.css';
import { AuthProviderWithoutGraphQL } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';

const clientSideEmotionCache = createEmotionCache();

interface ApiError {
	[apiName: string]: {
		status: string;
	};
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
	mutationCache: new MutationCache({
		onError: (error: unknown) => {
			if (isApiError(error)) {
				const [apiName] = Object.keys(error);
				const subField = error[apiName];

				// enqueueSnackbar(subField?.status || 'Something went wrong. Try again later!', {
				// 	variant: 'error',
				// });
			} else {
				// enqueueSnackbar('Something went wrong. Try again later!', {
				// 	variant: 'error',
				// });
			}
		},
	}),
});

function isApiError(error: unknown): error is ApiError {
	return typeof error === 'object' && error !== null && Object.keys(error).every((key) => typeof key === 'string');
}

export default function App(props: AppPropsWithLayout) {
	const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<NotistackProvider>
					{/* <AuthProvider> */}
					<AuthProviderWithoutGraphQL>
						<ThemeProvider>
							<TwilioContextProvider>
								<SocialMessageProvider>
									<ProgressBar />
									{getLayout(<Component {...pageProps} />)}
								</SocialMessageProvider>
							</TwilioContextProvider>
						</ThemeProvider>
					</AuthProviderWithoutGraphQL>

					{/* </AuthProvider> */}
				</NotistackProvider>
			</QueryClientProvider>
		</CacheProvider>
	);
}
