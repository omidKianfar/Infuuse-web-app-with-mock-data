import { proxy } from 'valtio';

type Type = {
	chatSidebar: boolean;
	dealSidebar: boolean;
	dealId: number | null;
};

export default proxy<Type>({ chatSidebar: false, dealSidebar: false, dealId: null });
