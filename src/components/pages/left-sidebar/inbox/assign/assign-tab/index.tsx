import { Stack, styled } from '@mui/material';
import React from 'react';
import MessageCart from '../../../message-card';
import { useConversationMessage } from '@/hooks/cache-conversations/use-conversation-message-cache';
import { whatsappVariables } from '@/components/molecules/sidebars/second-sidebar/sidebar-variables';
import { AllChannelContainer } from '@/components/molecules/sidebars/second-sidebar/styles';

const AssignTab = () => {
			const { conversations } = useConversationMessage(whatsappVariables);
	
	return (
		<AllChannelContainer>
			<>
				{conversations?.filter((conversation) => (conversation?.conversationMembers?.length || 0) > 1)?.map((conversation) => (
					<Stack key={conversation?.id}>
						<MessageCart conversation={conversation} />
					</Stack>
				))}
			</>
		</AllChannelContainer>
	);
};

export default AssignTab;


