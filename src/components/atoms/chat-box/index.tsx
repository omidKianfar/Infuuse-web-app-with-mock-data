import React, { useContext, useEffect, useState } from 'react';
import { ChatPage } from './styles';
import Conversation from './conversation';
import Footer from './footer';
import Header from './header/header';
import { useConversationMessage_GetByConversationIdQuery, useConversationMessage_SetSeenStatusMutation, UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { useRouter } from 'next/router';
import { SubscriptionLayoutContext } from '@/providers/socialMessageProvider';
import { responseDestructure } from '@/utils';
import { queryClient } from 'pages/_app';
import ConversationInternalChat from './conversation/internal-chat';
import ConversationSupport from './conversation/support';

const ChatBox = () => {
	// --------------------------------tools
	const router = useRouter();

	// current conversation id
	const ConversationId = router?.query?.conversationId;

	// --------------------------------context
	const { ConversationLastMessageData, lastMessageSubscription } = useContext(SubscriptionLayoutContext);

	// --------------------------------states
	// unread message
	const [MessagesUnSeenIds, setMessagesUnSeenIds] = useState([]);

	// --------------------------------function
	useEffect(() => {
		if (lastMessageSubscription) {
			refetchQueries()
		}
	}, [lastMessageSubscription])

	// --------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// seen message query
	const { mutate: seenMessages } = useConversationMessage_SetSeenStatusMutation()

	// get unseen message
	const { data: conversationMessagesUnSeen } = useConversationMessage_GetByConversationIdQuery({
		conversationId: Number(ConversationId),
		skip: 0,
		take: 100000,
		where: {
			isSeen: {
				eq: false
			}
		}
	}, { enabled: !!ConversationId });

	const conversationMessageDataUnSeen = conversationMessagesUnSeen?.conversationMessage_getByConversationId?.result;

	// --------------------------------functions
	useEffect(() => {
		if (conversationMessageDataUnSeen) {
			conversationMessageDataUnSeen.items?.map((message) => {
				setMessagesUnSeenIds((prevState) => ([...prevState, message?.id]))
			})
		}
	}, [conversationMessageDataUnSeen]);

	// all message seen
	useEffect(() => {
		if (MessagesUnSeenIds) {
			SeenMessageHandler()
		}
	}, [MessagesUnSeenIds])


	const SeenMessageHandler = () => {
		seenMessages(
			{
				ints: MessagesUnSeenIds,
			},
			{
				onSuccess: async (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						await setMessagesUnSeenIds([])
						await refetchQueries()
					}
				}
			},

		);

	}

	// refetch queries
	const refetchQueries = async () => {
		await queryClient.invalidateQueries(['conversation_getList'])
		await queryClient.invalidateQueries(['supportChat_getList'])
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	}

	// accsess operator
	const userCanSendMessage = CurrentUser?.isBusinessOwner ||
		CurrentUser?.user?.userType === UserType?.AgencyMember ||
		(CurrentUser?.user?.userType === UserType?.BusinessMember &&
			CurrentUser?.businessAccesses?.[0]?.access?.isOpratorAccess)

	return (
		<ChatPage>
			{/* --------------------------------header section */}
			{CurrentUser?.user?.userType === UserType?.Administrator || router?.pathname.includes('/internal-chat') ? null : <Header />}

			{/* --------------------------------main section */}

			{router?.pathname.includes('/call') ? (
				<Conversation conversationChat={ConversationLastMessageData} userCanSendMessage={userCanSendMessage} />
			) : router?.pathname.includes('/internal-chat') ? (
				<ConversationInternalChat conversationChat={ConversationLastMessageData} />
			) : router?.pathname.includes('/admin/support') ? (
				<ConversationSupport conversationChat={ConversationLastMessageData} />
			) : (
				<Conversation conversationChat={ConversationLastMessageData} userCanSendMessage={userCanSendMessage} />
			)}

			{/* --------------------------------footer section */}
			{router?.pathname.includes('/internal-chat') || router?.pathname.includes('/admin/support') ? <Footer lastMessageSubscription={lastMessageSubscription} /> : userCanSendMessage ? (<Footer lastMessageSubscription={lastMessageSubscription} />) : null}
		</ChatPage>
	);
};

export default ChatBox;
