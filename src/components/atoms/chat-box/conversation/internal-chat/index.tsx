import { Stack } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import SendMessageInternalChat from './send-message/send-message';

interface Props {
	conversationChat: any;
}

const ConversationInternalChat = ({ conversationChat }: Props) => {
	const endMessageRef = useRef<HTMLDivElement | null>(null);

	const scrollToBottom = () => {
		endMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [conversationChat]);


	return (
		<Stack
			px={2}
			width={'100%'}
			height={'100%'}
			maxHeight={'calc(100vh - 470px)'}
			overflow={'auto'}
			pb={'300px'}
			mt={1}
			p={2}
		>
			{conversationChat?.map((message: any, index: number) => (
				<Stack key={message.id}>
					<SendMessageInternalChat message={message} />
				</Stack>
			))}
			<div ref={endMessageRef} />
		</Stack>
	);
};

export default ConversationInternalChat;
