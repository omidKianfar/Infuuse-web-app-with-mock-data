import { TypeContactNetwork } from '@/graphql/generated';
import { proxy } from 'valtio';

type Type = {
	netWorkType: string | TypeContactNetwork;
	SendViaId: number | null;
	SendViaTo: string | null;
};

export default proxy<Type>({ netWorkType: 'Live Chat', SendViaId: null, SendViaTo: null });
