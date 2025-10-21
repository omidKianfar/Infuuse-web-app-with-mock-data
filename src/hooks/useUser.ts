import { useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { useAuth } from '@/providers/AuthProvider';

export function useUser() {
	const { isAuthenticated } = useAuth();
	const { data, isLoading } = useUser_GetCurrentUserQuery({}, { enabled: isAuthenticated });
	const userData = data?.user_getCurrentUser?.result;

	return {
		userData,
		userLoading: isLoading,
	};
}
