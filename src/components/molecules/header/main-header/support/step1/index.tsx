import { Stack, useTheme } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import Header from './header';
import MessageSupport from './message';
import Footer from './footer';
import { ConversationCollectionSegment, SortEnumType, useConversationMessage_GetByConversationIdQuery } from '@/graphql/generated';


interface Props {
	setCounter: Dispatch<SetStateAction<number>>;
	supportHandler: React.Dispatch<React.SetStateAction<boolean>>;
	SupportChatData: ConversationCollectionSegment;
	userId: number;
}

const Step1 = ({ setCounter, supportHandler, SupportChatData, userId }: Props) => {
	const theme = useTheme();

	// -------------------------------query
	// get last message
	const { data: conversationLastMessage } = useConversationMessage_GetByConversationIdQuery({
		conversationId: Number(SupportChatData?.items[0]?.id),
		skip: 0,
		take: 1,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	}, { enabled: !!SupportChatData?.items[0]?.id });

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
				<Header setCounter={setCounter} supportHandler={supportHandler} conversationLastMessageData={conversationLastMessageData} />

				<Stack mt={2} height={'100%'} maxHeight={'340px'} overflow={'auto'} sx={{
					'&::-webkit-scrollbar': {
						display: 'none',
					},
					scrollbarWidth: 'none',
					scrollbarColor: 'transparent transparent',
				}}>
					<MessageSupport chatData={SupportChatData} CurrentUserId={userId} />
				</Stack>
				<Footer chatId={SupportChatData?.items[0]?.id} />
			</Stack>
		</Stack>
	);
};

export default Step1;
