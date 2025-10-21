import { proxy } from 'valtio';

export type Phones = {
	phones: {
		id: number;
		value: string;
	}[];
};

export default proxy<Phones>({ phones: [] });
