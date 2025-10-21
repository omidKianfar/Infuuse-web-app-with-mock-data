import { proxy } from 'valtio';

type Type = {
	setting: boolean;
};

export default proxy<Type>({ setting: false });
