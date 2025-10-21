import config from 'config';
import * as gql from 'gql-query-builder';

export const NOTIFICATION = 'notification';

export const notificationAdded = gql.subscription({
	operation: NOTIFICATION,
	variables: { userId: { type: 'Int', required: true } },
	fields: ['createdDate', 'id', 'type'],
});

export const ConversationMessageByContact = 'conversationMessageByContact';

export const ConversationMessageByContact_Chat = gql.subscription({
	operation: ConversationMessageByContact,
	variables: { contactId: { type: 'Int', required: true } },
	fields: ['createdDate', 'id', 'typeSocialNetwork'],
});

export const ConversationMessage = 'conversationMessage';

export const ConversationMessage_Chat = gql.subscription({
	operation: ConversationMessage,
	variables: { userId: { type: 'Int', required: true } },
	fields: ['createdDate', 'id', 'typeSocialNetwork'],
});

export function subscribe(query: string, variables: any, callback: (message: any) => void, externalId?: string) {
	if (typeof window === 'undefined') return;
	if (!callback) callback = () => {};

	const url = `${config.subscriptionUrl}${externalId ? `?id=${externalId}` : ''}`;

	const webSocket = new WebSocket(url, 'graphql-ws');
	const unsubscribe = () => webSocket.close();

	webSocket.onopen = () => {
		webSocket.send('{"type":"connection_init","payload":{}}');

		const message = {
			id: '1',
			type: 'start',
			payload: {
				variables,
				// extensions: {},
				// operationName: null,
				query,
			},
		};

		webSocket.send(JSON.stringify(message));
	};

	webSocket.onmessage = callback;
	webSocket.onerror = (err) => {
		console.log('subscription', 'error subscription', err);
	};

	return unsubscribe;
}
