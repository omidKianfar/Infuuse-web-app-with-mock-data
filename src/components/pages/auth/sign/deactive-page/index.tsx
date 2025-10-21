import { NextButton } from '@/components/atoms/Button';
import { Stack, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import MainHeader from './main-header';
import { UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';

const DeactivePage = () => {
	const theme = useTheme();
	const router = useRouter();

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	return (
		<Stack width={'100%'} height={'100%'}>
			<MainHeader />
			<Stack
				width={'100%'}
				height={'100%'}
				justifyContent={'center'}
				alignItems={'center'}
				bgcolor={theme?.palette?.infuuse?.gray100}
			>
				<Stack
					boxShadow={4}
					width={'500px'}
					height={'300px'}
					p={2}
					borderRadius={4}
					justifyContent={'center'}
					alignItems={'center'}
					bgcolor={theme?.palette?.common?.white}
					textAlign={'center'}
				>
					<Typography
						sx={{ mb: 4, color: theme?.palette?.infuuse?.blueDark500, fontWeight: 'bold', fontSize: '24px' }}
					>
						Your {CurrentUser?.user?.userType === UserType?.BusinessMember ? 'business' : 'agency'} has been
						deactivated
					</Typography>

					<NextButton sx={{ width: '200px' }} onClick={() => router?.push('/signin')}>
						Try Again
					</NextButton>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default DeactivePage;
