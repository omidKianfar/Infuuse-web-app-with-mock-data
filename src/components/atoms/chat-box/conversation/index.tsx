import { Stack } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import SendMessage from './send-message/send-message';

interface Props {
	conversationChat: any;
	userCanSendMessage?: boolean;
}

const Conversation = ({ conversationChat, userCanSendMessage }: Props) => {
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
			maxHeight={!userCanSendMessage ? '100vh' : 'calc(100vh - 470px)'}
			overflow={'auto'}
			pb={'300px'}
			mt={1}
			p={2}
			sx={{ scrollBehavior: 'smooth' }}
		>
			{conversationChat?.map((message: any, index: number) => (
				<Stack key={message.id}>
					<SendMessage message={message} />
				</Stack>
			))}
			<div ref={endMessageRef} />
		</Stack>
	);
};

export default Conversation;
