import { Stack, styled } from '@mui/material';
import React, { useEffect } from 'react';
import { ConversationType, SortEnumType, useConversation_GetListQuery } from '@/graphql/generated';
import userSubscriptionStore from '@/store/user-subscription.store';
import { useSnapshot } from 'valtio';
import { queryKeyManager } from '@/utils/queryKeys';
import { mockConversations } from '../../../mock-data';
import MessageCart from '../../../message-card';

const AllChannelTab = () => {
	// -------------------------------query

	const { conversationIds } = useSnapshot(userSubscriptionStore);

	// const variables = {
	// 	skip: 0,
	// 	take: 10000,
	// 	where: {
	// 		type: {
	// 			eq: ConversationType?.SocialNetworkChat
	// 		}
	// 	},
	// 	order: {
	// 		lastMessage: {
	// 			createdDate: SortEnumType?.Desc
	// 		}
	// 	},
	// };
	// // get agency conversations
	// const { data: Conversation } = useConversation_GetListQuery(variables);

	// useEffect(() => {
	// 	queryKeyManager.addKey('conversationList', ['conversation_getList', variables]);
	// }, []);

	// const ConversationData = Conversation?.conversation_getList?.result;
	const ConversationData = mockConversations;

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
			
				{ConversationData?.map((conversation) => (
					<Stack key={conversation?.id}>
						<MessageCart conversation={conversation} />
					</Stack>
				))}
			</>
		</AllChannelContainer>
	);
};

export default AllChannelTab;

// -------------------------------style

const AllChannelContainer = styled(Stack)({
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
