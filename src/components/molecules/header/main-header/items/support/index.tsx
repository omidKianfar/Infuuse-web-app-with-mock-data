import SupportIcon from '@/assets/support-icon';
import { IconBoxBadge } from '@/components/molecules/sidebars/first-sidebar/styles';
import { useConversationMessage_GetByConversationIdQuery, useSupportChat_GetListQuery } from '@/graphql/generated';
import { SubscriptionLayoutContext } from '@/providers/socialMessageProvider';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { SupportProps } from '../../type';

const SupportItem = ({
	refetchQueries,
	setMessagesUnSeenIds,
	supportHandler,
	SupportState,
	SupportChatData,
	userId,
}: Partial<SupportProps>) => {
	const theme = useTheme();

	const { lastMessageSubscription } = useContext(SubscriptionLayoutContext);


	const { data: conversationMessagesUnSeen } = useConversationMessage_GetByConversationIdQuery(
		{
			conversationId: Number(SupportChatData?.items?.[0]?.id),
			skip: 0,
			take: 100000,
			where: {
				isSeen: {
					eq: false,
				},
			},
		},
		{
			enabled: !!SupportChatData?.items?.[0]?.id,
		}
	);
	const conversationMessageDataUnSeen = conversationMessagesUnSeen?.conversationMessage_getByConversationId?.result;

	useEffect(() => {
		if (lastMessageSubscription) {
			refetchQueries?.();
		}
	}, [lastMessageSubscription]);

	useEffect(() => {
		if (conversationMessageDataUnSeen) {
			conversationMessageDataUnSeen.items?.map((message) => {
				setMessagesUnSeenIds?.((prevState) => [...prevState, message?.id]);
			});
		}
	}, [conversationMessageDataUnSeen]);

	const SupportConversationUnSeenListDataLenght = conversationMessageDataUnSeen?.items?.filter(
		(message) => Number(message?.conversationMember?.userId) !== Number(userId)
	).length;


	return (
		<>
			<Tooltip title="Support">
				<Box onClick={supportHandler} sx={{ cursor: 'pointer', ml: 2, position: 'relative' }}>
					{!SupportState && SupportConversationUnSeenListDataLenght ? (
						<IconBoxBadge>
							<Typography color={theme?.palette?.common?.white}>
								{SupportConversationUnSeenListDataLenght}
							</Typography>
						</IconBoxBadge>
					) : null}
					<SupportIcon
						fill={SupportState ? theme?.palette?.infuuse.orange300 : theme?.palette?.infuuse.gray500}
					/>
				</Box>
			</Tooltip>
		</>
	);
};

export default SupportItem;
