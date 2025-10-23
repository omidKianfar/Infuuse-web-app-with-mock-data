import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { lazy, Suspense, useEffect } from 'react';

const Error404 = lazy(() => import('@/assets/404-icon').then((module) => ({ default: module.Error404 })));
const NextButton = lazy(() => import('@/components/atoms/Button').then((module) => ({ default: module.NextButton })));

type Props = React.PropsWithChildren & {
	accessibleRoles?: string[];
};

const RoleGuard: React.FC<Props> = ({ accessibleRoles, children }) => {
	const router = useRouter();
	const { user } = useAuth();
	const userType = user?.user?.userType;

	useEffect(() => {
		if (!userType) {
			router.push('/signup');
		}
	}, [userType, router, user]);

	if (userType && accessibleRoles?.includes(userType)) {
		return <>{children}</>;
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Stack width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
				<Error404 />
				<Box
					onClick={() => router.push('/signin')}
					sx={{ cursor: 'pointer', mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					<NextButton onClick={() => router.push('/inbox')} sx={{ width: 200 }}>
						Go to Home
					</NextButton>
				</Box>
			</Stack>
		</Suspense>
	);
};

export default RoleGuard;
