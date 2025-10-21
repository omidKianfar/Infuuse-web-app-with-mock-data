import AdminSupportMessageBox from '@/components/pages/left-sidebar/admin/support/support-message-box.tsx';
import { SortEnumType, useSupportChat_GetListQuery } from '@/graphql/generated';
import userSubscriptionStore from '@/store/user-subscription.store';
import { queryKeyManager } from '@/utils/queryKeys';
import { Stack, styled, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';

const AdminSupportSidebar = () => {

	//  -------------------------------tools
	const theme = useTheme();

	// -------------------------------query
	const { conversationIds } = useSnapshot(userSubscriptionStore);

	const variables = {
		skip: 0,
		take: 10000,
		order: {
			lastMessage: {
				createdDate: SortEnumType?.Desc
			}
		},
	}

	// get agency conversations
	const { data: supportChat } = useSupportChat_GetListQuery(variables);

	useEffect(() => {
		queryKeyManager.addKey('supportChatList', ['supportChat_getList', variables]);
	}, []);

	const SupportChatData = supportChat?.supportChat_getList?.result;

	useEffect(() => {
		const ConversationIds = [];
		if (SupportChatData) {
			SupportChatData?.items?.map((conversation) => {
				ConversationIds.push(conversation?.id);
			});
			userSubscriptionStore.conversationIds = ConversationIds;
		}
	}, [SupportChatData]);

	return (
		<AdminSupportSidebarContainer>
			{SupportChatData?.items?.map((conversation) => (
				<Stack key={conversation?.id}>
					{/* -------------------------------message box */}
					<AdminSupportMessageBox conversation={conversation} />
				</Stack>
			))}
		</AdminSupportSidebarContainer>
	);
};

export default AdminSupportSidebar;

//  -------------------------------style
export const AdminSupportSidebarContainer = styled(Stack)({
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
