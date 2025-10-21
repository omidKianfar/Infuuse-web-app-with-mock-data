import { proxy } from 'valtio';

type Type = {
	useId: null | string;
};

export default proxy<Type>({ useId: null });
