import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import userSubscriptionStore from '@/store/user-subscription.store';
import { useConversation_GetListQuery, Conversation } from '@/graphql/generated';
import { queryKeyManager } from '@/utils/queryKeys';

export const useConversationMessage = ({ variables }: any) => {
	const { conversationIds } = useSnapshot(userSubscriptionStore);
	const [hasErrorShown, setHasErrorShown] = useState(false);

	const { data: conversationData, error } = useConversation_GetListQuery(variables || { skip: 0, take: 0 }, {
		enabled: !!variables,
	});

	useEffect(() => {
		if (error && !hasErrorShown) {
			console.warn('GraphQL Error:', error);
			setHasErrorShown(true);
		}
	}, [error, hasErrorShown]);

	useEffect(() => {
		const items = conversationData?.conversation_getList?.result?.items;
		if (items?.length) {
			const ids = items.map((c) => c?.id as number);
			userSubscriptionStore.conversationIds = ids;
		}
	}, [conversationData]);

	return {
		conversationIds,
		conversations: conversationData?.conversation_getList?.result?.items as Conversation[] | undefined,
	};
};
