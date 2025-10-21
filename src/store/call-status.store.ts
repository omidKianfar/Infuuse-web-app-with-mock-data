import { proxy } from 'valtio';

type Type = {
	isLoading: boolean;
    callSid: string;
};

export default proxy<Type>({ isLoading: false, callSid:''});
