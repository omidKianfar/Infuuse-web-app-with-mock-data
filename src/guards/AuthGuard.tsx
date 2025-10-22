import { FullscreenLoading } from '@/components/organisms';
import Signin from '@/components/pages/auth/sign/signin';
import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

export default function AuthGuard({ children }: React.PropsWithChildren) {
	const { isAuthenticated } = useAuth();

	const { pathname, push } = useRouter();
	const excludePath1 = '/chat-setting/contact-chat';
	const excludePath2 = '/video-call';

	if (pathname === excludePath1 || pathname === excludePath2) {
		return children;
	}

	// if (!isInitialized) {
	// 	return <FullscreenLoading />;
	// }

	if (!isAuthenticated) {
		return (
			<Stack width="100vw" height="100vh">
				<Signin />
			</Stack>
		);
	}

	return <>{children}</>;
}
