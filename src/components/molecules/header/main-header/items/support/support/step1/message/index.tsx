import React, { Suspense, useEffect, useRef } from 'react';
import SendMessageSupport from './send';
import { TypeSocialNetwork } from '@/graphql/generated';
import { Stack } from '@mui/material';
import RateMessageSupport from './rate';
import { SupportProps } from '@/components/molecules/header/main-header/type';
import LoadingProgress from '@/components/atoms/ProgressBar/CircularProgress';



const MessageSupport = ({ SupportChatData, userId }: Partial<SupportProps>) => {

	const endMessageRef = useRef<HTMLDivElement | null>(null);

	const scrollToBottom = () => {
		endMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [SupportChatData]);


	return (
		<Suspense fallback={<LoadingProgress />}>
			{SupportChatData?.items?.[0]?.conversationMessages?.map((message) => (
				<Stack key={message?.id}>
					{message?.typeSocialNetwork === TypeSocialNetwork?.SupportChatSurvey
						? <RateMessageSupport message={message} />
						: <SendMessageSupport message={message} userId={userId as number} />
					}


				</Stack>
			))}
			<div ref={endMessageRef} />

		</Suspense>



	);
};

export default MessageSupport;
