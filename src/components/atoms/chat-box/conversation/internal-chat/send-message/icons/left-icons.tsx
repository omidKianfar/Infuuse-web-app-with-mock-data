
import InternalChatIcon from '@/assets/internal-chat-icon';
import { useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { Box, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

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
			{router.pathname.includes('/internal-chat') && Number(CurrentUserId) !== Number(message?.conversationMember?.user?.id) ? (
				<Box mr={1}>
					<InternalChatIcon fill={theme?.palette?.infuuse?.porple200} />
				</Box>
			) : null}
		</>
	);
};

export default LeftIcons;
