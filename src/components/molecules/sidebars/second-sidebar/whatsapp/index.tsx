import MessageCart from '@/components/pages/left-sidebar/message-card';
import { useConversationMessage } from '@/hooks/cache-conversations/use-conversation-message-cache';
import { Stack, styled } from '@mui/material';
import React from 'react';
import {  whatsappVariables } from '../sidebar-variables';
import { SidebarContainer } from '../styles';

const WhatsappSidebar = () => {
	const { conversations } = useConversationMessage(whatsappVariables);

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

export default WhatsappSidebar;


