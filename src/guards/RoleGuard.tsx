import { Error404 } from '@/assets/404-icon';
import { NextButton } from '@/components/atoms/Button';
import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';

import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

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
	);
};

export default RoleGuard;
