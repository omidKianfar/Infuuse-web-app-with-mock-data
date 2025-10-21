import { proxy } from 'valtio';

type Type = {
	ticketSidebar: boolean;
	ticketId: number | null;
};

export default proxy<Type>({ ticketSidebar: false, ticketId: null });
