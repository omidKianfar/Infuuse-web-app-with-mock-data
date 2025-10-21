import { TypeSocialNetwork } from '@/graphql/generated';
import { proxy } from 'valtio';

type Type = {
	filter: string | TypeSocialNetwork;
};

export default proxy<Type>({ filter: 'All Message' });
