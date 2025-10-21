import { proxy } from 'valtio';

type Type = {
	contactId: number | null;
	conversationId: number | null;
	contactEmail: string | null;
};

export default proxy<Type>({ contactId: null, conversationId: null, contactEmail: null });
