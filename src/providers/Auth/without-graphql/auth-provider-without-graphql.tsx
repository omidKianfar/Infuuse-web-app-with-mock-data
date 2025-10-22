import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	updatePassword,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { authReducer, initialState } from './reducer';
import { FIREBASE_API } from '../firebase-config';
import { AuthContextType, SignUpInput, UserType } from './type';

const firebaseApp = initializeApp(FIREBASE_API);
export const AUTH = getAuth(firebaseApp);
export const DB = getFirestore(firebaseApp);

// --- Context
const AuthContext = createContext<AuthContextType>({
	...initialState,
	logout: async () => {},
	resetPassword: async () => {},
	changePassword: async () => {},
	signInWithEmail: async () => {},
	signUpWithEmail: async () => {},
	signInWithGoogle: async () => {},
	signInWithFacebook: async () => {},
	signupStepCounter: 0,
	setSignupStepCounter: () => {},
});

export function AuthProviderWithoutGraphQL({ children }: React.PropsWithChildren) {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();

	const [state, dispatch] = useReducer(authReducer, initialState);
	const [signupStepCounter, setSignupStepCounter] = useState<number>(0);

	// --- Check auth state
	useEffect(() => {
		const unsubscribe = AUTH.onAuthStateChanged(async (user) => {
			if (user) {
				// load user data from Firestore
				const docSnap = await getDoc(doc(DB, 'users', user.uid));
				const userData = docSnap.exists() ? docSnap.data() : null;

				dispatch({
					type: 'INITIALIZE',
					payload: {
						isAuthenticated: true,
						user: {
							uid: user.uid,
							email: user.email,
							displayName: userData?.fullName,
							userType: userData?.userType,
						},
						isLoading: null,
					},
				});

				setSignupStepCounter(userData?.signupStep ?? 1);
			} else {
				dispatch({
					type: 'INITIALIZE',
					payload: { isAuthenticated: false, user: null, isLoading: null },
				});

				if (!['/signin', '/signup'].includes(router.pathname)) {
					router.replace('/signin');
				}
			}
		});

		return () => unsubscribe();
	}, []);

	// --- Sign up
	const signUpWithEmail = async ({ email, password, name, type }: SignUpInput) => {
		dispatch({ type: 'IS_LOADING', payload: { isLoading: 'SIGN_UP_WITH_EMAIL' } });

		try {
			const result = await createUserWithEmailAndPassword(AUTH, email, password);
			const user = result.user;

			await setDoc(doc(DB, 'users', user.uid), {
				fullName: name,
				email,
				userType: type,
				signupStep: 1,
				createdAt: new Date(),
			});

			dispatch({
				type: 'INITIALIZE',
				payload: {
					isAuthenticated: true,
					user: { uid: user.uid, email: user.email, displayName: name, userType: type },
					isLoading: null,
				},
			});

			setSignupStepCounter(2);
			router.push('/signup');
		} catch (error: any) {
			console.error(error);
			enqueueSnackbar(error.message ?? 'Something went wrong', { variant: 'error' });
		} finally {
			dispatch({ type: 'IS_LOADING', payload: { isLoading: null } });
		}
	};

	// --- Sign in
	const signInWithEmail = async (email: string, password: string) => {
		dispatch({ type: 'IS_LOADING', payload: { isLoading: 'SIGN_IN_WITH_EMAIL' } });

		try {
			const result = await signInWithEmailAndPassword(AUTH, email, password);
			const user = result.user;

			const docSnap = await getDoc(doc(DB, 'users', user.uid));
			const userData = docSnap.exists() ? docSnap.data() : null;

			dispatch({
				type: 'INITIALIZE',
				payload: {
					isAuthenticated: true,
					user: {
						uid: user.uid,
						email: user.email,
						displayName: userData?.fullName,
						userType: userData?.userType,
					},
					isLoading: null,
				},
			});

			setSignupStepCounter(userData?.signupStep ?? 1);
			router.push('/signin-notification');
		} catch (error: any) {
			console.error(error);
			enqueueSnackbar(error.message ?? 'Login failed', { variant: 'error' });
		} finally {
			dispatch({ type: 'IS_LOADING', payload: { isLoading: null } });
		}
	};

	// --- Sign in with Google
	const signInWithGoogle = async (type: UserType) => {
		dispatch({ type: 'IS_LOADING', payload: { isLoading: 'SIGN_IN_WITH_GOOGLE' } });
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(AUTH, provider);
			const user = result.user;

			const docRef = doc(DB, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if (!docSnap.exists()) {
				await setDoc(docRef, {
					fullName: user.displayName,
					email: user.email,
					userType: type,
					signupStep: 1,
					createdAt: new Date(),
				});
			}

			dispatch({
				type: 'INITIALIZE',
				payload: {
					isAuthenticated: true,
					user: { uid: user.uid, email: user.email, displayName: user.displayName, userType: type },
					isLoading: null,
				},
			});

			setSignupStepCounter(2);
			router.push('/signup');
		} catch (error: any) {
			console.error(error);
			enqueueSnackbar(error.message ?? 'Login failed', { variant: 'error' });
		} finally {
			dispatch({ type: 'IS_LOADING', payload: { isLoading: null } });
		}
	};

	// --- Sign in with Facebook
	const signInWithFacebook = async () => {
		dispatch({ type: 'IS_LOADING', payload: { isLoading: 'SIGN_IN_WITH_FACEBOOK' } });
		try {
			const provider = new FacebookAuthProvider();
			await signInWithPopup(AUTH, provider);
		} catch (error: any) {
			console.error(error);
			enqueueSnackbar(error.message ?? 'Login failed', { variant: 'error' });
		} finally {
			dispatch({ type: 'IS_LOADING', payload: { isLoading: null } });
		}
	};

	// --- Reset password
	const resetPassword = async (email: string) => {
		try {
			await sendPasswordResetEmail(AUTH, email);
			enqueueSnackbar('Password reset link sent.');
		} catch (error: any) {
			enqueueSnackbar(error.message ?? 'Error', { variant: 'error' });
		}
	};

	// --- Change password
	const changePassword = async (newPassword: string) => {
		try {
			if (AUTH.currentUser) {
				await updatePassword(AUTH.currentUser, newPassword);
				enqueueSnackbar('Password changed successfully.');
			}
		} catch (error: any) {
			enqueueSnackbar(error.message ?? 'Error', { variant: 'error' });
		}
	};

	// --- Logout
	const logout = async () => {
		try {
			await signOut(AUTH);
			dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: false, user: null, isLoading: null } });
			setSignupStepCounter(0);
			router.push('/signin');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				logout,
				resetPassword,
				changePassword,
				signInWithEmail,
				signUpWithEmail,
				signInWithGoogle,
				signInWithFacebook,
				signupStepCounter,
				setSignupStepCounter,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextType {
	return useContext(AuthContext);
}
