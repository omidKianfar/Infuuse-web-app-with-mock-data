import { Stack } from '@mui/material';
import React from 'react';
import { Conversation,  } from '@/graphql/generated';

import MessageCart from '../../../message-card';
import { useConversationMessage } from '@/hooks/cache-conversations/use-conversation-message-cache';
import { whatsappVariables } from '@/components/molecules/sidebars/second-sidebar/sidebar-variables';
import { AllChannelContainer } from '@/components/molecules/sidebars/second-sidebar/styles';

const AllChannelTab = () => {
		const { conversations } = useConversationMessage(whatsappVariables);
	

	return (
		<AllChannelContainer>
			{conversations?.map(conversation => (
				<Stack key={conversation?.id}>
					<MessageCart conversation={conversation as Conversation} />
				</Stack>
			))}
		</AllChannelContainer>
	);
};

export default AllChannelTab


