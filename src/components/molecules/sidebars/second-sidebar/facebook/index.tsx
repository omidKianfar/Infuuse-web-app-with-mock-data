import MessageCart from '@/components/pages/left-sidebar/message-card';
import { ConversationType, SortEnumType, TypeSocialNetwork, useConversation_GetListQuery } from '@/graphql/generated';
import userSubscriptionStore from '@/store/user-subscription.store';
import { queryKeyManager } from '@/utils/queryKeys';
import { Stack, styled } from '@mui/material';
import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';

const FacebookSidebar = () => {

	const { conversationIds } = useSnapshot(userSubscriptionStore);

	const variables = {
		skip: 0,
		take: 10000,
		where: {
			and: [{
				type: {
					eq: ConversationType?.SocialNetworkChat
				}
			}, {
				conversationMessages: {
					some: {
						typeSocialNetwork: {
							eq: TypeSocialNetwork?.Facebook,
						},
					},
				},
			}]
		},
		order: {
			lastMessage: {
				createdDate: SortEnumType?.Desc
			}
		},
	};

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
		<FacebookSidebarContainer>
			{ConversationData?.items?.map((conversation) => (
				<Stack key={conversation?.id}>
					<MessageCart conversation={conversation} />
				</Stack>
			))}
		</FacebookSidebarContainer>
	);
};

export default FacebookSidebar;

export const FacebookSidebarContainer = styled(Stack)({
	width: '100%',
	height: '100%',
	maxHeight: '80vh',
	overflowY: 'auto',
	paddingTop: '16px',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
});
