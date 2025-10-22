import { useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { useAuth } from '@/providers/Auth/with-graphql/AuthProvider';

export function useUser() {
	const { isAuthenticated } = useAuth();
	const { data, isLoading } = useUser_GetCurrentUserQuery({}, { enabled: isAuthenticated });
	const userData = data?.user_getCurrentUser?.result;

	return {
		userData,
		userLoading: isLoading,
	};
}
