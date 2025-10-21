'use client';
import SendMessage from '@/components/atoms/chat-box/conversation/send-message/send-message';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react';

interface Props {
	conversationChat: never[];
}

const Conversation = ({ conversationChat }: Props) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

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
			maxHeight={isMobile ? 'calc(100% - 380px)' : 'calc(100% - 250px)'}
			overflow={'auto'}
			mt={1}
			p={2}
		>
			{conversationChat?.map((message, index) => (
				<Stack key={index}>
					<SendMessage message={message} />
				</Stack>
			))}
			<div ref={endMessageRef} />
		</Stack>
	);
};

export default Conversation;
