export enum UserType {
	AgencyMember = 'AgencyMember',
	BusinessMember = 'BusinessMember',
	Admin = 'Admin',
}

export interface SignUpInput {
	email: string;
	password: string;
	name: string;
	type: UserType;
}

export interface AuthContextType {
	isAuthenticated: boolean;
	isLoading: string | null;
	user: any | null;
	signupStepCounter: number;
	setSignupStepCounter: React.Dispatch<React.SetStateAction<number>>;
	signUpWithEmail: (input: SignUpInput) => Promise<void>;
	signInWithEmail: (email: string, password: string) => Promise<void>;
	signInWithGoogle: (type: UserType) => Promise<void>;
	signInWithFacebook: () => Promise<void>;
	logout: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
	changePassword: (newPassword: string) => Promise<void>;
}

export type AuthContextStateType = {
  error: string;
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    userType?: UserType;
  } | null;
  isLoading: string | null;
  isInitialized: boolean;
  isAuthenticated: boolean;
};

export type AuthContextActionType = 'INITIALIZE' | 'IS_LOADING';

export type AuthContextAction = {
	type: AuthContextActionType;
	payload: Partial<AuthContextStateType>;
};
