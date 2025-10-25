import MessageCart from '@/components/pages/left-sidebar/message-card';
import { Conversation } from '@/graphql/generated';
import { Stack } from '@mui/material';
import React from 'react';

import { SidebarContainer } from '../styles';
import { useConversationMessage } from '@/hooks/cache-conversations/use-conversation-message-cache';
import { liveChatVariables } from '../sidebar-variables';

const LiveChatSidebar = () => {
	const { conversations } = useConversationMessage(liveChatVariables);

	return (
		<SidebarContainer>
			{conversations?.map((conversation) => (
				<Stack key={conversation?.id}>
					<MessageCart conversation={conversation as Conversation} />
				</Stack>
			))}
		</SidebarContainer>
	);
};

export default LiveChatSidebar;
