import { AuthContextStateType, AuthContextAction } from './type';

export const initialState = {
	error: '',
	user: null,
	isLoading: null,
	isInitialized: false,
	isAuthenticated: false,
};

// reducer
export const authReducer = (state: AuthContextStateType, action: AuthContextAction) => {
  switch (action.type) {
    case 'INITIALIZE':
      const { isAuthenticated, isLoading, user } = action.payload;
      return {
        ...state,
        user: user ?? null,
        isLoading: isLoading ?? null,
        isAuthenticated: isAuthenticated ?? false,
        isInitialized: true,
      };
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading ?? null,
      };
    default:
      return state;
  }
};
