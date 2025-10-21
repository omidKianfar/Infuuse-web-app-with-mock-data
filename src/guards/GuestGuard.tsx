import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/providers/AuthProvider';

export default function GuestGuard({ children }: React.PropsWithChildren) {
	const router = useRouter();
	const { user, isAuthenticated } = useAuth();
	React.useEffect(() => {
		if (isAuthenticated) {
			console.log('Guest Guard: user is authenticated');
			const routeName = '/inbox';
			router.replace(routeName);
		}
	}, [isAuthenticated]);
	return <>{children}</>;
}

// how to use ? wrap it into login and register page, after you sign in as a user,
// this will redirect you automatically to proper page, see Login page for more information
