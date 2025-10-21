import {
	ConversationMessage,
	ConversationMessageDocument,
	ConversationMessageSubscription,
	ConversationType,
	TypeSocialNetwork,
	useConversationMessage_GetByConversationIdQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import chatFilterMessage from '@/store/chat-filter-message';
import userSubscriptionStore from '@/store/user-subscription.store';
import { queryKeyManager } from '@/utils/queryKeys';
import { subscribe } from '@/utils/subscription';
import { QueryKey } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { queryClient } from 'pages/_app';
import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useSnapshot } from 'valtio';
// import { useChatContext } from './chat-provider';

type SubscriptionLayoutType = {
	ConversationLastMessageData: ConversationMessage;
	lastMessageSubscription: ConversationMessage;
};

export const SubscriptionLayoutContext = createContext({} as SubscriptionLayoutType);

export default function SocialMessageProvider({ children }: PropsWithChildren) {
	// ------------------------------tools
	const router = useRouter();

	// -------------------------------------- chat context
	// const { handleAddCall } = useChatContext();

	// -----------------------------------------------------------------------------query
	// -------current user
	const { data: user } = useUser_GetCurrentUserQuery();

	// ---------------------------------------------------------------------------address bar router data
	const ConversationId = router?.query?.conversationId;
	const userId = user?.user_getCurrentUser?.result?.user?.id;

	// --------------------------------------------------------------------------state managment
	// exist conversation Ids
	const { conversationIds } = useSnapshot(userSubscriptionStore);

	// --------------------------------------------------------------------------sattes
	const [lastMessageSubscription, setLastMessageSubscription] = useState<ConversationMessageSubscription | null>(
		null
	);

	// --------------------------------------------------------------------------types
	const { keys } = useSnapshot(queryKeyManager);
	const { filter } = useSnapshot(chatFilterMessage);

	// --------------------------------------------------------------------------query data
	const variables = {
		conversationId: Number(ConversationId),
		skip: 0,
		take: 10000,
		// ------------ inbox
		...(Boolean(filter !== 'All Message') && {
			where: {
				typeSocialNetwork: {
					eq: filter,
				},
			},
		}),

		// ------------ call
		...(Boolean(router?.pathname?.includes('/call')) && {
			where: {
				typeSocialNetwork: {
					eq: TypeSocialNetwork?.TwilioVoiceCall,
				},
			},
		}),

		// ------------- facebook
		...(Boolean(router?.pathname?.includes('/facebook')) && {
			where: {
				typeSocialNetwork: {
					eq: TypeSocialNetwork?.Facebook,
				},
			},
		}),

		// -------------- instagram
		...(Boolean(router?.pathname?.includes('/instagram')) && {
			where: {
				typeSocialNetwork: {
					eq: TypeSocialNetwork?.Instagram,
				},
			},
		}),

		// ------------- whatsapp
		...(Boolean(router?.pathname?.includes('/whatsapp')) && {
			where: {
				typeSocialNetwork: {
					eq: TypeSocialNetwork?.WhatsApp,
				},
			},
		}),

		// -------------- gmail
		...(Boolean(router?.pathname?.includes('/gmail')) && {
			where: {
				typeSocialNetwork: {
					eq: TypeSocialNetwork?.Email,
				},
			},
		}),

		// -------------- message
		...(Boolean(router?.pathname?.includes('/message')) && {
			where: {
				or: [
					{
						typeSocialNetwork: {
							eq: TypeSocialNetwork?.Sms,
						},
					},
					{
						typeSocialNetwork: {
							eq: TypeSocialNetwork?.Mms,
						},
					},
				],
			},
		}),

		// ------------- live-chat
		...(Boolean(router?.pathname?.includes('/live-chat')) && {
			where: {
				typeSocialNetwork: {
					eq: TypeSocialNetwork?.LiveChat,
				},
			},
		}),
	};



	// ------------------------------------------------------------------query key
	const queryKey = ['conversationMessage_getByConversationId', variables];

	const conversationListKey: QueryKey = keys['conversationList'] as QueryKey;
	const supportConversationListKey: QueryKey = keys['supportChatList'] as QueryKey;

	// ------------------------------------------------------------------query
	// --------get conversation last message
	const { data: ConversationLastMessage } = useConversationMessage_GetByConversationIdQuery(variables, {
		enabled: !!user 
	});

	const ConversationLastMessageData = ConversationLastMessage?.conversationMessage_getByConversationId?.result?.items;

	// --------------conversation subscription
	React.useEffect(() => {
		if (typeof userId === null) return;
		const unSubscribe = subscribe(
			ConversationMessageDocument,
			{ userId },
			subscriptionUnSendMessageListener,
			user?.user_getCurrentUser?.result?.user?.externalId as string
		);

		return () => {
			if (typeof unSubscribe !== 'function') return;

			unSubscribe();
		};
	}, [userId, ConversationId, conversationIds]);

	// --------conversation subscription update message after new message contact
	function updateMessage(newMessage: any) {
		queryClient.refetchQueries(conversationListKey);

		queryClient.setQueryData(queryKey, (oldData: any) => {
			const oldItems = oldData?.conversationMessage_getByConversationId?.result?.items || [];
			const targetItem = oldItems.find((item) => item.conversation.id === newMessage.conversationId);
			let newItems = [...oldItems, newMessage];

			if (!targetItem) {
				newItems = [...oldItems];
			}

			const updatedData = {
				...oldData,
				conversationMessage_getByConversationId: {
					...oldData?.conversationMessage_getByConversationId,
					result: {
						...oldData?.conversationMessage_getByConversationId?.result,
						items: newItems,
					},
				},
			};

			return updatedData;
		});

		// ------------------------------------------------------------------conversation list
		queryClient.setQueryData(conversationListKey, (oldData: any) => {
			const oldItems = oldData?.conversation_getList?.result?.items || [];

			const newItems = oldItems.filter(Boolean).map((item: any) => {
				if (item?.id === newMessage.conversationId) {
					return {
						...item,

						conversationMessages: [
							{
								id: newMessage.id,
								message: newMessage.message,
							},
						],
					};
				}
				return item;
			});

			const updatedData = {
				...oldData,
				conversation_getList: {
					...oldData?.conversation_getList,
					result: {
						...oldData?.conversation_getList?.result,
						items: [...newItems],
					},
				},
			};

			return updatedData;
		});


	}

	// ------------------------------------------------------------------conversation subscription update message
	function updateChannel(newItem: any) {
		queryClient.setQueryData(conversationListKey, (oldData: any) => {
			const oldItems = oldData?.conversation_getList?.result?.items || [];

			return {
				...oldData,
				conversation_getList: {
					...oldData.conversation_getList,
					result: {
						...oldData.conversation_getList?.result,
						items: [newItem, ...oldItems],
					},
				},
			};
		});

	}

	// --------support conversation subscription update message after new message contact
	function supportUpdateMessage(newMessage: any) {
		queryClient.refetchQueries(supportConversationListKey);

		queryClient.setQueryData(queryKey, (oldData: any) => {
			const oldItems = oldData?.conversationMessage_getByConversationId?.result?.items || [];
			const targetItem = oldItems.find((item) => item.conversation.id === newMessage.conversationId);
			let newItems = [...oldItems, newMessage];

			if (!targetItem) {
				newItems = [...oldItems];
			}

			const updatedData = {
				...oldData,
				conversationMessage_getByConversationId: {
					...oldData?.conversationMessage_getByConversationId,
					result: {
						...oldData?.conversationMessage_getByConversationId?.result,
						items: newItems,
					},
				},
			};

			return updatedData;
		});

		// ------------------------------------------------------------------conversation list
		queryClient.setQueryData(supportConversationListKey, (oldData: any) => {
			const oldItems = oldData?.supportChat_getList?.result?.items || [];

			const newItems = oldItems.filter(Boolean).map((item: any) => {
				if (item?.id === newMessage.conversationId) {
					return {
						...item,

						conversationMessages: [
							{
								id: newMessage.id,
								message: newMessage.message,
							},
						],
					};
				}
				return item;
			});


			const updatedData = {
				...oldData,
				supportChat_getList: {
					...oldData?.supportChat_getList,
					result: {
						...oldData?.supportChat_getList?.result,
						items: [...newItems],
					},
				},
			};

			return updatedData;
		});

	}


	// ------------------------------------------------------------------conversation subscription update message
	function supportUpdateChannel(newItem: any) {
		// ------------------------------------------------------------------support conversation subscription update message
		queryClient.setQueryData(supportConversationListKey, (oldData: any) => {
			const oldItems = oldData?.supportChat_getList?.result?.items || [];
			console.log('support oldItems', oldItems);

			return {
				...oldData,
				supportChat_getList: {
					...oldData.supportChat_getList,
					result: {
						...oldData.supportChat_getList?.result,
						items: [newItem, ...oldItems],
					},
				},
			};
		});
	}

	// ------------------------------------------------------------------subscription listener
	function subscriptionUnSendMessageListener(event) {
		const data = JSON.parse(event.data);
		queryClient.invalidateQueries(['user_getCurrentUser']);

		if (data.type === 'ka') return;

		// ----------------------------------payload or subscription message data
		const payload: ConversationMessageSubscription = data?.payload?.data;
		if (typeof payload === 'undefined') return;
		console.log('payload', payload);

		// ----------------------------------chat message
		// ------------last message
		setLastMessageSubscription(payload);

		// ------------exist conversations ids
		const isExistConversationId = conversationIds?.includes(payload.conversationMessage?.conversationId);

		if (payload?.conversationMessage?.conversation?.type === ConversationType?.SupportChat && router?.pathname.includes('/support')) {
			if (isExistConversationId) {
				supportUpdateMessage(payload.conversationMessage);
			} else {
				// ---------------- create new conversation not exist in now conversations
				const newMessage = payload.conversationMessage;

				const newItem = {
					id: Math.max.apply(null, conversationIds) + 1,
					conversationMessages: [
						{
							message: newMessage?.message,
							id: newMessage?.id,
						},
					],
					contact: null,
					business: null,
					createdDate: newMessage?.createdDate,
					lastModifiedDate: newMessage?.lastModifiedDate,
					type: newMessage?.conversation?.type,
				};
				supportUpdateChannel(newItem);
			}

		} else if (payload?.conversationMessage?.conversation?.type === ConversationType?.SocialNetworkChat) {
			if (isExistConversationId) {
				updateMessage(payload.conversationMessage);
			} else {
				// ---------------- create new conversation not exist in now conversations
				const newMessage = payload.conversationMessage;

				const newItem = {
					id: Math.max.apply(null, conversationIds) + 1,
					conversationMessages: [
						{
							message: newMessage?.message,
							id: newMessage?.id,
						},
					],
					contact: {
						id: newMessage?.conversation?.contact?.id,
						photoUrl: newMessage?.conversation?.contact?.photoUrl,
						fullName: newMessage?.conversation?.contact?.fullName,
					},
					business: {
						id: newMessage?.conversation?.businessId,
						logo: newMessage?.conversation?.business?.logo,
						name: newMessage?.conversation?.business?.name,
					},
					createdDate: newMessage?.createdDate,
					lastModifiedDate: newMessage?.lastModifiedDate,
					type: newMessage?.conversation?.type,
				};
				updateChannel(newItem);
			}
		} else {
			null
		}
	}

	return (
		<SubscriptionLayoutContext.Provider
			value={{
				ConversationLastMessageData,
				lastMessageSubscription,
			}}
		>
			{children}
		</SubscriptionLayoutContext.Provider>
	);
}

export const useMessage = () => {
	const context = useContext(SubscriptionLayoutContext);

	if (!context) throw new Error('useMessage should be use inside SubscriptionLayoutContextProvider');

	return context;
};
