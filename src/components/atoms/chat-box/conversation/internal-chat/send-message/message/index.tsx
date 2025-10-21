import { ConversationMessage } from '@/graphql/generated';
import { Stack, useTheme } from '@mui/material';
import React from 'react';
import FromAllMessage from '../../../send-message/message/all';

interface Props {
	message: ConversationMessage;
}

const Message = ({ message }: Props) => {
	// -------------------------------tools
	const theme = useTheme();

	return (
		<Stack>
			<FromAllMessage message={message} />
		</Stack>
	);
};

export default Message;
