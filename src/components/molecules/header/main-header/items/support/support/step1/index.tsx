import { Stack, useTheme } from '@mui/material';
import React from 'react';
import Header from './header';
import MessageSupport from './message';
import Footer from './footer';
import { ConversationMessageCollectionSegment, SortEnumType, useConversationMessage_GetByConversationIdQuery } from '@/graphql/generated';
import { SupportProps } from '../../../../type';

const Step1 = ({ setCounter, supportHandler, SupportChatData, userId }: Partial<SupportProps>) => {
	const theme = useTheme();

	const SupportChatDataItem = Array.isArray(SupportChatData?.items) && (SupportChatData?.items?.[0]?.id ?? 0)

	const { data: conversationLastMessage } = useConversationMessage_GetByConversationIdQuery({
		conversationId: Number(SupportChatData?.items?.[0]?.id ?? 0),
		skip: 0,
		take: 1,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	}, { enabled: !!SupportChatDataItem });

	const conversationLastMessageData = conversationLastMessage?.conversationMessage_getByConversationId?.result;

	return (
		<Stack
			position={'absolute'}
			top={'70px'}
			right={'32px'}
			height={'100%'}
			maxHeight={'500px'}
			overflow={'auto'}
			width={'400px'}
			bgcolor={theme?.palette?.common?.white}
			borderRadius={4}
			zIndex={10000}
			boxShadow={4}
			sax={{
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				scrollbarWidth: 'none',
				scrollbarColor: 'transparent transparent',
			}}
		>
			<Stack position={'relative'} width={'100%'} height={'100%'}>
				<Header setCounter={setCounter} supportHandler={supportHandler} conversationLastMessageData={conversationLastMessageData as ConversationMessageCollectionSegment} />

				<Stack mt={2} height={'100%'} maxHeight={'340px'} overflow={'auto'} sx={{
					'&::-webkit-scrollbar': {
						display: 'none',
					},
					scrollbarWidth: 'none',
					scrollbarColor: 'transparent transparent',
				}}>
					<MessageSupport SupportChatData={SupportChatData} userId={userId} />
				</Stack>
				<Footer />
			</Stack>
		</Stack>
	);
};

export default Step1;
