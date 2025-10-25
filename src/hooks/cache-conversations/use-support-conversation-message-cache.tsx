import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import userSubscriptionStore from '@/store/user-subscription.store';
import { Conversation, useSupportChat_GetListQuery } from '@/graphql/generated';
import { queryKeyManager } from '@/utils/queryKeys';

export const useSupportMessage = ({ variables }: any) => {
	const { conversationIds } = useSnapshot(userSubscriptionStore);

	const { data: supportChat } = useSupportChat_GetListQuery(variables);

	useEffect(() => {
		queryKeyManager.addKey('supportChatList', ['supportChat_getList', variables]);
	}, []);

	useEffect(() => {
		if (supportChat?.supportChat_getList?.result?.items) {
			const ids = supportChat.supportChat_getList.result.items.map((conversation) => conversation?.id as number);
			userSubscriptionStore.conversationIds = ids;
		}
	}, [supportChat]);

	return {
		conversationIds,
		SupportChatData: supportChat?.supportChat_getList?.result?.items as Conversation[] | undefined,
	};
};
