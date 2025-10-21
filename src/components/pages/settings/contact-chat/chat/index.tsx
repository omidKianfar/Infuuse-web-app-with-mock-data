import React, { useState } from 'react';
import { ChatPage } from './styles';
import Header from './header/header';
import Conversation from './conversation';
import Footer from './footer';
import { Stack, useTheme } from '@mui/material';
import { ConversationMessageByContactDocument, ConversationMessageByContactSubscription } from '@/graphql/generated';
import { subscribe } from '@/utils/subscription';
import { useSnapshot } from 'valtio';
import settingLiveChatStore from '@/store/setting-live-chat.store';

const Contact_Chat = () => {
	// -------------------------------tools
	const theme = useTheme();

	// -------------------------------state
	const [conversationChat, setConversationChat] = useState([]);

	// -------------------------------state management
	const { contactId } = useSnapshot(settingLiveChatStore);

	// ------------------------------conversation message
	React.useEffect(() => {
		if (typeof contactId === null) return;
		const unSubscribe = subscribe(
			ConversationMessageByContactDocument,
			{ contactId },
			subscriptionUnSendMessageListener
		);

		return () => {
			if (typeof unSubscribe !== 'function') return;

			unSubscribe();
		};
	}, [contactId]);

	function subscriptionUnSendMessageListener(event) {
		const data = JSON.parse(event?.data);

		if (data?.type === 'ka') return;

		const payload: ConversationMessageByContactSubscription = data?.payload?.data;

		if (typeof payload === 'undefined') return;

		setConversationChat((prevState) => [...prevState, payload.conversationMessageByContact]);
	}

	return (
		<ChatPage>
			{/* -------------------------------header section */}
			<Header />
			<Stack
				width={'100%'}
				height={'100%'}
				position={'relative'}
				bgcolor={theme?.palette?.infuuse?.gray200}
				borderRadius={2}
				mt={1}
				maxHeight={'90vh'}
				overflow={'auto'}
			>
				{/* -------------------------------main section */}
				<Conversation conversationChat={conversationChat} />

				{/* -------------------------------footer section */}
				<Footer />
			</Stack>
		</ChatPage>
	);
};

export default Contact_Chat;
