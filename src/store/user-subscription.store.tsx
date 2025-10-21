import { ConversationMessage } from '@/graphql/generated';
import { proxy } from 'valtio';

type Type = {
	userId: number | null;
	conversationId: number | null;
	conversationLastMessageData: ConversationMessage | undefined;
	conversationIds: any[] | null;
};

export default proxy<Type>({
	userId: null,
	conversationId: null,
	conversationLastMessageData: undefined,
	conversationIds: null,
});
