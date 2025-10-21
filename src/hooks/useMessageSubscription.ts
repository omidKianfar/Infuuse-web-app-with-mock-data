import { ConversationMessageDocument } from '@/graphql/generated';
import config from 'config';
import { useEffect } from 'react';
import { useUser } from './useUser';

export const useMessageSubscription = (callback: (event: MessageEvent) => void) => {
	const { userData } = useUser();

	useEffect(() => {
		if (!userData) return;

		const ws = new WebSocket(
			`${config.subscriptionUrl}${userData?.user?.externalId ? `?id=${userData?.user?.externalId}` : ''}`,
			'graphql-ws'
		);

		ws.onopen = () => {
			console.log('[SUBSCRIPTION] Conversation message channel opened!');

			ws.send('{"type":"connection_init","payload":{}}');

			const message = {
				id: '1',
				type: 'start',
				payload: {
					query: ConversationMessageDocument,
					variables: { userId: userData.user?.id },
				},
			};
			ws.send(JSON?.stringify(message));
		};

		ws.onmessage = callback;

		ws.onerror = (event: Event) => console.log('[SUBSCRIPTION] Subscription error: ', event);

		return () => {
			if (ws?.readyState == 1) {
				ws?.send(JSON.stringify({ id: '1', type: 'stop' }));
				ws?.close();
			}
		};
	}, [userData]);
};
