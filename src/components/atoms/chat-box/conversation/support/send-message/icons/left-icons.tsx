import { useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { Box, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import SupportIcon from '@/assets/support-icon';

interface Props {
	message: any;
}

const LeftIcons = ({ message }: Props) => {
	const theme = useTheme();
	const router = useRouter();


	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUserId = User?.user_getCurrentUser?.result?.user?.id

	return (
		<>
			{router.pathname.includes('/internal-chat') && Number(CurrentUserId) !== Number(message?.conversationMember?.userId) ? (
				<Box mr={1}>
					<SupportIcon fill={theme?.palette?.infuuse?.orange200} />
				</Box>
			) : null}
		</>
	);
};

export default LeftIcons;
