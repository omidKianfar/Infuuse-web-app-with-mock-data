import {  Stack, Typography, useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import SendMessageCall from './send-message/send-message';
import dayjs from 'dayjs';

interface Props {
	conversationChat: any;
}

const ConversationCall = ({ conversationChat }: Props) => {
	const theme = useTheme();
	const endMessageRef = useRef<HTMLDivElement | null>(null);

	const scrollToBottom = () => {
		endMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [conversationChat]);

	return (
		<Stack px={2} width={'100%'} height={'100%'} maxHeight={'100vh'} overflow={'auto'} pb={'300px'} mt={1} p={2}>
			{conversationChat?.map((message: any, index: number) => (
				<Stack key={message.id} mb={4}>
					<Stack justifyContent={'center'} alignItems={'center'} mb={2}>
						<Typography>
							{message?.conversation?.contact?.fullName} called you at{' '}
							{dayjs(message?.createdDate).format('hh:mm A')},{' '}
							{dayjs(message?.createdDate).format('MM/DD/YYYY')}
						</Typography>
					</Stack>

					<SendMessageCall message={message} />
				</Stack>
			))}
			<div ref={endMessageRef} />
		</Stack>
	);
};

export default ConversationCall;
