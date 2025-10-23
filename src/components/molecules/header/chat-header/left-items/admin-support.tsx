import Avatar from '@/components/atoms/avatar';
import { getFullImageUrl } from '@/utils';
import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Props } from '../types';
import { useUser_GetCurrentUserQuery } from '@/graphql/generated';

const AdminSupportChatHeader = ({ conversationData }: Partial<Props>) => {
	const theme = useTheme();

	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	const firstConversation = conversationData?.items?.[0]?.conversation;

	const otherMember = firstConversation?.conversationMembers?.find(
		(member) => member?.userId !== CurrentUser?.user?.id
	)?.user;

	const Email = otherMember?.email || 'Unknown';
	const FullName = otherMember?.fullName || otherMember?.email || 'Unknown';
	const Photo = otherMember?.photoUrl || 'Unknown';

	return (
		<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} p={1} height={'100%'}>
			<Avatar src={getFullImageUrl(Photo)} width={'60px'} height={'60px'} />

			<Stack>
				<Typography
					fontSize={'16px'}
					color={theme?.palette?.infuuse?.blue500}
					fontWeight={'bold'}
					ml={2}
					mb={1}
					mt={1}
				>
					{FullName ? FullName : Email}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default AdminSupportChatHeader;
