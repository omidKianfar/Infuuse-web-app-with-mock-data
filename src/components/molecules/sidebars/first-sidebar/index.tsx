import React, { useContext, useEffect } from 'react';
import { CustomSidebarLayout, Sidebar, UserActive } from './styles';
import Avatar from '@/components/atoms/avatar';

import UserSidebarIcon from './user';
import { Box, Stack, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { LineStatus, useConversation_GetUnseenMessagesByTypeQuery, UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import AdminSidebarIcon from './admin';
import { getFullImageUrl } from '@/utils';
import { queryClient } from 'pages/_app';
import { SubscriptionLayoutContext } from '@/providers/socialMessageProvider';

const FirstSidebar = () => {
	// -------------------------------tools
	const router = useRouter();
	const theme = useTheme();

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	return (
		<CustomSidebarLayout>
			<Sidebar direction={'column'} justifyContent={'start'} alignItems={'center'}>
				{/* -------------------------------user avatar */}
				<Stack justifyContent={'center'} alignItems={'center'} mb={4} position={'relative'}>
					<Box onClick={() => router?.push('/profile')} sx={{ cursor: 'pointer' }}>
						<Avatar src={getFullImageUrl(CurrentUser?.user?.photoUrl)} />
					</Box>
					<UserActive
						sx={{
							bgcolor:
								CurrentUser?.user?.lineStatus === LineStatus?.Active
									? theme?.palette?.infuuse.green100
									: theme?.palette?.infuuse?.orange200,
						}}
					/>
				</Stack>

				{/*-------------------------------user sidebar icons */}
				{CurrentUser?.user?.userType === UserType?.Administrator ? <AdminSidebarIcon CurrentUser={CurrentUser}/> : <UserSidebarIcon CurrentUser={CurrentUser} />}
			</Sidebar>
		</CustomSidebarLayout>
	);
};

export default FirstSidebar;
