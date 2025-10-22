import { AuthContextStateType, AuthContextActionType } from './type';

const initialState = {
    error: '',
    user: null,
    isLoading: null,
    isInitialized: false,
    isAuthenticated: false,
};

// reducer
const authReducer = (
    state: AuthContextStateType,
    action: { payload: AuthContextStateType; type: AuthContextActionType }
) => {
    if (action.type === 'INITIALIZE') {
        const { isAuthenticated, isLoading, user } = action.payload;
        return {
            ...state,
            user,
            isLoading,
            isAuthenticated,
            isInitialized: true,
        };
    } else if (action.type === 'IS_LOADING') {
        const { isLoading } = action.payload;
        return {
            ...state,
            isLoading,
        };
    }

    return state;
};

export { initialState, authReducer };
