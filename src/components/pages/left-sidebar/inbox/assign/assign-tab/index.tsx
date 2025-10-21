import { Stack, styled } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import AssignMessageBox from './assign-message-box';
import { useSnapshot } from 'valtio';
import userSubscriptionStore from '@/store/user-subscription.store';
import { ConversationType, SortEnumType, useConversation_GetListQuery } from '@/graphql/generated';
import { queryKeyManager } from '@/utils/queryKeys';
import MessageCart from '../../../message-card';

const AssignTab = () => {
	// -------------------------------query

	const { conversationIds } = useSnapshot(userSubscriptionStore);

	const variables = {
		skip: 0,
		take: 10000,
		where: {
			type: {
				eq: ConversationType?.SocialNetworkChat
			}
		},
		order: {
			lastMessage: {
				createdDate: SortEnumType?.Desc
			}
		},
	};
	// get agency conversations
	const { data: Conversation } = useConversation_GetListQuery(variables);

	useEffect(() => {
		queryKeyManager.addKey('conversationList', ['conversation_getList', variables]);
	}, []);

	const ConversationData = Conversation?.conversation_getList?.result;

	useEffect(() => {
		const ConversationIds = [];
		if (ConversationData) {
			ConversationData?.items?.map((conversation) => {
				ConversationIds.push(conversation?.id);
			});
			userSubscriptionStore.conversationIds = ConversationIds;
		}
	}, [ConversationData]);
	return (
		<AllChannelContainer>
			<>
				{ConversationData?.items?.filter((conversation) => conversation?.conversationMembers?.length > 1)?.map((conversation) => (
					<Stack key={conversation?.id}>
						<MessageCart conversation={conversation} />
					</Stack>
				))}
			</>
		</AllChannelContainer>
	);
};

export default AssignTab;

export const AllChannelContainer = styled(Stack)({
	width: '100%',
	height: '100%',
	maxHeight: '70vh',
	overflowY: 'auto',
	paddingTop: '16px',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
});
