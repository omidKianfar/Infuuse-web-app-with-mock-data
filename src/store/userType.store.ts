import { UserType } from '@/graphql/generated';
import { proxy } from 'valtio';

type Type = {
	userType: UserType | null;
};

export default proxy<Type>({ userType: UserType?.BusinessMember });
