import InternalChatIcon from '@/assets/internal-chat-icon';
import { IconBoxBadge } from '@/components/molecules/sidebars/first-sidebar/styles';
import { ConversationType, useConversation_GetListQuery } from '@/graphql/generated';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { InternalChatProps } from '../../type';
import { useRouter } from 'next/router';

const InternalChatItem = ({ internalCHatHandler, userId }: Partial<InternalChatProps>) => {
	const router = useRouter();
	const theme = useTheme();

	const { data: ConversationsUnSeenList } = useConversation_GetListQuery({
		take: 10000,
		skip: 0,
		where: {
			and: [
				{
					lastMessage: {
						conversationMember: {
							userId: {
								neq: Number(userId),
							},
						},
					},
				},
				{
					type: {
						eq: ConversationType?.InternalChat,
					},
				},
			],
		},
	});

	const ConversationsUnSeenListData = ConversationsUnSeenList?.conversation_getList?.result;

	const InternalChatConversationUnSeenListDataLenght = ConversationsUnSeenListData?.items?.reduce(
		(total, conversation) => total + (conversation?.numberOfUnreadMessages ?? 0),
		0
	);

	return (
		<>
			<Tooltip title="Internal Chat">
				<Box onClick={internalCHatHandler} sx={{ cursor: 'pointer', ml: 2, position: 'relative' }}>
					{InternalChatConversationUnSeenListDataLenght &&
						InternalChatConversationUnSeenListDataLenght >= 1 ? (
						<IconBoxBadge>
							<Typography color={theme?.palette?.common?.white}>
								{InternalChatConversationUnSeenListDataLenght}
							</Typography>
						</IconBoxBadge>
					) : null}

					<InternalChatIcon
						fill={
							router?.pathname.includes('/internal-chat')
								? theme?.palette?.infuuse.porple200
								: theme?.palette?.infuuse.gray500
						}
					/>
				</Box>
			</Tooltip>
		</>
	);
};

export default InternalChatItem;
