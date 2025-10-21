import React, { useEffect, useRef } from 'react';
import SendMessageSupport from './send';
import { ConversationCollectionSegment, ConversationMessage, Maybe, TypeSocialNetwork } from '@/graphql/generated';
import { Stack } from '@mui/material';
import RateMessageSupport from './rate';

interface Props {
	chatData: ConversationCollectionSegment
	CurrentUserId: number
}

const MessageSupport = ({ chatData, CurrentUserId }: Props) => {

	const endMessageRef = useRef<HTMLDivElement | null>(null);

	const scrollToBottom = () => {
		endMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [chatData]);

	return (
		<>
			{chatData && chatData?.items[0]?.conversationMessages?.map((message) => (
				<Stack key={message?.id}>
					{message?.typeSocialNetwork === TypeSocialNetwork?.SupportChatSurvey
						? <RateMessageSupport message={message}/>
						: <SendMessageSupport message={message} CurrentUserId={CurrentUserId} />
					}


				</Stack>
			))}
			<div ref={endMessageRef} />

		</>



	);
};

export default MessageSupport;
