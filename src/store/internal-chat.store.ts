import { proxy } from 'valtio';

type Type = {
	internalChat: boolean;
};

export default proxy<Type>({ internalChat: false });
