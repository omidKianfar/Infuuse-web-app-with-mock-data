import { Stack } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import SendMessageSupport from './send-message/send-message';
import { TypeSocialNetwork } from '@/graphql/generated';
import RateMessageSupport from '@/components/molecules/header/main-header/items/support/support/step1/message/rate';

interface Props {
	conversationChat: any;
}

const ConversationSupport = ({ conversationChat }: Props) => {


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
			maxHeight={'calc(100vh - 270px)'}
			overflow={'auto'}
			pb={'300px'}
			mt={1}
			p={2}
		>


			{conversationChat?.map((message: any) => (
				<Stack key={message.id}>

					{message?.typeSocialNetwork === TypeSocialNetwork?.SupportChatSurvey
						? <RateMessageSupport message={message} />
						: <SendMessageSupport message={message} />
					}
				</Stack>
			))}



			<div ref={endMessageRef} />
		</Stack>
	);
};

export default ConversationSupport;
