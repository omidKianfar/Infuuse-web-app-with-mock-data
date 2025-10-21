import { proxy } from 'valtio';

type Type = {
	replyId: number;
	replyMessage: string;
};

export default proxy<Type>({ replyId: 0, replyMessage: '' });
