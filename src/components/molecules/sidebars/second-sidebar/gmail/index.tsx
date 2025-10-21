import MessageCart from '@/components/pages/left-sidebar/message-card';
import { ConversationType, SortEnumType, TypeSocialNetwork, useConversation_GetListQuery } from '@/graphql/generated';
import userSubscriptionStore from '@/store/user-subscription.store';
import { queryKeyManager } from '@/utils/queryKeys';
import { Stack, styled } from '@mui/material';
import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';

const GmailSidebar = () => {
	// -------------------------------query

	const { conversationIds } = useSnapshot(userSubscriptionStore);

	const variables = {
		skip: 0,
		take: 10000,
		where: {
			and: [
				{
					type: {
						eq: ConversationType?.SocialNetworkChat
					}
				},
				{
					conversationMessages: {
						some: {
							typeSocialNetwork: {
								eq: TypeSocialNetwork?.Email,
							},
						},
					}
				}]

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
		<GmailSidebarContainer>
			{ConversationData?.items?.map((conversation) => (
				<Stack key={conversation?.id}>
					{/* -------------------------------message box */}
					<MessageCart conversation={conversation} />
				</Stack>
			))}
		</GmailSidebarContainer>
	);
};

export default GmailSidebar;

//  -------------------------------style
export const GmailSidebarContainer = styled(Stack)({
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
