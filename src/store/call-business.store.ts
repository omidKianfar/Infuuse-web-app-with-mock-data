import { proxy } from 'valtio';

type Type = {
	twilioBusinessId: null | number;
};

export default proxy<Type>({ twilioBusinessId: null });
