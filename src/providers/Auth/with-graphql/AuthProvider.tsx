import { useQueryClient } from '@tanstack/react-query';
import { initializeApp } from 'firebase/app';
import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	User,
	createUserWithEmailAndPassword,
	getAuth,
	sendPasswordResetEmail,
	signInWithPopup,
	signOut,
	updatePassword,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { fetcher, graphQLClient, isTokenExpired } from 'src/graphql/fetcher';
import {
	AgencyMember_SignUpOwnerDocument,
	AgencyMember_SignUpOwnerMutation,
	AgencyMember_SignUpOwnerMutationVariables,
	BusinessMember_SignUpOwnerDocument,
	BusinessMember_SignUpOwnerMutation,
	BusinessMember_SignUpOwnerMutationVariables,
	UserDto,
	UserType,
	useGetRefreshTokenMutation,
	useLoginMutation,
} from 'src/graphql/generated';
import { getResponseErrorMessage } from 'src/utils';
import { ACCESS_REFRESH_TOKEN, ACCESS_TOKEN_KEY } from 'src/utils/constants';
import { clearCookie, getCookie, saveCookie } from 'src/utils/storage/cookieStorage';
import { FIREBASE_API } from '../firebase-config';
import { authReducer, initialState } from '../without-graphql/reducer';
import { getUser } from './get-user';
// config firebase

const firebaseApp = initializeApp(FIREBASE_API);
export const AUTH = getAuth(firebaseApp);

// auth type
const AuthContext = createContext<AuthContextType>({
	...initialState,
	logout: () => Promise.resolve(),
	resetPassword: (email: string) => Promise.resolve(),
	signInWithEmail: (email: string, password: string) => Promise.resolve(),
	signUpWithEmail: (input: SignUpInput) => Promise.resolve(),
	signInWithGoogle: (type: UserType) => Promise.resolve(),
	signInWithFacebook: () => Promise.resolve(),
	signupStepCounter: 0,
	setSignupStepCounter: () => {},
	changePassword: (password: string) => Promise.resolve(),
});

export function AuthProvider({ children }: React.PropsWithChildren) {
	// ------------------------------tools
	const router = useRouter();
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	// ------------------------------ states
	const [state, dispatch] = useReducer(authReducer, initialState);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [signupStepCounter, setSignupStepCounter] = useState<number>(0);

	// refresh token
	const refreshToken = getCookie(ACCESS_REFRESH_TOKEN);

	// not include auth page
	const excludePath1 = ['/signup', '/chat-setting/contact-chat'];
	const excludePath2 = ['/signup', '/video-call'];

	// ------------------------------ query
	// login
	const { mutateAsync, isLoading } = useLoginMutation();

	// refresh token
	const { mutate } = useGetRefreshTokenMutation();

	// use effect
	useEffect(() => {
		const checkAuth = async () => {
			const token = getCookie(ACCESS_TOKEN_KEY);

			if (token) {
				if (!isTokenExpired(token)) {
					const user = await getUser(token);

					dispatch({
						type: 'INITIALIZE',
						payload: {
							isLoading: null,
							user: user?.result as UserDto,
							isAuthenticated: true,
						},
					});
				} else {
					dispatch({
						type: 'INITIALIZE',
						payload: { isAuthenticated: false, isLoading: null, user: null },
					});

					graphQLClient.setHeader('Authorization', 'Bearer ' + refreshToken);

					mutate(
						{ refreshToken },
						{
							onSuccess: async (data) => {
								const token: string = data?.firebase_getTokenByRefreshToken?.result?.idToken as string;
								const refreshToken: string = data?.firebase_getTokenByRefreshToken?.result
									?.refreshToken as string;

								saveCookie(ACCESS_TOKEN_KEY, token);
								saveCookie(ACCESS_REFRESH_TOKEN, refreshToken);

								const user = await getUser(token);

								dispatch({
									type: 'INITIALIZE',
									payload: {
										isLoading: null,
										user: user?.result as UserDto,
										isAuthenticated: true,
									},
								});
							},
						}
					);
				}
			} else if (!excludePath1.includes(router.pathname) && !excludePath2.includes(router.pathname)) {
				router.replace('/signin');
			}
		};
		checkAuth();
	}, []);

	// sign in with email
	const signInWithEmail = async (email: string, password: string) => {
		dispatch({
			type: 'IS_LOADING',
			payload: { isLoading: 'SIGN_IN_WITH_EMAIL' },
		});
		try {
			await mutateAsync(
				{ input: { email, password } },
				{
					onSuccess: async (data) => {
						if (data.firebase_login?.status.code === 0) {
							clearCookie(ACCESS_TOKEN_KEY);
							clearCookie(ACCESS_REFRESH_TOKEN);

							return enqueueSnackbar('Username or password is not valid', { variant: 'warning' });
						}

						const token: string = data?.firebase_login?.result?.idToken as string;
						const refreshToken: string = data?.firebase_login?.result?.refreshToken as string;

						const user = await getUser(token);

						if (
							user?.status?.value === 'AgencyHasBeenSuspended' ||
							user?.status?.value === 'BusinessHasBeenSuspended'
						) {
							router.push('/deactived');
							dispatch({
								type: 'INITIALIZE',
								payload: { isAuthenticated: false, isLoading: null, user: null },
							});
						} else if (user?.status?.value === 'AwaitingSubscriptionPayment') {
							router.push('/deactived-payment');
							dispatch({
								type: 'INITIALIZE',
								payload: { isAuthenticated: false, isLoading: null, user: null },
							});
						} else {
							saveCookie(ACCESS_TOKEN_KEY, token);
							saveCookie(ACCESS_REFRESH_TOKEN, refreshToken);

							dispatch({
								type: 'INITIALIZE',
								payload: {
									isLoading: null,
									user: user?.result as UserDto,
									isAuthenticated: true,
								},
							});

							router.push('/signin-notification');
						}
					},
					onError: (e) => {
						enqueueSnackbar('There is an error');
					},
				}
			);
		} catch (error) {
			console.error(error);
			enqueueSnackbar('Something went wrong. try again later.', { variant: 'error' });
		} finally {
			dispatch({
				type: 'IS_LOADING',
				payload: { isLoading: null },
			});
		}
	};

	// change pasword
	const changePassword = async (newPassword: string) => {
		try {
			await updatePassword(currentUser!, newPassword);
			enqueueSnackbar('Password changed successfully.');
		} catch (error) {
			enqueueSnackbar(getResponseErrorMessage(error), { variant: 'error' });
		}
	};

	// register user
	async function registerUserAsync(token: string, email: string, name: string, type: UserType, user: any) {
		graphQLClient.setHeader('Authorization', 'Bearer ' + token);

		switch (type) {
			case UserType.AgencyMember:
				{
					const response = await fetcher<
						AgencyMember_SignUpOwnerMutation,
						AgencyMember_SignUpOwnerMutationVariables
					>(AgencyMember_SignUpOwnerDocument, { input: { email, fullName: name } })();

					const user = await getUser(token);

					if (response.agencyMember_signUpOwner?.status.value === 'Success') {
						dispatch({
							type: 'INITIALIZE',
							payload: {
								isLoading: null,
								user: user?.result as UserDto,
								isAuthenticated: true,
							},
						});
						router.push('/signup');
						setSignupStepCounter(2);
					}

					if (response.agencyMember_signUpOwner?.status.value === 'AlreadyExists') {
						dispatch({
							type: 'INITIALIZE',
							payload: {
								isLoading: null,
								user: user?.result as UserDto,
								isAuthenticated: true,
							},
						});
						router.push('/signin-notification');
					}
				}
				break;
			case UserType.BusinessMember:
				{
					const response = await fetcher<
						BusinessMember_SignUpOwnerMutation,
						BusinessMember_SignUpOwnerMutationVariables
					>(BusinessMember_SignUpOwnerDocument, { input: { email, fullName: name } })();

					const user = await getUser(token);

					if (response?.businessMember_signUpOwner?.status.value === 'Success') {
						dispatch({
							type: 'INITIALIZE',
							payload: {
								isLoading: null,
								user: user?.result as UserDto,
								isAuthenticated: true,
							},
						});

						router.push('/signup');
						setSignupStepCounter(2);
					}

					if (response.businessMember_signUpOwner?.status.value === 'AlreadyExists') {
						dispatch({
							type: 'INITIALIZE',
							payload: {
								isLoading: null,
								isAuthenticated: true,
								user: user as any,
							},
						});
						router.push('/signin-notification');
					}
				}
				break;
		}
	}

	// signup with email
	const signUpWithEmail = async ({ email, password, name, type }: SignUpInput) => {
		dispatch({
			type: 'IS_LOADING',
			payload: { isLoading: 'SIGN_UP_WITH_EMAIL' },
		});
		try {
			const result = await createUserWithEmailAndPassword(AUTH, email, password);

			const user = await result.user;
			const token = await result.user.getIdToken();
			const refreshToken = await result.user.refreshToken;

			saveCookie(ACCESS_TOKEN_KEY, token);
			saveCookie(ACCESS_REFRESH_TOKEN, refreshToken);

			await registerUserAsync(token, email, name, type, user);
		} catch (error) {
			console.error(error);

			enqueueSnackbar(getResponseErrorMessage(error), { variant: 'error' });
		} finally {
			dispatch({
				type: 'IS_LOADING',
				payload: { isLoading: null },
			});
		}
	};

	// reset password
	const resetPassword = async (email: string) => {
		dispatch({
			type: 'IS_LOADING',
			payload: { isLoading: 'RESET_PASSWORD' },
		});

		try {
			await sendPasswordResetEmail(AUTH, email);
			enqueueSnackbar('Password reset link has been sent to your email.');
		} catch (error) {
			console.error(error);
			enqueueSnackbar(getResponseErrorMessage(error), { variant: 'error' });
		} finally {
			dispatch({
				type: 'IS_LOADING',
				payload: { isLoading: null },
			});
		}
	};

	// sign in with google
	const signInWithGoogle = async (type: UserType) => {
		dispatch({
			type: 'IS_LOADING',
			payload: { isLoading: 'SIGN_IN_WITH_GOOGLE' },
		});
		try {
			const provider = new GoogleAuthProvider();
			const data = await signInWithPopup(AUTH, provider);

			const user = await data.user;
			const name: string = (await data.user.displayName) as string;
			const email: string = (await data.user.email) as string;
			const token: string = (await data.user.getIdToken()) as string;
			const refreshToken = data.user.refreshToken;

			graphQLClient.setHeader('Authorization', 'Bearer ' + token);

			saveCookie(ACCESS_TOKEN_KEY, token);
			saveCookie(ACCESS_REFRESH_TOKEN, refreshToken);

			await registerUserAsync(token as string, name, email, type, user);
		} catch (error) {
			console.error(error);
			enqueueSnackbar(getResponseErrorMessage(error) ?? '', { variant: 'error' });
		} finally {
			dispatch({
				type: 'IS_LOADING',
				payload: { isLoading: null },
			});
		}
	};

	// sign in with facebook
	const signInWithFacebook = async () => {
		dispatch({
			type: 'IS_LOADING',
			payload: { isLoading: 'SIGN_IN_WITH_FACEBOOK' },
		});
		try {
			const provider = new FacebookAuthProvider();
			await signInWithPopup(AUTH, provider);
		} catch (error) {
			console.error(error);
			enqueueSnackbar(getResponseErrorMessage(error), { variant: 'error' });
		} finally {
			dispatch({
				type: 'IS_LOADING',
				payload: { isLoading: null },
			});
		}
	};

	// logout
	const logout = async () => {
		dispatch({
			type: 'IS_LOADING',
			payload: { isLoading: 'SIGN_OUT' },
		});
		try {
			await signOut(AUTH);

			dispatch({
				type: 'INITIALIZE',
				payload: {
					user: null,
					isInitialized: true,
					isAuthenticated: false,
				},
			});

			queryClient.clear();
			clearCookie(ACCESS_TOKEN_KEY);
		} catch (error) {
		} finally {
			dispatch({
				type: 'IS_LOADING',
				payload: { isLoading: null },
			});
		}
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				logout,
				resetPassword,
				signInWithEmail,
				signUpWithEmail,
				signupStepCounter,
				setSignupStepCounter,
				changePassword,
				signInWithGoogle,
				signInWithFacebook,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextType {
	return useContext(AuthContext);
}
