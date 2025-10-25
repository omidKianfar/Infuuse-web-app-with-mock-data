import MessageCart from '@/components/pages/left-sidebar/message-card';
import { useConversationMessage } from '@/hooks/cache-conversations/use-conversation-message-cache';
import { Stack } from '@mui/material';
import React from 'react';
import { facebookVariables } from '../sidebar-variables';
import { SidebarContainer } from '../styles';

const FacebookSidebar = () => {
	const { conversations } = useConversationMessage(facebookVariables);

	return (
		<SidebarContainer>
			{conversations?.map((conversation) => (
				<Stack key={conversation?.id}>
					<MessageCart conversation={conversation} />
				</Stack>
			))}
		</SidebarContainer>
	);
};

export default FacebookSidebar;


