import { FullscreenLoading } from '@/components/organisms';
import Signin from '@/components/pages/auth/sign/signin';
import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

export default function AuthGuard({ children }: React.PropsWithChildren) {
	const { isAuthenticated, isInitialized } = useAuth();

	const { pathname } = useRouter();
	const excludePaths = ['/chat-setting/contact-chat', '/video-call'];

	if (excludePaths.includes(pathname)) return children;

	if (!isInitialized) {
		return <FullscreenLoading />;
	}

	if (!isAuthenticated) {
		return (
			<Stack width="100vw" height="100vh">
				<Signin />
			</Stack>
		);
	}

	return <>{children}</>;
}
