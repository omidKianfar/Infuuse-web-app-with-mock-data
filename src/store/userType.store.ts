import { UserType } from '@/providers/Auth/without-graphql/type';
import { proxy } from 'valtio';

type Type = {
	userType: UserType;
};

export default proxy<Type>({ userType: UserType?.BusinessMember });
